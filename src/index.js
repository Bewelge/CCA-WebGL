import { Automaton } from "./js/Automaton.js"
// import { Stats } from "./js/lib/stats.module.js"
import { getRandomRuleset, Ruleset } from "./js/Ruleset.js"
import { chipset, variants } from "./js/variants.js"
import { ThreeJsRender } from "./js/Util/ThreeJsRenderer.js"
import { getGUI } from "./js/Util/Gui.js"
import {
	addResizeCallback,
	getWindowDimensions
} from "./js/Util/RenderDimensions.js"

let width, height
var paused = false
var automatons = []
var threeWrap

window.onload = () => {
	let dims = getWindowDimensions()
	width = dims.width
	height = dims.height

	//spawn the three.js wrapper that holds the three.js scene, renderer and camera.
	threeWrap = new ThreeJsRender(width, height)

	//(dim*dim) automatons will be spawned.
	let dim = 1
	let w = width / dim
	let h = height / dim
	for (let i = 0; i < dim * dim; i++) {
		let variant = new Ruleset(chipset) // getRandomVariant())
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

	// Used to choose the "best" iteration when multiple are spawned
	// threeWrap.renderer.domElement.addEventListener("click", ev => {
	// 	let x = ev.clientX
	// 	let y = ev.clientY
	// 	let col = Math.floor(x / w)
	// 	let row = Math.floor(y / h)
	// 	let ind = col + row * dim
	// 	spawnNewGeneration(automatons[ind].ruleset.copy())
	// 	automatons[ind].copyUrlOfCurrentRuleset()
	// })
	//addVariantsGui()
	window.addEventListener("keydown", e => {
		switch (e.code) {
			case "Space":
				paused = !paused
				break
		}
	})

	addResizeCallback(() => {
		dims = getWindowDimensions()
		threeWrap.setSize(dims.width, dims.height)
		automatons.forEach(auto => {
			auto.setSize(dims.width, dims.height)
		})
	})

	//Start the render loop!
	render()
}

function spawnNewGeneration(rules) {
	automatons.forEach(
		(auto, i) =>
			i < automatons.length / 2
				? auto.setRuleset(rules.copy()) //.mutate(rndFloat(0.3, 0.3), 0))
				: auto.setRuleset(rules.copy()) //.mutate(0, rndFloat(0.3, 0.3)))
	)
}
var ticker = 0
function render() {
	ticker++
	if (ticker == 600) {
		fxpreview()
	}
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

	//now keep doing it.
	window.requestAnimationFrame(render)
}

function addVariantsGui() {
	let gui = getGUI()
	let folder = gui.addFolder("Variants")
	for (let key in variants) {
		let obj = { func: loadVariant.bind(this, key) }
		folder.add(obj, "func").name(key)
	}
}
function loadVariant(variant) {
	spawnNewGeneration(new Ruleset(variants[variant]))
}
console.log(document.title + " - By Bewelge")
console.log("")
console.log("Follow me on Twitter at:")
console.log("https://twitter.com/bewelg")
console.log("")
console.log("Or check out my GitHub to find more projects of mine.")
console.log("https://github.com/Bewelge")
console.log("")
console.log("Github project:")
console.log("https://github.com/Bewelge/CCA-WebGL")

console.log("")
console.log("Controls:")
console.log("Space - Pause/Unpause")
console.log("F - Fill window")
console.log("S - Download Image")
console.log("R - Show raw output")
console.log("D - Restart automaton")
console.log("N - Restart with new pattern")
console.log("Up/Down - Increase/Decrease blending")
console.log("")
