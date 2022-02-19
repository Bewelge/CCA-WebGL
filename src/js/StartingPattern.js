import { getRandomColor } from "./ColorPalletes.js"
import { rndFloat, rndInt, PI2, Vec2 } from "./Util.js"

let defSettings = {
	lines: rndInt(0, 0),
	arcs: rndInt(0, 1),
	rects: rndInt(1, 1),
	nestedRects: rndInt(1, 1),

	color4Corners: rndInt(1, 1),
	dots: rndInt(0, 1),
	noise: rndInt(0, 0),
	startColor:
		"rgba(" +
		rndInt(50, 255) +
		"," +
		rndInt(0, 255) +
		"," +
		rndInt(0, 255) +
		"," +
		rndFloat(0, 1) +
		")"
}

export const getStartSettings = () => {
	return Object.assign({}, defSettings)
}
export const getRandomStartSettings = () => {
	let obj = Object.assign({}, defSettings)
	for (let key in obj) {
		if (key != "startColor") {
			obj[key] = rndFloat(0, 1)
		} else {
			obj[key] = getRandomColor()
		}
	}
	obj.noise = 1
	return obj
}

/**
 * function to create a starting pattern/seed for our automatons. We simply pass back a canvas that we've drawn some stuff on.
 */
export const getStartCanvas = (w, h, settings = {}) => {
	let cnv = document.createElement("canvas")
	cnv.width = w
	cnv.height = h

	let c = cnv.getContext("2d")
	c.lineCap = "round"
	c.lineWidth = rndInt(1, 1)

	let startPattern = new StartingPattern(c, w, h, settings)

	if (rndFloat(0, 1) < settings.noise) {
		startPattern.setRandomValues()
	} else {
		if (rndFloat(0, 1) < settings.color4Corners) {
			startPattern.color4Corners()
		}
		if (rndFloat(0, 1) < settings.nestedRects) {
			startPattern.randomNestedRects()
		}
		if (rndFloat(0, 1) < settings.arcs) {
			startPattern.randomArcs()
		}
		if (rndFloat(0, 1) < settings.rects) {
			startPattern.randomRects()
		}
		if (rndFloat(0, 1) < settings.lines) {
			startPattern.randomLines()
		}
		if (rndFloat(0, 1) < settings.dots) {
			startPattern.randomDots()
		}
	}

	startPattern.heatSink()

	return cnv
}

/**
 * Class that handles the drawing of the inital patterns.
 */
class StartingPattern {
	constructor(c, w, h, settings) {
		this.c = c
		this.w = w
		this.h = h
		this.settings = settings
	}
	getColor() {
		return this.settings.startColor
	}
	getLineWidth() {
		return rndFloat(0.001, 0.001) * this.w
	}
	setStyle() {
		let fs =
			"rgba(" +
			rndFloat(0, 100) +
			"," +
			rndFloat(55, 100) +
			"," +
			rndFloat(55, 55) +
			"," +
			rndFloat(1, 1) +
			")"
		this.getColor()
		this.c.fillStyle = fs
		this.c.strokeStyle = fs
		this.c.lineWidth = this.getLineWidth(this.w)
	}

	setRandomValues() {
		if (!this.randomNoise) {
			this.randomNoise = this.c.getImageData(0, 0, this.w, this.h)
			for (let i = 0; i < this.randomNoise.data.length; i++) {
				this.randomNoise.data[i] = rndInt(0, 255)
			}
		}

		this.c.putImageData(this.randomNoise, 0, 0)
	}
	deleteSquare() {
		let dt = this.c.getImageData(0, 0, this.w, this.h)
		for (let i = 0; i < dt.data.length; i += 4) {
			if ((i / 4) % this.w < this.w / 2) {
				if (Math.floor(i / 4 / this.w) < this.h / 2) {
					dt.data[i + 3] = 0
				}
			}
		}
		c.putImageData(dt, 0, 0)
	}
	heatSink() {
		this.setStyle()

		if (rndFloat(0, 1) < 0.5) {
			let p = new Vec2(rndInt(0, this.w), rndInt(0, this.h))
			let w = 15 * rndInt(15, 50)
			let c = this.c
			c.strokeStyle =
				"rgba(" + rndInt(0, 5) + "," + rndInt(0, 5) + "," + rndInt(0, 5) + ",1)"
			for (let i = 0; i < w; i += 15) {
				c.beginPath()
				c.moveTo(p.x - w / 2 + i, p.y - w / 2)
				c.lineTo(p.x - w / 2 + i, p.y + w / 2)
				c.stroke()
				c.closePath()
			}
		}
		if (rndFloat(0, 1) < 0.5) {
			let p = new Vec2(rndInt(0, this.w), rndInt(0, this.h))
			let w = 15 * rndInt(15, 50)
			let c = this.c
			c.strokeStyle =
				"rgba(" + rndInt(0, 5) + "," + rndInt(0, 5) + "," + rndInt(0, 5) + ",1)"
			for (let i = 0; i < w; i += 15) {
				c.beginPath()
				c.moveTo(p.x - w / 2, p.y - w / 2 + i)
				c.lineTo(p.x + w / 2, p.y - w / 2 + i)
				c.stroke()
				c.closePath()
			}
		}
	}
	randomLines() {
		for (let i = 0; i < rndInt(10, 10); i++) {
			this.setStyle()
			let p0 = new Vec2(rndInt(0, this.w), rndInt(0, this.h))
			let p1 = new Vec2(rndInt(0, this.w), rndInt(0, this.h))
			this.c.beginPath()
			this.c.moveTo(p0.x, p0.y)
			this.c.lineTo(p1.x, p1.y)
			this.c.stroke()
			this.c.closePath()
		}
	}
	randomArcs() {
		this.setStyle()
		for (let i = 0; i < rndInt(1, 10); i++) {
			this.c.beginPath()
			this.c.arc(
				rndInt(0, this.w),
				rndInt(0, this.h),
				rndInt(100, 1000),
				0,
				PI2
			)
			this.c.fill()
			this.c.closePath()
		}
	}
	randomDots() {
		for (let i = 0; i < rndInt(1, 10); i++) {
			this.setStyle()
			this.c.beginPath()
			this.c.arc(
				this.w / 2 - rndInt(-this.w / 100, this.w / 100),
				this.h / 2 - rndInt(-this.w / 100, this.w / 100),
				rndInt(1, 5),
				0,
				PI2
			)
			this.c.fill()
			this.c.closePath()
		}
	}
	randomRects() {
		for (let i = 0; i < rndInt(10, 10); i++) {
			this.setStyle()
			this.c.beginPath()
			this.c.rect(
				rndInt(0, this.w),
				rndInt(0, this.h),
				rndInt(100, 1000),
				rndInt(100, 1000)
			)
			// this.c.fill()
			this.c.stroke()
			this.c.closePath()
		}
	}

	randomNestedRects() {
		let rp = new Vec2(rndInt(0, this.w), rndInt(0, this.h))
		let rw = rndFloat(0.05, 0.16) * this.w
		let rh = rndFloat(0.05, 0.16) * this.w
		this.setStyle()
		for (let i = 0; i < rw / rndInt(10, 10); i++) {
			this.c.beginPath()
			this.c.rect(
				rp.x - rw - i * 15,
				rp.y - rh - i * 15,
				rw + i * 30,
				rh + i * 30
			)
			this.c.stroke()
			this.c.closePath()
		}
	}
	randomGrowingRects() {
		let rp = new Vec2(rndInt(0, this.w), rndInt(0, this.h))
		let rw = rndFloat(0.01, 10) * this.w
		let rh = rndFloat(0.01, 10) * this.w
		this.setStyle()
		for (let i = 0; i < rndInt(10, 10); i++) {
			this.c.beginPath()
			this.c.rect(
				rp.x - rw + i * 5,
				rp.y - rh + i * 5,
				rw + i * 10,
				rh + i * 10
			)
			this.c.stroke()
			this.c.closePath()
		}
	}

	color4Corners() {
		let cols = [
			"rgba(255,0,0,1)",
			"rgba(255,0,0,1)",
			"rgba(0,0,255,1)",
			"rgba(255,255,255,1)"
		]

		let fs = cols[rndInt(0, cols.length - 1)]
		this.c.fillStyle = fs
		this.c.fillRect(0, 0, this.w / 2, this.h / 2)
		cols.splice(cols.indexOf(fs), 1)

		fs = cols[rndInt(0, cols.length - 1)]
		this.c.fillStyle = fs
		this.c.fillRect(this.w / 2, 0, this.w / 2, this.h / 2)
		cols.splice(cols.indexOf(fs), 1)

		fs = cols[rndInt(0, cols.length - 1)]
		this.c.fillStyle = fs
		this.c.fillRect(this.w / 2, this.h / 2, this.w / 2, this.h / 2)
		cols.splice(cols.indexOf(fs), 1)

		fs = cols[rndInt(0, cols.length - 1)]
		this.c.fillStyle = fs
		this.c.fillRect(0, this.h / 2, this.w / 2, this.h / 2)
		cols.splice(cols.indexOf(fs), 1)
	}
}
