import { EffectComposer } from "../lib/EffectComposer/EffectComposer.js"
import { RenderPass } from "../lib/EffectComposer/RenderPass.js"
import { GlitchPass } from "../lib/EffectComposer/GlitchPass.js"
import { FilmPass } from "../lib/EffectComposer/FilmPass.js"
import { BloomPass } from "../lib/EffectComposer/BloomPass.js"
import { BokehPass } from "../lib/EffectComposer/BokehPass.js"
import { ClearMaskPass } from "../lib/EffectComposer/MaskPass.js"
import { ClearPass } from "../lib/EffectComposer/ClearPass.js"
import { DotScreenPass } from "../lib/EffectComposer/DotScreenPass.js"
import { OutlinePass } from "../lib/EffectComposer/OutlinePass.js"
import { LUTPass } from "../lib/EffectComposer/LUTPass.js"
import { AdaptiveToneMappingPass } from "../lib/EffectComposer/AdaptiveToneMappingPass.js"
import { AfterimagePass } from "../lib/EffectComposer/AfterimagePass.js"
import { PerspectiveCamera } from "../lib/three.module.js"
import * as THREE from "../lib/three.module.js"

import {
	getThreeRenderer,
	getThreeScene,
	orthographicCamera
} from "./ThreeJsUtils.js"
import { saveImg } from "./Util.js"

export class ThreeJsRender {
	constructor(width, height) {
		this.width = width
		this.height = height
		this.renderer = getThreeRenderer()

		if (!this.renderer.capabilities.isWebGL2) {
			InfoDialog.create(
				"This page requires WebGL2. Your browser does not currently support it. You can check <a href='https://caniuse.com/webgl2'>https://caniuse.com/webgl2</a> to see which browsers are supported.",
				() => {}
			)
			return
		}

		this.renderer.setSize(width, height)
		this.scene = new THREE.Scene()
		this.camera = orthographicCamera(width, height)
		this.camera.position.z = 1
		this.composer = new EffectComposer(this.renderer)
		const renderPass = new RenderPass(this.scene, this.camera)
		this.composer.addPass(renderPass)

		window.addEventListener("keydown", e =>
			e.code == "KeyS" ? saveImg(this.renderer.domElement) : null
		)

		// const glitchPass = new AfterimagePass(0.95)

		// this.composer.addPass(glitchPass)
		// const glitchPass = new DotScreenPass(
		// 	new THREE.Vector2(this.width / 2, this.height / 2),
		// 	rndFloat(0, PI2),
		// 	100
		// 	// rndFloat(0.5, 2)
		// )
		// this.composer.addPass(glitchPass)
		// const glitchPass2 = new BokehPass(this.scene, this.camera)
		// this.composer.addPass(glitchPass2)

		document.body.appendChild(this.renderer.domElement)
	}
	render() {
		//main render call. Renders the scene with all the plane meshes.
		this.renderer.setSize(this.width, this.height)
		this.composer.render(this.scene, this.camera)
	}
}
