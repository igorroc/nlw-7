const card = document.querySelector("#card")
const cardLinks = card.querySelectorAll("a")

cardLinks.forEach((link) => {
	link.addEventListener("mouseenter", stopCardWiggle)
	link.addEventListener("mouseleave", returnCardWiggle)
})

function stopCardWiggle() {
	return (card.style.animationPlayState = "paused")
}

function returnCardWiggle() {
	return (card.style.animationPlayState = "running")
}
