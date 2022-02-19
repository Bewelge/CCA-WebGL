import {
	getUrlParamRuleset,
	PI05,
	PI2,
	rndFloat,
	rndInt,
	saveImg,
	Vec2
} from "./Util.js"
import * as THREE from "../lib/three.module.js"
import { EffectComposer } from "../lib/EffectComposer/EffectComposer.js"
import GUI from "../lib/lil-gui.esm.js"
import { ShaderBuilder } from "./ShaderBuilder.js"
import { PingPongShaderBuilder } from "./PingPongShaderBuilder.js"
import { orthographicCamera, Vector } from "./ThreeJsUtils.js"
import { MouseSpawnTexture } from "./MouseSpawnTexture.js"
import { InfoDialog } from "./InfoDialog.js"
import { INFO_TEXT } from "./InfoText.js"
import { PASS_THROUGH_VERTEX } from "./Shaders/PassThroughVertex.js"
import { AUTOMATON_FRAGMENT } from "./Shaders/AutomatonFragment.js"
import { FINAL_RENDER_FRAGMENT } from "./Shaders/FinalRenderFragment.js"
import {
	getRandomColor,
	getRandomUniqueColor,
	getThePalette
} from "./ColorPalletes.js"

import { getStartCanvas } from "./StartingPattern.js"
import { getGUI } from "./Gui.js"

var forShow = false
/**
 * This class handles the automaton logic. All shaders initiation and updating is done here.
 */
export class Automaton {
	constructor(threeWrap, ruleSet, x = 0, y = 0, w, h, number = 0) {
		let urlRuleset = getUrlParamRuleset()

		//If we pass a ruleset by url, it'll override the passed ruleset
		if (urlRuleset) {
			this.ruleset = urlRuleset
			console.log(this.ruleset)
		} else {
			this.ruleset = ruleSet
		}
		this.width = w
		this.height = h

		//Position of the mesh with the shader material in the scene.
		//Only relevant if we're spawning multiple automatons at once.
		this.x = x
		this.y = y
		this.number = number

		this.init(threeWrap)
	}
	setRuleset(ruleset) {
		this.ruleset = ruleset

		this.reinitAutomaton()
		this.redrawReset()
	}
	reinitAutomaton() {
		//pass the automaton shader the inital pattern
		this.automatonShader.setData(this.getStartTextureData())

		//set uniforms of automaton shader
		this.setAutomatonUniforms()
		this.automatonShader.material.uniforms.reach.value = this.ruleset.reach
		this.automatonShader.material.fragmentShader =
			this.getAutomatonFragmentShader()

		this.automatonShader.material.needsUpdate = true
	}

	setAutomatonUniforms() {
		this.automatonShader.material.uniforms.states.value = new THREE.Vector4(
			this.ruleset.states.r,
			this.ruleset.states.g,
			this.ruleset.states.b,
			this.ruleset.states.a
		)
		this.outputMaterial.uniforms.states.value = new THREE.Vector4(
			this.ruleset.states.r,
			this.ruleset.states.g,
			this.ruleset.states.b,
			this.ruleset.states.a
		)
		this.automatonShader.material.uniforms.threshold.value = new THREE.Vector4(
			this.ruleset.thresholds.r * this.getTileAmount(this.ruleset.dim),
			this.ruleset.thresholds.g * this.getTileAmount(this.ruleset.dim),
			this.ruleset.thresholds.b * this.getTileAmount(this.ruleset.dim),
			this.ruleset.thresholds.a * this.getTileAmount(this.ruleset.dim)
		)
	}

	init(threeWrap) {
		this.threeWrap = threeWrap
		this.textureLoader = new THREE.TextureLoader()

		this.initShaders()
		if (!forShow) {
			this.initGUI()
		}

		window.addEventListener("keydown", e => {
			switch (e.code) {
				case "KeyR":
					this.isRaw = !this.isRaw
					this.getOutputMaterial().uniforms.isRaw.value = this.isRaw
					break
				case "KeyN":
					this.redrawReset()
					break
				case "KeyD":
					this.resetData()
					break
			}
		})
	}

	getStartTextureData() {
		//Lazily load the starting texture / seed....
		if (!this.startTexData) {
			let cnv = getStartCanvas(
				this.width,
				this.height,
				this.ruleset.startSettings
			)
			let c = cnv.getContext("2d")

			let dt = c.getImageData(0, 0, this.width, this.height)

			this.startTexData = dt
		}

		// ... and put it into an Float32Array. Since the imageData on the canvas only stores values from 0-255 (and 0-1 for alpha) we have to transform the data.
		let data = new Float32Array(this.width * this.height * 4)

		let r = this.ruleset.states.r / 255
		let g = this.ruleset.states.g / 255
		let b = this.ruleset.states.b / 255
		let a = this.ruleset.states.a / 1
		let src = this.startTexData.data
		for (let j = 0; j < this.width; j++) {
			for (let i = 0; i < this.height; i++) {
				let ind = j * 4 + i * this.width * 4
				data[ind] = src[ind] * r
				data[ind + 1] = src[ind + 1] * g
				data[ind + 2] = src[ind + 2] * b
				data[ind + 3] = src[ind + 3] * a
			}
		}
		return data
	}
	initShaders() {
		//Each automaton has two shaders.  The automaton shader which handles the computation of the automaton
		//and another shader that we attach to the material and mesh that we add to the scene.
		//We use a "ping-pong"-shader for this. This is a convenient way to save the state of our automaton which is an otherwise difficult thing to do in shaders.
		//It's actually two textures that alternately read and write on each other. ie texture0's pixels are the current state of the automaton, then texture1 will use that
		//to compute the next state and render it. Next texture0 will read texture1 and compute the next state and so on.
		let tileAmount = this.getTileAmount(this.ruleset.dim)

		this.automatonShader = new PingPongShaderBuilder()
			.withDimensions(this.width, this.height)
			.withVertex(PASS_THROUGH_VERTEX)
			.withFragment(this.getAutomatonFragmentShader())
			.withTextureData(this.getStartTextureData())
			.withUniform("time", 0)
			.withUniform(
				"states",
				new THREE.Vector4(
					this.ruleset.states.r,
					this.ruleset.states.g,
					this.ruleset.states.b,
					this.ruleset.states.a
				)
			)
			.withUniform("reach", this.ruleset.reach)
			.withUniform(
				"threshold",
				new THREE.Vector4(
					this.ruleset.thresholds.r * tileAmount,
					this.ruleset.thresholds.g * tileAmount,
					this.ruleset.thresholds.b * tileAmount,
					this.ruleset.thresholds.a * tileAmount
				)
			)
			.withUniform("decay", 0.96)
			.withUniform("resolution", new THREE.Vector2(this.width, this.height))
			.create()

		this.outputMesh = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(),
			this.getOutputMaterial()
		)
		this.outputMesh.position.set(this.x, this.y, 0)
		this.outputMesh.scale.set(this.width, this.height, 1)
		this.threeWrap.scene.add(this.outputMesh)
	}

	getAutomatonFragmentShader() {
		var shd = AUTOMATON_FRAGMENT.replace(
			"#DIM#",
			"const float dim = " + Math.floor(this.ruleset.dim) + ".;"
		)

		shd = shd.replace("#op0R#", this.ruleset.ops0.r)
		shd = shd.replace("#op1R#", this.ruleset.ops1.r)
		shd = shd.replace("#op2R#", this.ruleset.ops2.r)
		shd = shd.replace("#op0G#", this.ruleset.ops0.g)
		shd = shd.replace("#op1G#", this.ruleset.ops1.g)
		shd = shd.replace("#op2G#", this.ruleset.ops2.g)
		shd = shd.replace("#op0B#", this.ruleset.ops0.b)
		shd = shd.replace("#op1B#", this.ruleset.ops1.b)
		shd = shd.replace("#op2B#", this.ruleset.ops2.b)
		shd = shd.replace("#op0A#", this.ruleset.ops0.a)
		shd = shd.replace("#op1A#", this.ruleset.ops1.a)
		shd = shd.replace("#op2A#", this.ruleset.ops2.a)
		return shd
	}

	getOutputMaterial() {
		if (!this.outputMaterial) {
			this.color1 = getRandomUniqueColor()
			this.color2 = getRandomUniqueColor()
			this.color3 = getRandomUniqueColor()
			this.color4 = getRandomUniqueColor()

			let color1 = new THREE.Color(this.color1)
			let color2 = new THREE.Color(this.color2)
			let color3 = new THREE.Color(this.color3)
			let color4 = new THREE.Color(this.color4)

			let states = this.ruleset.states

			this.outputMaterial = new THREE.ShaderMaterial({
				uniforms: {
					diffuseTexture: {
						value: null
					},
					pointsTexture: {
						value: null
					},
					dotOpacity: { value: 1 },
					colorThreshold0: { value: rndFloat(0.01, 0.9) },
					colorThreshold1: { value: rndFloat(0.01, 0.9) },
					colorThreshold2: { value: rndFloat(0.01, 0.9) },
					trailOpacity: { value: 1 },
					isMonochrome: { value: 1 },
					isRaw: { value: false },
					isOnlyRed: { value: this.ruleset.isOnlyRed ? true : false },
					blending: { value: this.ruleset.blending },
					states: {
						value: new THREE.Vector4(states.r, states.g, states.b, states.a)
					},
					color1: { value: new THREE.Vector3(color1.r, color1.g, color1.b) },
					color2: { value: new THREE.Vector3(color2.r, color2.g, color2.b) },
					color3: { value: new THREE.Vector3(color3.r, color3.g, color3.b) },
					color4: { value: new THREE.Vector3(color4.r, color4.g, color4.b) }
				},
				transparent: true,
				blending: THREE.AdditiveBlending,
				vertexShader: PASS_THROUGH_VERTEX,
				fragmentShader: FINAL_RENDER_FRAGMENT
			})
		}
		return this.outputMaterial
	}

	render() {
		if (!this.ticker) {
			this.ticker = 0
			this.mousePlaceColor = 1
			this.spawned = 0
		}
		if (this.ticker % this.tickDur == 0) {
		}
		this.ticker++

		this.automatonShader.render(this.threeWrap.renderer)

		this.outputMesh.material.uniforms.diffuseTexture.value =
			this.automatonShader.getTexture()

		this.automatonShader.setUniform("time", this.ticker)
	}
	getTileAmount(n) {
		let sum = 0
		for (let i = 0; i < n; i++) {
			let base = 2 * (i + 1) + 1
			sum += base * 2 + (base - 2) * 2
		}
		return sum
	}
	initGUI() {
		// let infoButton = document.createElement("div")
		// infoButton.classList.add("infoButton")
		// document.body.appendChild(infoButton)
		// let infoField = document.createElement("div")
		// infoField.classList.add("infoField")
		// infoField.innerHTML = "i"
		// infoButton.appendChild(infoField)
		// infoButton.onclick = () => {
		// 	InfoDialog.create(INFO_TEXT, () => {})
		// }
		let gui = getGUI()

		let folder = gui.addFolder("Automaton " + this.number)
		folder.close()
		let cols = ["r", "g", "b", "a"]

		let states = folder.addFolder("States")
		cols.forEach(col => {
			states
				.add(this.ruleset.states, col, 1, 5000, 1)
				.name(col)
				.onChange(t => {
					this.ruleset.states[col] = t
					this.outputMaterial.uniforms.states.value = new THREE.Vector4(
						this.ruleset.states.r,
						this.ruleset.states.g,
						this.ruleset.states.b,
						this.ruleset.states.a
					)
					this.automatonShader.material.uniforms.states.value =
						new THREE.Vector4(
							this.ruleset.states.r,
							this.ruleset.states.g,
							this.ruleset.states.b,
							this.ruleset.states.a
						)
				})
		})

		folder
			.add(this.automatonShader.material.uniforms.reach, "value", 1, 50, 1)
			.name("Neighbor Reach")
			.onChange(t => (this.ruleset.reach = t))

		folder
			.add(this.ruleset, "dim", 1, 10, 1)
			.name("Neighbor Distance")
			.onChange(t => {
				this.ruleset.dim = t
				this.automatonShader.material.fragmentShader =
					this.getAutomatonFragmentShader()

				this.automatonShader.material.needsUpdate = true
				const tileAmount = this.getTileAmount(this.ruleset.dim)
				this.automatonShader.material.uniforms.threshold.value =
					new THREE.Vector4(
						this.ruleset.thresholds.r * tileAmount,
						this.ruleset.thresholds.g * tileAmount,
						this.ruleset.thresholds.b * tileAmount,
						this.ruleset.thresholds.a * tileAmount
					)
			})

		let threshs = folder.addFolder("Thresholds")
		cols.forEach(col => {
			threshs
				.add(this.ruleset.thresholds, col, 0, 1, 0.01)
				.name(col)
				.onChange(t => {
					this.ruleset.thresholds[col] = t

					const tileAmount = this.getTileAmount(this.ruleset.dim)
					this.automatonShader.material.uniforms.threshold.value =
						new THREE.Vector4(
							this.ruleset.thresholds.r * tileAmount,
							this.ruleset.thresholds.g * tileAmount,
							this.ruleset.thresholds.b * tileAmount,
							this.ruleset.thresholds.a * tileAmount
						)
				})
		})
		folder.add(this, "resetData").name("Reset")
		folder.add(this, "redrawReset").name("Redraw")
		// folder.add(this, "redrawRandom").name("Random start")
		folder.add(this, "copyUrlOfCurrentRuleset").name("Share")

		folder
			.add(this.ruleset, "blending", 0, 1, 0.01)
			.name("Blending")
			.onChange(t => {
				this.getOutputMaterial().uniforms.blending.value = t
			})

		let colors = ["color1", "color2", "color3", "color4"]
		colors.forEach(color => {
			folder.addColor(this, color).onChange(t => {
				this[color] = t
				let threeCol = new THREE.Color(t)
				this.getOutputMaterial().uniforms[color].value = new THREE.Vector3(
					threeCol.r,
					threeCol.g,
					threeCol.b
				)
			})
		})
	}
	resetData() {
		this.automatonShader.setData(this.getStartTextureData())
	}
	redrawRandom() {
		this.startTexData = null
		this.randomDraw = true
		this.automatonShader.setData(this.getStartTextureData())
	}
	redrawReset() {
		this.startTexData = null
		this.randomDraw = false
		this.automatonShader.setData(this.getStartTextureData())
	}
	copyUrlOfCurrentRuleset() {
		let str = this.getEncodedRuleset()
		console.log(window.location.href + "?rules=" + str)
		navigator.clipboard.writeText(window.location.href + "?rules=" + str).then(
			p => console.log("Copied to clipboard"),
			p => console.log("Failed to copy.")
		)
	}
	getEncodedRuleset() {
		return btoa(JSON.stringify(this.ruleset))
	}
	randomizeSettings() {
		this.guiGroups[teamIndex].controllers.forEach(contr => {
			contr._onChange ? contr._onChange() : null
			contr.updateDisplay()
		})
	}
}
