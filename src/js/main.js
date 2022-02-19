import { Automaton } from "./Automaton.js"
import { Stats } from "../lib/stats.module.js"
import { getRandomRuleset, Ruleset } from "./Ruleset.js"
import { PI, PI2, rndFloat, rndInt } from "./Util.js"
import {
	alienRace,
	anotherSet,
	bluepurplestructure,
	blueStructures,
	chipset,
	coolMachines0,
	coolMachines1,
	coolTex,
	creature,
	fineStructures,
	fineStructures2,
	flowfields,
	flowfields2,
	getRandomVariant,
	idunno,
	justAnother,
	lessHecticRace,
	niceAbstract,
	niceCycle,
	pixelCity,
	productionLine,
	scribbled,
	signs,
	spaceShip,
	starrySpace,
	variant12,
	webs
} from "./variants.js"
import { ThreeJsRender } from "./ThreeJsRenderer.js"

let width, height
var paused = false
var stats = Stats()
var automatons = []
var threeWrap

window.onload = () => {
	width = window.innerWidth
	height = window.innerHeight

	//spawn the three.js wrapper that holds the three.js scene, renderer and camera.
	threeWrap = new ThreeJsRender(width, height)

	//(dim*dim) automatons will be spawned.
	let dim = 1
	let w = width / dim
	let h = height / dim
	for (let i = 0; i < dim * dim; i++) {
		let variant = new Ruleset(getRandomVariant())
		let ruleset = variant // getRandomRuleset()
		//initiate automaton. If there are multiple - pass it its position in the scene.
		let renderer = new Automaton(
			threeWrap,
			ruleset,
			(i % dim) * w - (w / 2) * (dim - 1),
			height - h - Math.floor(i / dim) * h - (h / 2) * (dim - 1),
			w,
			h,
			i
		)
		automatons.push(renderer)
	}
	threeWrap.renderer.domElement.addEventListener("click", ev => {
		let x = ev.clientX
		let y = ev.clientY
		let col = Math.floor(x / w)
		let row = Math.floor(y / h)
		let ind = col + row * dim
		spawnNewGeneration(automatons[ind].ruleset.copy())
		automatons[ind].copyUrlOfCurrentRuleset()
	})
	window.addEventListener("keydown", e => {
		switch (e.code) {
			case "Space":
				paused = !paused
				break
		}
	})

	stats.showPanel(0)
	document.body.appendChild(stats.dom)

	//Start the render loop!
	render()
}

function spawnNewGeneration(rules) {
	automatons.forEach((auto, i) =>
		i < automatons.length / 2
			? auto.setRuleset(rules.copy().mutate(rndFloat(0.3, 0.3), 0))
			: auto.setRuleset(rules.copy().mutate(0, rndFloat(0.3, 0.3)))
	)
}

function render() {
	stats.begin()
	if (paused) {
		window.requestAnimationFrame(render)
		return
	}
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
