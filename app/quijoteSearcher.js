import { resetList } from "./pokemonController"

let quijote = ""
let wordsLength = 0

const readQuijote = async () => {
    const url = "https://gist.githubusercontent.com/jsdario/6d6c69398cb0c73111e49f1218960f79/raw/8d4fc4548d437e2a7203a5aeeace5477f598827d/el_quijote.txt"
    quijote = await fetch(url).then(s => s.text()).then(d => d)
}

const countWords = async () => {
    await readQuijote()
    const words = quijote.split(" ").filter(d => d.toLowerCase() == "dulcinea").length
    wordsLength = words
    resetList
    console.log(wordsLength)
}

export {
    countWords
}