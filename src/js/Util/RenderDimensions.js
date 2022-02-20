class RenderDimensions {
	constructor() {
		this.width = 1000
		this.height = 1000
		this.fixedSize = 1000
		this.resizeCallbacks = []
		window.addEventListener("keydown", e => {
			if (e.code == "KeyF") {
				if (this.width == this.fixedSize && this.height == this.fixedSize) {
					this.width = window.innerWidth
					this.height = window.innerHeight
				} else {
					this.width = this.fixedSize
					this.height = this.fixedSize
				}
				this.resizeCallbacks.forEach(cb => cb())
			}
		})
	}
	addResizeCallback(callback) {
		this.resizeCallbacks.push(callback)
	}
	getDims() {
		return {
			width: this.width,
			height: this.height
		}
	}
}

var renderDims = new RenderDimensions()
export const getWindowDimensions = () => renderDims.getDims()
export const addResizeCallback = cb => renderDims.addResizeCallback(cb)
