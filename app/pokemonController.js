
let searchedPokemon = ""
let pokemon
let pokemons = []
const form = document.querySelector("form")
const alert = document.querySelector(".alert")
const button = alert.querySelector("button")
const pokeHolder = document.querySelector(".pokemon_card_holder")
const loader = document.querySelector(".loader")
const resetList = document.querySelector(".reset_list")

const readLocalStorage = () => {
    const isPokemonsSet = localStorage.getItem("pokemons") !== null
    if (isPokemonsSet) {
        pokemons = JSON.parse(localStorage.getItem("pokemons"))
    }
    renderPokemons()
}

const initFormEvents = () => {
    form.addEventListener("submit", (ev) => {
        ev.preventDefault()
        const input = form.querySelector("input")
        searchedPokemon = input.value
        fetchPokemon()
    })
}

const fetchPokemon = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + searchedPokemon
    loader.classList.remove("hidden")


    navigator.geolocation.getCurrentPosition((data) => {
        console.log(data)
        localStorage.setItem("last_search_coords", JSON.stringify(data))
    })

    pokemon = await fetch(url)
        .then(s => s.json()).then(d => {
            pokemon = d

            pokemons.push(pokemon)
            localStorage.setItem("pokemons", JSON.stringify(pokemons))
            renderPokemons()
            loader.classList.add("hidden")
        })
        .catch(() => {
            renderError()
            loader.classList.add("hidden")
        })
    
}

const renderPokemons = () => {
    let pokemonsHTML = ""
    pokemons.forEach(pokemon => {
        pokemonsHTML += `
        <div class="pokemon">
            <h1>${pokemon.name}</h1>
            <picture>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </picture>
            <div class="abilities">
                <ul>
                    <li class="ability">${pokemon.abilities[0].ability.name}</li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            
        </div>
    `
    })
    pokeHolder.innerHTML = pokemonsHTML
}

const renderError = () => {
    alert.classList.remove("hidden")
    pokeHolder.innerHTML = ""
}

const initButtonResetEvent = () => {
    button.addEventListener("click", () => {
        alert.classList.add("hidden")
        form.reset()
    })
}

const initResetListEvent = () => {
    resetList.addEventListener("click", () => {
        pokemons = []
        localStorage.setItem("pokemons", JSON.stringify(pokemons))
        renderPokemons()
    })
}

const initPokemonController = () => {
    readLocalStorage()
    initFormEvents()
    initButtonResetEvent()
    initResetListEvent()
}



export {
    initPokemonController,
    resetList
}