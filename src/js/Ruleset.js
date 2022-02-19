import { getRandomStartSettings } from "./StartingPattern.js"
import { rndFloat, rndInt, peg } from "./Util.js"

//Ruleset defining the CCAs' behavior.
export class Ruleset {
	constructor(opts) {
		this.imgDt = opts.imgDt

		//Distance by which neighbors will be analyzed
		this.dim = opts.dim
		//How many states does the cca cycle through
		this.states = opts.states
		//Multiplier of neighbour distance that will be analyzed. reach = 2 means neighbours with distance 2, 4, 6 ... will be analysed.
		this.reach = opts.reach
		//Thresholds for RGBA-values of how many neighbors
		//need to have a higher value for the cell to evolve
		this.thresholds = opts.thresholds

		//How flat the output colors are rendered.
		this.blending = opts.blending

		//Operations that determine the behavior of a cell. Count is the number of neighbours that have a higher value than the cell itself.
		//count is above threshold (op0)
		//count is 0 (op1)
		//custom condition is met (op2)

		//These operations are used to build the fragment shader that computes
		//the automaton at runtime.
		this.ops0 = opts.ops0
		this.ops1 = opts.ops1
		this.ops2 = opts.ops2

		this.startSettings = opts.startSettings
	}
	copy() {
		//create a new ruleset object with the same attributes.
		return new Ruleset({
			imgDt: this.imgDt,
			dim: this.dim,
			states: Object.assign({}, this.states),
			reach: this.reach,
			thresholds: Object.assign({}, this.thresholds),
			ops0: this.ops0,
			ops1: this.ops1,
			ops2: this.ops2,
			startSettings: Object.assign({}, this.startSettings)
		})
	}
	mutate(startPatternRate, settingsRate) {
		//slightly mutate the attributes of a given ruleset.
		let cols = ["r", "g", "b", "a"]
		if (rndFloat() < settingsRate) {
			this.dim = peg(this.dim + rndFloat(-1, 1), 0, 100)
		}
		if (rndFloat() < settingsRate) {
			this.reach = peg(this.reach + rndFloat(-1, 1), 0, 3)
		}
		if (rndFloat() < settingsRate) {
			cols.forEach(
				col =>
					(this.states[col] = peg(
						this.states[col] + rndInt(-150, 150),
						0,
						1000
					))
			)
		}
		if (rndFloat() < settingsRate) {
			cols.forEach(
				col =>
					(this.thresholds[col] = peg(
						this.thresholds[col] + rndInt(-0.1, 0.1),
						0,
						1
					))
			)
		}
		for (let key in this.startSettings) {
			if (key != "startColor") {
				if (rndFloat(0, 1) < startPatternRate) {
					this.startSettings[key] = peg(
						this.startSettings[key] + rndInt(-1, 1),
						0,
						1
					)
				}
			}
		}

		// ops0
		// ops1
		// ops2
		return this
	}
}

export const getRandomRuleset = () =>
	new Ruleset({
		dim: rndInt(1, 5),
		states: {
			r: rndFloat(100, 1000),
			g: rndFloat(100, 1000),
			b: rndFloat(100, 1000),
			a: rndFloat(100, 1000)
		},
		reach: rndInt(1, 2),
		thresholds: {
			r: rndFloat(0.3, 0.8),
			g: rndFloat(0.3, 0.8),
			b: rndFloat(0.3, 0.8),
			a: rndFloat(0.3, 0.8)
		},
		ops0: {
			r:
				"self.r" +
				getRandomOp() +
				getRandomVal() +
				";" +
				getRandomCompleteOps(),
			g:
				"self.g" +
				getRandomOp() +
				getRandomVal() +
				";" +
				getRandomCompleteOps(),
			b:
				"self.b" +
				getRandomOp() +
				getRandomVal() +
				";" +
				getRandomCompleteOps(),
			a:
				"self.a" + getRandomOp() + getRandomVal() + ";" + getRandomCompleteOps()
		},
		ops1: {
			r:
				"self.r" +
				getRandomOp() +
				getRandomVal() +
				";" +
				getRandomCompleteOps(),
			g:
				"self.g" +
				getRandomOp() +
				getRandomVal() +
				";" +
				getRandomCompleteOps(),
			b:
				"self.b" +
				getRandomOp() +
				getRandomVal() +
				";" +
				getRandomCompleteOps(),
			a:
				"self.a" + getRandomOp() + getRandomVal() + ";" + getRandomCompleteOps()
		},
		ops2: {
			r: "",
			g: "",
			b: "",
			a: ""
		},
		blending: rndFloat(0, 1),
		startSettings: getRandomStartSettings()
	})

const ops = ["+=", "=", "-="]
// , "*=", "/="]
const getRandomOp = () => ops[rndInt(0, ops.length - 1)]

const vals = [
	"1.",
	"2.",
	"3.",
	"4.",
	"self.r",
	"self.g",
	"self.b",
	"self.a",
	"count.r",
	"count.g",
	"count.b",
	"count.a"
]
const vars = ["self.r", "self.g", "self.b", "self.a"]
const getRandomVal = () => vals[rndInt(0, vals.length - 1)]
const getRandomVar = () => vars[rndInt(0, vars.length - 1)]
const getRandomCompleteOp = () =>
	getRandomVar() + getRandomOp() + getRandomVal() + ";"
const getRandomCompleteOps = () =>
	Array(rndInt(0, 0))
		.fill(0)
		.map(z => getRandomCompleteOp())
		.join("")
