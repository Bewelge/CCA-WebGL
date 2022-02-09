import { rndFloat, rndInt, PI2, Vec2 } from "./Util.js"

/**
 * Bunch of helper functions to create a starting pattern/seed for our automatons. We simply pass back a canvas that we've drawn some stuff on.
 */
export const getStartCanvas = (w, h, rand) => {
	let cnv = document.createElement("canvas")
	cnv.width = w
	cnv.height = h

	let c = cnv.getContext("2d")
	c.lineCap = "round"
	c.lineWidth = rndInt(1, 1)

	if (rand) {
		setRandomValues(c, w, h)
	} else {
		if (rndFloat(0, 1) < 0.5) {
			// color4Corners(c, w, h)
		}
		// if (rndFloat(0, 1) < 0.5) {
		// 	randomArcs(c, w, h)
		// }
		// if (rndFloat(0, 1) < 0.5) {
		// 	randomRects(c, w, h)
		// }
		// if (rndFloat(0, 1) < 0.5) {
		// 	randomLines(c, w, h)
		// }
		// if (rndFloat(0, 1) < 0.5) {
		// 	randomRectsMult(c, w, h)
		// }
		if (rndFloat(0, 1) < 0.5) {
			// deleteSquare(c, w, h)
		}
		if (rndFloat(0, 1) < 0.5) {
			randomDots(c, w, h)
		}
	}

	return cnv
}

const setRandomValues = (c, w, h) => {
	let d = c.getImageData(0, 0, w, h)
	for (let i = 0; i < d.data.length; i++) {
		d.data[i] = rndInt(0, 255)
	}
	c.putImageData(d, 0, 0)
}
function deleteSquare(c, w, h) {
	let dt = c.getImageData(0, 0, w, h)
	for (let i = 0; i < dt.data.length; i += 4) {
		if ((i / 4) % w < w / 2) {
			if (Math.floor(i / 4 / w) < h / 2) {
				dt.data[i + 3] = 0
			}
		}
	}
	c.putImageData(dt, 0, 0)
}

function randomLines(c, w, h) {
	for (let i = 0; i < rndInt(10, 10); i++) {
		let fs =
			"rgba(" +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndFloat(0, 1) +
			")"
		c.fillStyle = fs
		c.strokeStyle = fs
		c.lineWidth = rndInt(1, 50)
		let p0 = new Vec2(rndInt(0, w), rndInt(0, h))
		let p1 = new Vec2(rndInt(0, w), rndInt(0, h))
		c.beginPath()
		c.moveTo(p0.x, p0.y)
		c.lineTo(p1.x, p1.y)
		c.stroke()
		c.closePath()
	}
}
function randomArcs(c, w, h) {
	for (let i = 0; i < rndInt(10, 10); i++) {
		let fs =
			"rgba(" +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndFloat(0, 1) +
			")"
		c.fillStyle = fs
		c.strokeStyle = fs
		c.lineWidth = rndInt(1, 50)
		c.beginPath()
		c.arc(rndInt(0, w), rndInt(0, h), rndInt(100, 1000), 0, PI2)
		c.stroke()
		c.closePath()
	}
}
function randomDots(c, w, h) {
	for (let i = 0; i < rndInt(1, 10); i++) {
		let fs =
			"rgba(" +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndFloat(0, 1) +
			")"
		c.fillStyle = fs
		c.strokeStyle = fs
		c.lineWidth = rndInt(1, 50)
		c.beginPath()
		c.arc(
			w / 2 - rndInt(-10, 10),
			h / 2 - rndInt(-10, 10),
			rndInt(1, 5),
			0,
			PI2
		)
		c.fill()
		c.closePath()
	}
}
function randomRects(c, w, h) {
	for (let i = 0; i < rndInt(10, 10); i++) {
		c.lineWidth = rndInt(1, 50)
		let fs =
			"rgba(" +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndFloat(0, 1) +
			")"
		c.fillStyle = fs
		c.strokeStyle = fs
		c.beginPath()
		c.rect(rndInt(0, w), rndInt(0, h), rndInt(100, 1000), rndInt(100, 1000))
		c.stroke()
		c.closePath()
	}
}

function randomRectsMult(c, w, h) {
	let rp = new Vec2(rndInt(0, w), rndInt(0, h))
	let rw = rndInt(50, 100)
	let rh = rndInt(50, 100)
	c.lineWidth = rndInt(1, 5)
	for (let i = 0; i < rndInt(10, 10); i++) {
		let fs =
			"rgba(" +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndFloat(0, 1) +
			")"
		c.fillStyle = fs
		c.strokeStyle = fs

		c.beginPath()
		c.rect(rp.x - rw - i * 5, rp.y - rh - i * 5, rw + i * 10, rh + i * 10)
		c.stroke()
		c.closePath()
	}
}
function randomGrowingRects(c, w, h) {
	let rp = new Vec2(rndInt(0, w), rndInt(0, h))
	let rw = rndInt(50, 100)
	let rh = rndInt(50, 100)
	c.lineWidth = rndInt(1, 5)
	for (let i = 0; i < rndInt(10, 10); i++) {
		let fs =
			"rgba(" +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndFloat(0, 1) +
			")"
		c.fillStyle = fs
		c.strokeStyle = fs

		c.beginPath()
		c.rect(rp.x - rw + i * 5, rp.y - rh + i * 5, rw + i * 10, rh + i * 10)
		c.stroke()
		c.closePath()
	}
}

function color4Corners(c, w, h) {
	let cols = [
		"rgba(255,0,0,1)",
		"rgba(255,0,0,1)",
		"rgba(0,0,255,1)",
		"rgba(255,255,255,1)"
	]

	let fs = cols[rndInt(0, cols.length - 1)]
	c.fillStyle = fs
	c.fillRect(0, 0, w / 2, h / 2)
	cols.splice(cols.indexOf(fs), 1)

	fs = cols[rndInt(0, cols.length - 1)]
	c.fillStyle = fs
	c.fillRect(w / 2, 0, w / 2, h / 2)
	cols.splice(cols.indexOf(fs), 1)

	fs = cols[rndInt(0, cols.length - 1)]
	c.fillStyle = fs
	c.fillRect(w / 2, h / 2, w / 2, h / 2)
	cols.splice(cols.indexOf(fs), 1)

	fs = cols[rndInt(0, cols.length - 1)]
	c.fillStyle = fs
	c.fillRect(0, h / 2, w / 2, h / 2)
	cols.splice(cols.indexOf(fs), 1)
}
