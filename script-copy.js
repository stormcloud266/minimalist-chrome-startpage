// elements
const input = document.getElementById('search')
const clock = document.getElementById('clock')
const background = document.getElementById('background')

const objDate = new Date()
const hours = objDate.getHours()
let image = './default.jpg'
let nextImage = localStorage.getItem('bgImage')

if (!nextImage) {
	background.style.backgroundImage = `url('${image}')`
} else {
	background.style.backgroundImage = `url('${nextImage}')`
}

document.getElementsByTagName('BODY')[0].classList = 'fade'

// const setClock = () => {
// 	const time = new Date().toLocaleTimeString().slice(0, -6)
// 	clock.textContent = time
// }
// setClock()
// setInterval(setClock, 1500)

setInterval(
	(function setClock() {
		const time = new Date().toLocaleTimeString().slice(0, -6)
		clock.textContent = time
		return setClock
	})(),
	500
)

const getImage = async () => {
	// return fetch('https://api.unsplash.com/daily')
	return fetch('https://source.unsplash.com/collection/11649432/2600x1500')
		.then((response) => response.json())
		.then((data) => {
			url = data.urls.regular
		})
}

// if (!url) {
// 	getImage().then(() => {
// 		console.log(url)
// 	})
// }

const toDataURL = (url) =>
	fetch(url)
		.then((response) => response.blob())
		.then(
			(blob) =>
				new Promise((resolve, reject) => {
					const reader = new FileReader()
					reader.onloadend = () => resolve(reader.result)
					reader.onerror = reject
					reader.readAsDataURL(blob)
				})
		)

toDataURL('https://source.unsplash.com/collection/2310706/2400x1600').then(
	(dataUrl) => {
		localStorage.setItem('bgImage', dataUrl)
	}
)

// background.style.backgroundImage = `url('https://source.unsplash.com/collection/2310706/1600x900')`

input.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault()
		const searchTerm = encodeURI(input.value)
		const searchUrl = `https://www.google.com/search?q=${searchTerm}`
		window.open(searchUrl, '_self')
	}
})
