import { GUI } from "../../lib/lil-gui.esm.js"

let gui
export const getGUI = () => {
	if (!gui) {
		gui = new GUI()
	}
	return gui
}
