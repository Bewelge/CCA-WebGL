import { rndInt } from "./Util.js"

var colorPalletes = {
	// "Orange/Yellow/Green": ["#EA5C2B", "#FF7F3F", "#F6D860", "#95CD41"],
	// Neon: ["#542E71", "#FB3640", "#FDCA40", "#A799B7"],
	// "Red/Blue/White": ["rgba(255,0,0,1)", "#292C6D", "#FAEDF0", "#EC255A"],

	metalBlue: ["#0024b3", "#676FA3", "#CDDEFF", "#000000"],
	Blue: ["#1A374D", "#406882", "#6998AB", "#B1D0E0"],
	// "Purple/Blue": ["#370665", "#35589A", "#F14A16", "#FC9918"],
	Greens: ["#FEFFDE", "#f8ea54", "#4d9d3f", "#52734D"],
	// brownRedish: ["#b3feff", "#804747", "#c09191", "#030202"],
	// white: [
	// 	"rgba(255,255,255,1)",
	// 	"rgba(255,255,255,0.6)",
	// 	"rgba(255,255,255,0.3)",
	// 	"rgba(255,255,255,0.1)"
	// ],
	Monochrome2: ["#460101", "#ff9500", "#570000", "#000000"],
	Monochrome: [
		"rgba(10,10,10,1)",
		"rgba(240,240,0,0.1)",
		"rgba(250,250,250,1)",
		"rgba(60,60,60,1)"
	],
	blueGolden: [
		"rgba(10,50,150,1)",
		"rgba(180,180,5,1)",
		"rgba(10,10,110,1)",
		"rgba(5,15,250,1)"
	],
	greenGolden: [
		"rgba(19,110,22,1)",
		"rgba(250,250,5,1)",
		"rgba(180,180,50,1)",
		"rgba(50,50,50,1)"
	]
	// Monochrome: [
	// 	"rgba(10,,150,1)",
	// 	"rgba(10,10,10,1)",
	// 	"rgba(105,115,150,1)",
	// 	"rgba(120,130,165,1)"
	// ]
}
let thePallete =
	Object.keys(colorPalletes)[rndInt(0, Object.keys(colorPalletes).length - 1)]
export const getRandomColor = () =>
	colorPalletes[thePallete][rndInt(0, colorPalletes[thePallete].length - 1)]

let usedColors = []
export const getRandomUniqueColor = () => {
	let col = colorPalletes[thePallete][usedColors.length] //rndInt(0, colorPalletes[thePallete].length - 1)]
	let tries = 0
	while (
		usedColors.length != colorPalletes[thePallete].length &&
		!(usedColors.indexOf(col) >= 0) &&
		tries < 5
	) {
		tries++
		col = colorPalletes[thePallete][usedColors.length]
	}
	usedColors.push(col)
	return col
}
export const getThePalette = () => thePallete
