import "modern-css-reset";
import "./../assets/styles/tailwind.css";
import "./../assets/styles/style.css";
import "phosphor-icons";
import { countWords } from "./quijoteSearcher";
import { initPokemonController } from "./pokemonController";


window.addEventListener("load", () => {
    initPokemonController()
    countWords()
})
