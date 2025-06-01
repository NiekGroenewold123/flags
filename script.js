const flagImage = document.querySelector("#flag-image") // document.querySelector geleerd via W3Schools
const feedback = document.querySelector("#feedback") 
const options = document.querySelector("#answer-options") 
const gameSection = document.querySelector("#game") 
const startButton = document.querySelector("#start-button") 
const roundsInput = document.querySelector("#rounds") // 

const correctSound = new Audio("correct.mp3") // bron: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
const wrongSound = new Audio("wrong.mp3") // bron: ChatGPT

const landen = [ // bron: vlag-URL's van https://flagcdn.com
  { naam: "Frankrijk", vlag: "https://flagcdn.com/w320/fr.png" },
  { naam: "Duitsland", vlag: "https://flagcdn.com/w320/de.png" },
  { naam: "Japan", vlag: "https://flagcdn.com/w320/jp.png" },
  { naam: "Italië", vlag: "https://flagcdn.com/w320/it.png" },
  { naam: "Spanje", vlag: "https://flagcdn.com/w320/es.png" },
  { naam: "India", vlag: "https://flagcdn.com/w320/in.png" }
]

let juisteAntwoord = ""
let ronde = 1
let totaalRondes = 3
let score = 0

startButton.addEventListener("click", function () { 
  totaalRondes = parseInt(roundsInput.value) // bron: .value omzetten naar getal via parseInt (W3Schools)
  ronde = 1
  score = 0
  flagImage.style.display = "block" // bron: DOM styling basis
  gameSection.hidden = false
  nieuweVraag()
})

function nieuweVraag() {
  const gekozen = landen[Math.floor(Math.random() * landen.length)]
  juisteAntwoord = gekozen.naam // ✅ hier miste het
  flagImage.src = gekozen.vlag
  feedback.textContent = "Kies het juiste land"

  const opties = [juisteAntwoord]
  while (opties.length < 4) {
    const extra = landen[Math.floor(Math.random() * landen.length)].naam
    if (!opties.includes(extra)) opties.push(extra)
  }

  opties.sort(() => Math.random() - 0.5)
  options.innerHTML = ""

  opties.forEach(keuze => {
    const knop = document.createElement("button")
    knop.textContent = keuze
    knop.addEventListener("click", function () {
      controleer(keuze)
    })
    options.appendChild(knop)
  })
}


function controleer(keuze) {
  if (keuze === juisteAntwoord) {
    feedback.textContent = "✅ Goed!"
    score++
    correctSound.currentTime = 0
    correctSound.play() 
  } else {
    feedback.textContent = "❌ Fout! Het juiste antwoord was " + juisteAntwoord
    wrongSound.currentTime = 0
    wrongSound.play()
  }

  ronde++
  if (ronde <= totaalRondes) {
    setTimeout(nieuweVraag, 2000) // bron: vertraging via setTimeout (MDN voorbeeld)
  } else {
    setTimeout(() => {
      feedback.textContent = `Spel afgelopen. Je score is ${score} van de ${totaalRondes}`
      flagImage.style.display = "none"
      options.innerHTML = ""
    }, 2000)
  }
}
