import { Ruleset } from "./Ruleset.js"
import { rndFloat, rndInt } from "./Util.js"

/**
 * Different interesting rulesets I've come across.
 */
export const variant12 = {
	dim: 1,
	states: {
		r: rndInt(50, 100),
		g: rndInt(50, 100),
		b: rndInt(50, 100),
		a: rndInt(50, 100)
	},
	reach: rndInt(2, 2),
	thresholds: {
		r: rndFloat(0.7, 0.7),
		g: rndFloat(0.6, 0.6),
		b: rndFloat(0.7, 0.7),
		a: rndFloat(0.6, 0.6)
	},
	ops0: {
		r: "self.r-=abs(self.g - self.b) ;",
		g: `self.g+=1.;`,
		b: "self.b+=1.;",
		a: `self.a+=1.;
			self.r++;`
	},
	ops1: {
		r: "self.r += self.g;",
		g: "self.g-=0.1;",
		b: `self.b-=1.;
		self.a+=.1;
		self.r+=states.r/5.;`,
		a: "self.a-=0.1;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 1,
		rects: 0,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}

export const scribbled = {
	dim: 5,
	states: {
		r: 639.474330493249,
		g: 349.4138394482434,
		b: 945.892330002971,
		a: 247.17970904894173
	},
	reach: 2,
	thresholds: {
		r: 0.44146722969599067,
		g: 0.6933155798586086,
		b: 0.6901097080670298,
		a: 0.5931670775869862
	},
	ops0: {
		r: "self.r+=self.a;",
		g: "self.g+=count.r;",
		b: "self.b+=count.g;",
		a: "self.a=self.r;"
	},
	ops1: {
		r: "self.r+=count.r;",
		g: "self.g=3.;",
		b: "self.b=3.;",
		a: "self.a=2.;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 0,
		rects: 0,
		nestedRects: 1,
		color4Corners: 1,
		dots: 0,
		noise: 0,
		startColor: "rgba(25,120,201,0.7823235846590251)"
	}
}
export const creature = {
	dim: 4,
	states: {
		r: 736.2840567249805,
		g: 253.8986229337752,
		b: 783.5080895805731,
		a: 875.942204403691
	},
	reach: 2,
	thresholds: {
		r: 0.35437907332088797,
		g: 0.5009905227459968,
		b: 0.451325732585974,
		a: 0.5994847948430106
	},
	ops0: {
		r: "self.r=2.;",
		g: "self.g-=count.r;",
		b: "self.b=3.;",
		a: "self.a+=count.r;"
	},
	ops1: {
		r: "self.r=3.;",
		g: "self.g-=self.r;",
		b: "self.b+=self.a;",
		a: "self.a=count.b;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 0,
		rects: 0,
		nestedRects: 0,
		color4Corners: 0,
		dots: 1,
		noise: 0,
		startColor:
			"rgba(" +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			"," +
			rndInt(0, 255) +
			",1)"
	}
}
export const fineStructures = {
	dim: 2,
	states: {
		r: 690.7135545974597,
		g: 951.8592214211822,
		b: 738.2792187388986,
		a: 266.0988132469356
	},
	reach: 1,
	thresholds: {
		r: 0.5439919079188258,
		g: 0.509932083496824,
		b: 0.3716244786744937,
		a: 0.6957902572583408
	},
	ops0: {
		r: "self.r=2.;",
		g: "self.g-=count.a;",
		b: "self.b=1.;",
		a: "self.a-=count.a;"
	},
	ops1: {
		r: "self.r-=self.r;",
		g: "self.g-=count.a;",
		b: "self.b+=4.;",
		a: "self.a=4.;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 1,
		nestedRects: 1,
		color4Corners: 1,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}
export const fineStructures2 = {
	dim: 4,
	states: {
		r: 856.8971595959738,
		g: 708.1258094869554,
		b: 549.1477261995897,
		a: 207.8197967261076
	},
	reach: 2,
	thresholds: {
		r: 0.45261639340315013,
		g: 0.363318403204903,
		b: 0.5892354495124892,
		a: 0.3067795267095789
	},
	ops0: {
		r: "self.r-=self.b;",
		g: "self.g=3.;",
		b: "self.b=self.a;",
		a: "self.a+=self.r;"
	},
	ops1: {
		r: "self.r+=self.b;",
		g: "self.g-=count.a;",
		b: "self.b+=4.;",
		a: "self.a-=self.g;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 1,
		nestedRects: 1,
		color4Corners: 1,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}
// eyJkaW0iOjIsInN0YXRlcyI6eyJyIjo4NjEuMDg1MjYxNTQ0MjEyNywiZyI6ODAyLjg5MzkyNTM4ODM0MzYsImIiOjcxMy4yMjA0MTE1MzkwNzc4LCJhIjo3ODkuMTk5MjA5Njc4OTE4MX0sInJlYWNoIjoyLCJ0aHJlc2hvbGRzIjp7InIiOjAuNjI1OTg4MTcyNTUzNDc5NywiZyI6MC41OTUyNTQ2NTY2OTU3NjA4LCJiIjowLjU4NTY2NzUxMDAwNDcxNDIsImEiOjAuMzAxMTc5NjQ0MDIzMDY4MjR9LCJvcHMwIjp7InIiOiJzZWxmLnItPWNvdW50LnI7IiwiZyI6InNlbGYuZz0yLjsiLCJiIjoic2VsZi5iPTIuOyIsImEiOiJzZWxmLmE9Y291bnQuYjsifSwib3BzMSI6eyJyIjoic2VsZi5yKz00LjsiLCJnIjoic2VsZi5nPTQuOyIsImIiOiJzZWxmLmItPXNlbGYuYjsiLCJhIjoic2VsZi5hPWNvdW50LnI7In0sIm9wczIiOnsiciI6IiIsImciOiIiLCJiIjoiIiwiYSI6IiJ9fQ==
export const blueStructures = {
	dim: 2,
	states: {
		r: rndFloat(50, 100),
		g: rndFloat(50, 100),
		b: rndFloat(50, 100),
		a: rndFloat(50, 100)
	},
	reach: rndInt(1, 1),
	thresholds: {
		r: rndFloat(0.6, 0.6),
		g: rndFloat(0.6, 0.6),
		b: rndFloat(0.6, 0.6),
		a: rndFloat(0.4, 0.4)
	},
	ops0: {
		r: "self.r += 1. + self.b ;",
		g: `self.g += 1.; 
		self.b *= self.r;`,
		b: "self.b++;",
		a: `self.r*=2.;
			self.r++;`
	},
	ops1: {
		r: "self.r = self.g;",
		g: "self.g+=1.;",
		b: `self.b--;
		self.a+=2.;
		self.r+=states.r/5.;`,
		a: "self.a--;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 1,
		rects: 0,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}
export const bluepurplestructure = {
	dim: 1,
	states: {
		r: rndFloat(500, 1001),
		g: rndFloat(500, 1001),
		b: rndFloat(500, 1001),
		a: rndFloat(500, 1001)
	},
	reach: rndInt(1, 1),
	thresholds: {
		r: rndFloat(0.7, 0.7),
		g: rndFloat(0.6, 0.6),
		b: rndFloat(0.7, 0.7),
		a: rndFloat(0.6, 0.6)
	},
	ops0: {
		r: "self.r-= self.b ;",
		g: `self.g+=1.; 
		self.r-=1.;`,
		b: "self.b++;",
		a: `self.r-=2.;
			self.r++;`
	},
	ops1: {
		r: "self.r = self.g;",
		g: "self.g-=2.;",
		b: `self.b-=1.;
		self.a+=2.;
		self.r+=states.b/5.;`,
		a: "self.a--;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 1,
		nestedRects: 1,
		color4Corners: 1,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}

export const alienRace = {
	dim: 4,
	states: {
		r: rndFloat(500, 1000),
		g: rndFloat(500, 1000),
		b: rndFloat(500, 1000),
		a: rndFloat(500, 1000)
	},
	reach: rndInt(1, 1),
	thresholds: {
		r: rndFloat(0.7, 0.7),
		g: rndFloat(0.6, 0.6),
		b: rndFloat(0.7, 0.7),
		a: rndFloat(0.3, 0.3)
	},
	ops0: {
		r: "self.r-=1.+ self.b ;",
		g: `self.g+=5.; 
		self.r-=1.;`,
		b: "self.b+=0.1;",
		a: `self.r-=2.;
			self.r++;`
	},
	ops1: {
		r: "self.r += self.g;",
		g: "self.g-=2.;",
		b: `self.b-=1.;
		self.a+=2.;
		self.r+=states.r/5.;`,
		a: "self.a--;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 1,
		rects: 1,
		nestedRects: 1,
		color4Corners: 1,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}
export const lessHecticRace = {
	dim: 4,
	states: {
		r: rndFloat(500, 1000),
		g: rndFloat(500, 1000),
		b: rndFloat(500, 1000),
		a: rndFloat(500, 1000)
	},
	reach: rndInt(1, 1),
	thresholds: {
		r: rndFloat(0.7, 0.7),
		g: rndFloat(0.6, 0.6),
		b: rndFloat(0.7, 0.7),
		a: rndFloat(0.3, 0.3)
	},
	ops0: {
		r: "self.r-=1. ;",
		g: `self.g+=1.; 
		self.r-=10.;`,
		b: "self.b+=.5;",
		a: `self.r-=2.;
			self.r++;`
	},
	ops1: {
		r: "self.r += self.g;",
		g: "self.g-=2.;",
		b: `self.b-=1.;
		self.a+=.1;
		self.r+=states.b/5.;`,
		a: "self.a-=0.1;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 1,
		rects: 0,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}

export const pixelCity = {
	dim: 4,
	ops0: {
		r: "self.r+=count.g;self.b+=self.b;",
		g: "self.g+=self.a;self.g=count.g;",
		b: "self.b-=1.;self.b=self.r;",
		a: "self.a+=self.b;self.b-=self.r;"
	},
	ops1: {
		r: "self.r+=self.b;self.b+=self.r;",
		g: "self.g+=2.;self.a+=self.b;",
		b: "self.b=4.;self.g+=self.r;",
		a: "self.a-=self.g;self.b-=self.a;"
	},
	ops2: { r: "", g: "", b: "", a: "" },
	reach: 1,
	states: {
		r: 188,
		g: 188,
		b: 188,
		a: 188
	},
	thresholds: {
		r: 0.6633521890034899,
		g: 0.6214476200984791,
		b: 0.77932015284895896,
		a: 0.62294534840621053
	},
	startSettings: {
		lines: 0,
		arcs: 0,
		rects: 1,
		nestedRects: 1,
		color4Corners: 0,
		dots: 1,
		noise: 0,
		startColor: "rgba(0,0,0,0.2792975651100278)"
	}
}

export const niceCycle = {
	dim: 2,
	states: {
		r: 243,
		g: 243,
		b: 243,
		a: 243
	},
	reach: 2,
	thresholds: {
		r: 0.7739231632556767,
		g: 0.3375859393971041,
		b: 0.6300390590447933,
		a: 0.34877366067375987
	},
	ops0: {
		r: "self.r=self.g;",
		g: "self.g+=3.;",
		b: "self.b-=self.a;",
		a: "self.a-=2.;"
	},
	ops1: {
		r: "self.r=self.a;",
		g: "self.g=self.r;",
		b: "self.b-=count.r;",
		a: "self.a-=2.;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 1,
		rects: 0,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}
export const idunno = {
	dim: 4,
	states: {
		r: 423,
		g: 423,
		b: 423,
		a: 423
	},
	reach: 1,
	thresholds: {
		r: 0.73,
		g: 0.5527731427690015,
		b: 0.43338507909793406,
		a: 0.4012404018547386
	},
	ops0: {
		r: "self.r-=self.a;self.r=count.a;",
		g: "self.g=self.r;self.g-=self.b;",
		b: "self.b-=self.a;self.b+=3.;",
		a: "self.a=count.a;self.a=self.b;"
	},
	ops1: {
		r: "self.r+=count.r;self.b-=count.a;",
		g: "self.g+=count.a;self.r+=count.r;",
		b: "self.b=self.g;self.b-=self.a;",
		a: "self.a+=1.;self.b=3.;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 1,
		rects: 0,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}

export const coolTex = {
	dim: 2,
	states: {
		r: 690.5902767088264,
		g: 788.5263848816976,
		b: 344.1602492472157,
		a: 512.3203535331413
	},
	reach: 1,
	thresholds: {
		r: 0.33658702375832944,
		g: 0.46506025940179824,
		b: 0.6474780579563231,
		a: 0.5908786006737501
	},
	ops0: {
		r: "self.r=self.b;",
		g: "self.g+=count.b;",
		b: "self.b=self.g;",
		a: "self.a+=self.a;"
	},
	ops1: {
		r: "self.r-=4.;",
		g: "self.g+=count.r;",
		b: "self.b=2.;",
		a: "self.a+=self.r;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 1,
		rects: 0,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}

export const anotherSet = {
	dim: 2,
	states: {
		r: 747.2996515221894,
		g: 701.8495944095775,
		b: 803.8308004615828,
		a: 300.5657910602167
	},
	reach: 1,
	thresholds: {
		r: 0.6005952368257568,
		g: 0.3344663083087653,
		b: 0.3714164860546589,
		a: 0.34463199991732835
	},
	ops0: {
		r: "self.r+=self.b;",
		g: "self.g+=self.b;",
		b: "self.b+=self.b;",
		a: "self.a-=2.;"
	},
	ops1: {
		r: "self.r-=self.a;",
		g: "self.g=1.;",
		b: "self.b-=3.;",
		a: "self.a=self.b;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 1,
		nestedRects: 1,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}

export const webs = {
	dim: 3,
	states: {
		r: 858.0559137044474,
		g: 133.83257566019893,
		b: 467.18099534045905,
		a: 753.6049878457561
	},
	reach: 1,
	thresholds: {
		r: 0.36899606017395853,
		g: 0.6341224739560858,
		b: 0.5766365286661312,
		a: 0.4673929647076875
	},
	ops0: {
		r: "self.r=2.;",
		g: "self.g-=count.g;",
		b: "self.b+=self.g;",
		a: "self.a+=self.r;"
	},
	ops1: {
		r: "self.r=self.a;",
		g: "self.g=self.b;",
		b: "self.b-=count.g;",
		a: "self.a=self.a;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 0,
		rects: 1,
		nestedRects: 0,
		color4Corners: 0,
		dots: 1,
		noise: 0,
		startColor: "rgba(11 0,10,11 s0,1.0)"
	}
}

export const justAnother = {
	dim: 2,
	states: {
		r: 970.866025891155,
		g: 948.5995193943381,
		b: 858.4697001846507,
		a: 240.62551171518862
	},
	reach: 1,
	thresholds: {
		r: 0.6052194204647094,
		g: 0.5184349752496928,
		b: 0.6582162783714012,
		a: 0.5092544826446102
	},
	ops0: {
		r: "self.r=self.a;",
		g: "self.g-=count.b;",
		b: "self.b-=3.;",
		a: "self.a+=self.b;"
	},
	ops1: {
		r: "self.r=count.g;",
		g: "self.g=self.g;",
		b: "self.b-=1.;",
		a: "self.a=count.g;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 1,
		nestedRects: 1,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}

export const chipset = {
	dim: 1,
	states: {
		r: 701.9479218870401,
		g: 50.0269453506917,
		b: 209.90313321817666,
		a: 670.7030354533345
	},
	reach: 1,
	thresholds: {
		r: rndFloat(0.55, 0.55),
		g: 0.6624542802106589,
		b: 0.6799178668530658,
		a: 0.8336273756343872
	},
	ops0: {
		r: "self.r-=self.g;",
		g: "self.g+=self.b;",
		b: "self.g*=self.b;self.b++;",
		a: "self.a-=0.1;"
	},
	ops1: {
		r: "self.r-=1.;",
		g: "self.g=0.5;",
		b: "self.b=10.;",
		a: "self.a=-1.;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 1,
		nestedRects: 1,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(100,100,60,0.2792975651100278)"
	}
}

export const spaceShip = {
	dim: 1,
	states: {
		r: 820.1085970271379,
		g: 711.4273003302515,
		b: 961.8717974517494,
		a: 788.5405119508505
	},
	reach: 2,
	thresholds: {
		r: 0.747920753969811,
		g: 0.6160080334637315,
		b: 0.7609062522649765,
		a: 0.4924725357675925
	},
	ops0: {
		r: "self.r+=count.r;",
		g: "self.g-=2.;",
		b: "self.b=self.r;",
		a: "self.a+=count.r;"
	},
	ops1: {
		r: "self.r+=self.b;",
		g: "self.g-=2.;",
		b: "self.b=self.g;",
		a: "self.a=3.;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 1,
		nestedRects: 1,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,168,60,0.2792975651100278)"
	}
}
export const productionLine = {
	dim: 3,
	states: {
		r: 816.6577322874218,
		g: 271.3640274712816,
		b: 584.2297439696267,
		a: 240.32690725289285
	},
	reach: 1,
	thresholds: {
		r: 0.7249273966997862,
		g: 0.6935069697909058,
		b: 0.7016398334642873,
		a: 0.5396528831450269
	},
	ops0: {
		r: "self.r=3.;",
		g: "self.g=self.g;",
		b: "self.b=self.g;",
		a: "self.a-=count.a;"
	},
	ops1: {
		r: "self.r+=count.r;",
		g: "self.g-=4.;",
		b: "self.b=count.a;",
		a: "self.a=self.a;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 1,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(158,164,60,0.41983573767356575)"
	}
}

export const coolMachines0 = {
	dim: 4,
	states: {
		r: 219.50922466348857,
		g: 370.9148428635672,
		b: 789.4045801367611,
		a: 566.9810516526923
	},
	reach: 1,
	thresholds: {
		r: 0.4371853179298341,
		g: 0.7826887868111954,
		b: 0.6835155982524157,
		a: 0.6982972464291379
	},
	ops0: {
		r: "self.r+=self.b;",
		g: "self.g-=self.a;",
		b: "self.b-=self.g;",
		a: "self.a=count.b;"
	},
	ops1: {
		r: "self.r=self.a;",
		g: "self.g-=count.a;",
		b: "self.b=count.r;",
		a: "self.a=2.;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 0,
		rects: 0,
		nestedRects: 0,
		color4Corners: 0,
		dots: 1,
		noise: 0,
		startColor: "rgba(158,164,60,0.41983573767356575)"
	}
}

export const coolMachines1 = {
	dim: 4,
	states: {
		r: 219.50922466348857,
		g: 370.9148428635672,
		b: 789.4045801367611,
		a: 566.9810516526923
	},
	reach: 1,
	thresholds: {
		r: 0.4371853179298341,
		g: 0.7826887868111954,
		b: 0.6835155982524157,
		a: 0.6982972464291379
	},
	ops0: {
		r: "self.r+=self.b;",
		g: "self.g-=self.a;",
		b: "self.b-=self.g;",
		a: "self.a=count.b;"
	},
	ops1: {
		r: "self.r=self.a;",
		g: "self.g-=count.a;",
		b: "self.b=count.r;",
		a: "self.a=2.;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 0,
		rects: 0,
		nestedRects: 1,
		color4Corners: 1,
		dots: 0,
		noise: 0,
		startColor: "rgba(158,164,60,0.41983573767356575)"
	}
}

export const niceAbstract = {
	dim: 3,
	states: {
		r: 1269.9364280095324,
		g: 1540.5739409383386,
		b: 1196.1514943279326,
		a: 1196.02797189727426
	},
	reach: 1,
	thresholds: {
		r: 0.34506725433748214,
		g: 0.5834663795074448,
		b: 0.7612214072840289,
		a: 0.31824845862574874
	},
	ops0: {
		r: "self.r+=self.b;",
		g: "self.g-=2.;",
		b: "self.b+=count.g;",
		a: "self.a-=2.;"
	},
	ops1: {
		r: "self.r=3.;",
		g: "self.g=count.b;",
		b: "self.b+=count.g;",
		a: "self.a-=4.;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 1,
		nestedRects: 1,
		color4Corners: 1,
		dots: 0,
		noise: 0,
		startColor: "rgba(184,99,250,0.3930123341269791)"
	}
}

export const starrySpace = {
	dim: 5,
	states: {
		r: 685.743490443565,
		g: 575.0238856766373,
		b: 399.33443448971957,
		a: 950.1457502366975
	},
	reach: 1,
	thresholds: {
		r: 0.4812764258356765,
		g: 0.49716073805466293,
		b: 0.5050059629837051,
		a: 0.3720625865506008
	},
	ops0: {
		r: "self.r+=self.a;",
		g: "self.g+=3.;",
		b: "self.b=count.b;",
		a: "self.a+=count.g;"
	},
	ops1: {
		r: "self.r+=self.g;",
		g: "self.g=1.;",
		b: "self.b=3.;",
		a: "self.a=3.;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 1,
		rects: 1,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(111,254,36,0.9334326309617609)"
	}
}

export const signs = {
	dim: 3,
	states: {
		r: 378.75891807489097,
		g: 608.7071626679972,
		b: 109.47449116501957,
		a: 912.9776186309755
	},
	reach: 1,
	thresholds: {
		r: 0.23776163642760365,
		g: 0.6555694851791486,
		b: 0.5853980888379738,
		a: 0.5421709841582925
	},
	ops0: {
		r: "self.r=count.r;",
		g: "self.g=self.r;",
		b: "self.b+=4.;",
		a: "self.a+=self.g;"
	},
	ops1: {
		r: "self.r=count.b;",
		g: "self.g=4.;",
		b: "self.b+=self.r;",
		a: "self.a=4.;"
	},
	ops2: {
		r: "",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 1,
		arcs: 1,
		rects: 1,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,50,220,0.2792975651100278)"
	}
}
export const alienship = {
	dim: 3,
	states: {
		r: 205,
		g: 205,
		b: 109,
		a: 912
	},
	reach: 3,
	thresholds: {
		r: 0.55,
		g: 0.55,
		b: 0.5853980888379738,
		a: 0.5421709841582925
	},
	ops0: {
		r: "self.r++; ",
		g: "self.g++;self.r--;",
		b: "",
		a: ""
	},
	ops1: {
		r: "self.r++;self.g--;",
		g: "self.g--;",
		b: "",
		a: ""
	},
	ops2: {
		r: "if(count.r > threshold.r * 2.){self.r-=2.;self.g+=self.r;}",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 0,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,250,0,1)"
	}
}
export const sickplasmaeffect = {
	dim: 3,
	states: {
		r: 205,
		g: 205,
		b: 109,
		a: 912
	},
	reach: 1,
	thresholds: {
		r: 0.45,
		g: 0.55,
		b: 0.5853980888379738,
		a: 0.5421709841582925
	},
	ops0: {
		r: "self.r++;self.g+=self.r;",
		g: "self.g++;self.r--;",
		b: "",
		a: ""
	},
	ops1: {
		r: "self.r++;self.g--;",
		g: "self.g--;",
		b: "",
		a: ""
	},
	ops2: {
		r: "if(count.r > threshold.r * 2.){self.r-=2.;self.g+=self.r;}",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 0,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,250,0,1)"
	}
}
export const flowfields2 = {
	dim: 3,
	states: {
		r: 205,
		g: 205,
		b: 109,
		a: 912
	},
	reach: 1,
	thresholds: {
		r: 0.75,
		g: 0.25,
		b: 0.85,
		a: 0.5421709841582925
	},
	ops0: {
		r: "self.r++;self.g+=self.r;",
		g: "self.g++;self.r--;",
		b: "",
		a: ""
	},
	ops1: {
		r: "self.r++;self.g--;",
		g: "self.g--;",
		b: "self.r++;self.g--;",
		a: ""
	},
	ops2: {
		r: "if(count.r > threshold.r * 2.){self.r-=2.;self.g+=self.r;}",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 1,
		rects: 1,
		nestedRects: 1,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,250,10,1)"
	}
}
export const littleCellsWhenRaw = {
	dim: 3,
	states: {
		r: 205,
		g: 205,
		b: 109,
		a: 912
	},
	reach: 3,
	thresholds: {
		r: 0.15,
		g: 0.55,
		b: 0.5853980888379738,
		a: 0.5421709841582925
	},
	ops0: {
		r: "self.r++;self.g*=self.r;",
		g: "self.g++;self.r--;",
		b: "",
		a: ""
	},
	ops1: {
		r: "self.r++;self.g--;",
		g: "self.g--;",
		b: "",
		a: ""
	},
	ops2: {
		r: "if(count.r > threshold.r * 2.){self.r-=2.;self.g+=self.r;}",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 0,
		rects: 1,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,250,0,1)"
	}
}
export const flowfields = {
	dim: 3,
	states: {
		r: 205,
		g: 205,
		b: 109,
		a: 912
	},
	reach: 3,
	thresholds: {
		r: 0.45,
		g: 0.55,
		b: 0.5853980888379738,
		a: 0.5421709841582925
	},
	ops0: {
		r: "self.r++;self.g*=self.r;",
		g: "self.g++;self.r--;",
		b: "",
		a: ""
	},
	ops1: {
		r: "self.r++;self.g--;",
		g: "self.g--;",
		b: "",
		a: ""
	},
	ops2: {
		r: "if(count.r > threshold.r * 2.){self.r-=2.;self.g+=self.r;}",
		g: "",
		b: "",
		a: ""
	},
	startSettings: {
		lines: 0,
		arcs: 0,
		rects: 1,
		nestedRects: 0,
		color4Corners: 0,
		dots: 0,
		noise: 0,
		startColor: "rgba(251,250,0,1)"
	}
}
export const getRandomVariant = () => variants[rndInt(0, variants.length - 1)]
let variants = [
	// variant12,
	// scribbled,
	// blueStructures,
	// bluepurplestructure,
	// alienRace,
	// lessHecticRace,
	// pixelCity,
	// niceCycle,
	// idunno,
	// coolTex,
	// anotherSet,
	// webs,
	// justAnother,
	chipset
	// spaceShip
	// productionLine,
	// coolMachines0,
	// coolMachines1,
	// niceAbstract,
	// starrySpace,
	// signs
]
