function rndFloat(min, max) {
	return min + (max - min) * fxrand()
}
function rndInt(min, max) {
	return Math.round(min + (max - min) * fxrand())
}

function isSafari() {
	return (
		!!navigator.userAgent.match(/Safari/i) &&
		!navigator.userAgent.match(/Chrome/i)
	)
}

export { rndFloat, rndInt, isSafari }

export const PI = Math.PI
export const PI2 = Math.PI * 2
export const PI05 = Math.PI * 0.5
export class Vec2 {
	constructor(x = 0, y = 0) {
		this._x = x
		this._y = y
	}
	get x() {
		return this._x
	}
	get y() {
		return this._y
	}
	get length() {
		return this.distanceToOrigin()
	}
	addVector(vector) {
		this._x += vector.x
		this._y += vector.y
		return this
	}
	subtractVector(vector) {
		this._x -= vector.x
		this._y -= vector.y
		return this
	}
	addAngle(angle, dist) {
		this._x += Math.cos(angle) * dist
		this._y += Math.sin(angle) * dist
		return this
	}
	multiply(number) {
		this._x *= number
		this._y *= number
		return this
	}
	rotateAround(vec, ang) {
		let curAng = this.angleTo(vec)
		let dis = vec.distanceTo(this)
		let newP = vec.copy().addAngle(curAng + ang, -dis)

		this._x = newP.x
		this._y = newP.y
		return this
	}
	ceiling(num) {
		this._x = Math.min(num, this._x)
		this._y = Math.min(num, this._y)
		return this
	}
	bottom(num) {
		this._x = Math.max(num, this._x)
		this._y = Math.max(num, this._y)
		return this
	}
	peg(min, max) {
		this.ceiling(max)
		this.bottom(min)
		return this
	}
	distanceTo(vector) {
		return distancePoints(this, vector)
	}
	distanceToOrigin() {
		return distancePoints(this, Vec2.origin())
	}
	angleTo(vector) {
		return anglePoints(this, vector)
	}
	angleToOrigin() {
		return this.angleTo(Vec2.origin())
	}
	copy() {
		return new Vec2(this._x, this._y)
	}
	isInBound() {
		return this._x > 0 && this._x < width && this._y > 0 && this._y < height
	}

	static middle(w = width, h = height) {
		return new Vec2(w / 2, h / 2)
	}
	static middleOf(vec1, vec2) {
		return new Vec2((vec1.x + vec2.x) / 2, (vec1.y + vec2.y) / 2)
	}
	static random(x, y) {
		x = x || width
		y = y || height
		return new Vec2(randomInt(0, x), randomInt(0, y))
	}
	static create(x, y) {
		return new Vec2(x, y)
	}
	static origin() {
		return new Vec2(0, 0)
	}
}

export const saveImg = cnvEl => {
	let a = document.createElement("a")

	let cnv = document.createElement("canvas")
	cnv.width = this.renderer.domElement.width
	cnv.height = this.renderer.domElement.height
	let c = cnv.getContext("2d")
	c.fillStyle = "black"
	c.fillRect(0, 0, cnv.width, cnv.height)
	c.drawImage(cnvEl, 0, 0)
	a.href = cnv.toDataURL()

	a.download = document.title + " by Bewelge"
	a.click()
}

const drawStickman = () => {
	let head = new Vec2(width / 2, height / 2)
	let bottom = head.copy().addAngle(-PI05, width / 9)

	let hipAng = 0.4 + rndFloat(-0.1, 0.1)
	let kneeAng = 0.2 + rndFloat(-0.1, 0.1)
	let hipLng = rndFloat(width / 18, width / 18)
	let kneeLng = rndFloat(width / 16, width / 16)
	let handAng = PI05 * 0.8
	let armLng = rndFloat(width / 12, width / 12)

	let leftKnee = bottom.copy().addAngle(-PI05 + hipAng, hipLng)
	let leftFoot = leftKnee.copy().addAngle(-PI05 + kneeAng, kneeLng)
	let rightKnee = bottom.copy().addAngle(-PI05 - hipAng, hipLng)
	let rightFoot = rightKnee.copy().addAngle(-PI05 - kneeAng, kneeLng)
	let shoulders = head.copy().addAngle(-PI05, width / 17)
	let leftHand = shoulders.copy().addAngle(PI05 + handAng, armLng)
	let rightHand = shoulders.copy().addAngle(PI05 - handAng, armLng)

	// c.beginPath()
	// c.arc(head.x, head.y, 100, 0, Math.PI * 2)
	// c.stroke()
	// c.closePath()

	// c.lineWidth = 33
	// c.beginPath()
	// c.moveTo(head.x, head.y)
	// c.lineTo(bottom.x, bottom.y)
	// c.fill()
	// c.closePath()

	// c.lineWidth = 23
	// c.beginPath()
	// c.moveTo(bottom.x, bottom.y)
	// c.lineTo(leftKnee.x, leftKnee.y)
	// c.stroke()
	// c.closePath()

	// c.beginPath()
	// c.moveTo(leftKnee.x, leftKnee.y)
	// c.lineTo(leftFoot.x, leftFoot.y)
	// c.stroke()
	// c.closePath()

	// c.lineWidth = 23
	// c.beginPath()
	// c.moveTo(bottom.x, bottom.y)
	// c.lineTo(rightKnee.x, rightKnee.y)
	// c.stroke()
	// c.closePath()

	// c.beginPath()
	// c.moveTo(rightKnee.x, rightKnee.y)
	// c.lineTo(rightFoot.x, rightFoot.y)
	// c.stroke()
	// c.closePath()

	// c.beginPath()
	// c.moveTo(shoulders.x, shoulders.y)
	// c.lineTo(leftHand.x, leftHand.y)
	// c.stroke()
	// c.closePath()

	// c.beginPath()
	// c.moveTo(shoulders.x, shoulders.y)
	// c.lineTo(rightHand.x, rightHand.y)
	// c.stroke()
	// c.closePath()
}
