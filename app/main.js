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





// const get_el_quijote = async () => {
//     const url = "https://gist.githubusercontent.com/jsdario/6d6c69398cb0c73111e49f1218960f79/raw/8d4fc4548d437e2a7203a5aeeace5477f598827d/el_quijote.txt"
//     const quijote = await fetch(url).then(s => s.text()).then(d => d)
//     const words = quijote.split(" ").length
//     console.log(words)
// }
// get_el_quijote()


// const get_magikarp = async () => {
//     const url = "https://pokeapi.co/api/v2/pokemon/magikarp"
//     const pokemon = await fetch(url).then(s => s.json()).then(d => d)
//     const pokenname = pokemon.name
// }



// /**
//  * REQUISITO
//  * 
//  * Formulario con input y con boton de enviar
//  * Buscamos pokemon por su nombre
//  * 
//  * Si el pokemos existe, pintamos una tarjeta con nombre
//  * con imagen, y con las habilidades que tiene
//  * 
//  * Si el pokemon no existe, pintamos una tarjetita diciendo
//  * que el pokemon no existe
//  * Y nos la posibilidad de resetear el formulario
//  * 
//  */


/**
 * 
 * REQUISITO 2
 * 
 * Tenemos que hacer persistencia de cada pokemon buscado
 * Tenemos que renderizar en una lista los pokemon buscados
 * Recargamos la página, aparecen los pokemon buscados hasta ahora...
 * Botón que resetee la lista de pokemon buscados
 * 
 * REQUISITO 3
 * Tenemos que guardar el geoposicionamiento de cada búsqueda de pokemon
 * Mostrarlo en un mapa
 * 
 */

window.addEventListener("load", () => {
    readLocalStorage()
    initFormEvents()
    initButtonResetEvent()
})

let searchedPokemon = ""
let pokemon
let pokemons = []
const form = document.querySelector("form")
const alert = document.querySelector(".alert")
const button = alert.querySelector("button")
const pokeHolder = document.querySelector(".pokemon_card_holder")
const loader = document.querySelector(".loader")

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



// const now = new Date()
// const desserts = ["tarta de trufa", "tarta de trufa"]
// const alumno = {
//     name: "carlos", 
//     age: 12323, 
//     isAlien: true, 
//     lastVisited: new Date()
// }
// const tweets = [
//     {
//         tweet: "12323", 
//         user: {
//             id: 2, 
//             name: "carlos"
//         }, 
//         likes: 323, 
//         liked: true, 
//         comments: 323, 
//     }, 
//     {
//         tweet: "fdgdfgdfgdfgdf", 
//         user: {
//             id: 25, 
//             name: "ana"
//         }, 
//         likes: 1323, 
//         liked: false, 
//         comments: 1323, 
//     }
// ]


// localStorage.setItem("my_name", "Carlos")
// localStorage.setItem("my_age", 323)
// localStorage.setItem("is_alien", true)
// localStorage.setItem("last_visited", now.toISOString())
// localStorage.setItem("my_favorite_desserts", desserts.join(", "))
// localStorage.setItem("alumno", JSON.stringify(alumno))
// localStorage.setItem("tweets", JSON.stringify(tweets))

// const name = localStorage.getItem("my_name")
// const age = +localStorage.getItem("my_age")
// const isAlien = localStorage.getItem("is_alien") === "true"
// const lastVisited = new Date(localStorage.getItem("last_visited"))
// const favDesserts= localStorage.getItem("my_favorite_desserts").split(", ")
// const alumnoo = JSON.parse(localStorage.getItem("alumno"))
// const tweets_ = JSON.parse(localStorage.getItem("tweets"))

