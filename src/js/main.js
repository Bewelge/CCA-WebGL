import { Automaton as Renderer } from "./Automaton.js"
import { Stats } from "../lib/stats.module.js"
import { getRandomRuleset, Ruleset } from "./Ruleset.js"
import { PI, PI2, rndFloat, rndInt } from "./Util.js"
import {
	blueStructures,
	idunno,
	niceCycle,
	pixelCity,
	spaceShip
} from "./variants.js"
import { ThreeJsRender } from "./ThreeJsRenderer.js"

let width, height

var stats = Stats()
var automatons = []
var threeWrap
window.onload = () => {
	width = window.innerWidth
	height = window.innerHeight

	//spawn the three.js wrapper that holds the scene, renderer and camera.
	threeWrap = new ThreeJsRender(width, height)

	//dim x dim automatons will be spawned.
	let dim = 4
	let w = width / dim
	let h = height / dim
	for (let i = 0; i < dim * dim; i++) {
		let ruleset = getRandomRuleset()
		//initiate automaton. If multiple pass it it's position in the scene.
		let renderer = new Renderer(
			ruleset,
			(i % dim) * w - (w / 2) * (dim - 1),
			Math.floor(i / dim) * h - (h / 2) * (dim - 1),
			w,
			h,
			i
		)
		renderer.init(threeWrap)
		automatons.push(renderer)
	}
	threeWrap.renderer.domElement.addEventListener("click", ev => {
		let x = ev.clientX
		let y = height - ev.clientY
		let col = Math.floor(x / w)
		let row = Math.floor(y / h)
		let ind = col + row * dim
		automatons[ind].copyUrlOfCurrentRuleset()
	})
	stats.showPanel(0)
	document.body.appendChild(stats.dom)
	//Start the render loop!
	render()
}

function render() {
	stats.begin()
	//Update each automaton. Excecutes the shaders and updates the shaders uniforms values.
	automatons.forEach((renderer, i) => {
		renderer.render()
	})
	//now render the scene with the meshes/automatons in it.
	threeWrap.render()
	stats.end()
	//now keep doing it.
	window.requestAnimationFrame(render)
}

console.log(document.title + " - By Bewelge")
console.log("")
console.log("Follow me on Twitter at:")
console.log("https://twitter.com/bewelg")
console.log("")
console.log("Or check out my GitHub to find more projects of mine.")
console.log("https://github.com/Bewelge")
console.log("")
console.log("Github repo of underlying simulation:")
console.log("https://github.com/Bewelge/Physarum-WebGL")

console.log("")
console.log("Controls:")
console.log("S - Download Image")
