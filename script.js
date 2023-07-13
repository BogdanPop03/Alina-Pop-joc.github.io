"use strict"

const newGame = function () {
	score0Element.textContent = 0
	score1Element.textContent = 0

	diceElement.classList.add("hidden")

	if (!playerLeftStatus.classList.contains("player--active")) {
		playerLeftStatus.classList.add("player--active")
		playerRightStatus.classList.remove("player--active")
	} else {
		playerRightStatus.classList.add("player--active")
		playerLeftStatus.classList.remove("player--active")
	}
}

const score0Element = document.getElementById("score--0")
const score1Element = document.getElementById("score--1")

const currentScoreLeft = document.getElementById("current--0")
const currentScoreRight = document.getElementById("current--1")

const diceElement = document.querySelector(".dice")

const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")

const playerLeftStatus = document.querySelector(".player--0")
const playerRightStatus = document.querySelector(".player--1")

score0Element.textContent = 0
score1Element.textContent = 0

diceElement.classList.add("hidden")

btnNew.addEventListener("click", newGame)

btnRoll.addEventListener("click", function () {
	const diceValue = Math.trunc(Math.random() * 6) + 1

	console.log(`First dice value: ${diceValue}`)

	const imageName = "dice-" + String(diceValue) + ".png"

	diceElement.src = imageName

	diceElement.classList.remove("hidden")

	if (diceValue === 1) {
		if (playerLeftStatus.classList.contains("player--active")) {
			console.log("Switched from Player Left to Player Right")

			currentScoreLeft.textContent = 0

			playerLeftStatus.classList.remove("player--active")
			playerRightStatus.classList.add("player--active")
		} else {
			console.log("Switched from Player Right to Player Left")

			currentScoreRight.textContent = 0

			playerRightStatus.classList.remove("player--active")
			playerLeftStatus.classList.add("player--active")
		}
	} else {
		if (playerLeftStatus.classList.contains("player--active")) {
			currentScoreLeft.textContent =
				Number(currentScoreLeft.textContent) + Number(diceValue)
		} else if (playerRightStatus.classList.contains("player--active")) {
			currentScoreRight.textContent =
				Number(currentScoreRight.textContent) + Number(diceValue)
		}
	}
})

btnHold.addEventListener("click", function () {
	if (playerLeftStatus.classList.contains("player--active")) {
		console.log("Switched from Player Left to Player Right")

		score0Element.textContent =
			Number(score0Element.textContent) +
			Number(currentScoreLeft.textContent)

		if (Number(score0Element.textContent) >= 100) {
			newGame()
		}

		playerLeftStatus.classList.remove("player--active")
		playerRightStatus.classList.add("player--active")

		console.log(
			`Player left held ${currentScoreLeft.textContent} points and now has ${score0Element.textContent} points in total`
		)
	} else {
		console.log("Switched from Player Right to Player Left")

		score1Element.textContent =
			Number(score1Element.textContent) +
			Number(currentScoreRight.textContent)

		if (Number(score1Element.textContent) >= 100) {
			newGame()
		}

		playerRightStatus.classList.remove("player--active")
		playerLeftStatus.classList.add("player--active")

		console.log(
			`Player right held ${currentScoreRight.textContent} points and now has ${score1Element.textContent} points in total`
		)
	}

	currentScoreLeft.textContent = 0
	currentScoreRight.textContent = 0
})
