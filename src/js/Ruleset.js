import { rndFloat, rndInt } from "./Util.js"

//Ruleset defining the CCAs' behavior.
export class Ruleset {
	constructor(opts) {
		this.imgDt = opts.imgDt

		//Distance by which neighbors will be analyzed
		this.dim = opts.dim
		//How many states does the cca cycle through
		this.states = opts.states
		//Multiplier
		this.reach = opts.reach
		//Thresholds for RGBA-values of how many neighbors
		//need to have a higher value for the cell to evolve
		this.thresholds = opts.thresholds

		//Operations that determine the behavior when
		//cell is above threshold (op0)
		//cell value is 0 (op1)
		//custom condition is met (op2)

		//These operations are used to build the fragment shader that computes
		//the automaton at runtime.
		this.ops0 = opts.ops0
		this.ops1 = opts.ops1
		this.ops2 = opts.ops2
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
		}
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
