import "modern-css-reset";
import "./../assets/styles/tailwind.css";
import "./../assets/styles/style.css";
import "phosphor-icons";


// let quijote = ""
// const readQuijote = async () => {
//     const url = "https://gist.githubusercontent.com/jsdario/6d6c69398cb0c73111e49f1218960f79/raw/8d4fc4548d437e2a7203a5aeeace5477f598827d/el_quijote.txt"
//     quijote = await fetch(url).then(s => s.text()).then(d => d)
//     countWords()
// }
// const countWords = () => {
//     const words = quijote.split(" ").filter(d => d.toLowerCase() == "dulcinea").length
//     console.log(words);
// }

// const readESDPosts = async () => {
//     const url = "https://admin-dev.esdmadrid.es/wp-json/esd/v1/portfolio?year=2021&department=grafico"
//     const posts = await fetch(url).then(s => s.json()).then(d => d)
//     console.log(posts)
// }

// readESDPosts()






/**
 * REQUISITO
 * 
 * Formulario con input y con boton de enviar
 * Buscamos pokemon por su nombre
 * 
 * Si el pokemos existe, pintamos una tarjeta con nombre
 * con imagen, y con las habilidades que tiene
 * 
 * Si el pokemon no existe, pintamos una tarjetita diciendo
 * que el pokemon no existe
 * Y nos la posibilidad de resetear el formulario
 * 
 */

window.addEventListener("load", () => {
    initFormEvents()
    initButtonResetEvent()
})

let searchedPokemon = ""
let pokemon
const form = document.querySelector("form")
const alert = document.querySelector(".alert")
const button = alert.querySelector("button")
const pokeHolder = document.querySelector(".pokemon_card_holder")
const loader = document.querySelector(".loader")

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

    pokemon = await fetch(url)
        .then(s => s.json()).then(d => {
            pokemon = d
            renderPokemon()
            loader.classList.add("hidden")
        })
        .catch(() => {
            renderError()
            loader.classList.add("hidden")
        })
    
}

const renderPokemon = () => {
    console.log(pokemon);
    pokeHolder.innerHTML = `
        <div class="pokemon">
            <h3>${pokemon.name}</h3>
            <picture>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </picture>
            <ul>
            <li></li>
            <li></li>
            <li></li>
            </ul>
        </div>
    `
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


