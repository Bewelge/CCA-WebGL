export const AUTOMATON_FRAGMENT = `
uniform sampler2D points;
		uniform sampler2D input_texture;
		uniform sampler2D startTexture;
		
		uniform vec2 resolution;
		uniform float decay;
		uniform vec4 states;
		uniform float reach;
		uniform vec4 threshold;
		uniform float time;
		varying vec2 vUv;
		void main(){
		
			vec2 res = 1. / resolution;
			vec4 pixelPoint = texture2D(points, vUv);
			

			//dim is the range in which neighbour tiles will be analyzed. 
			#DIM#
			float weight = 1. / pow( 2. * dim + 1., 2. );
		 	
			vec4 inputPixl = texture2D( input_texture,  vUv);
			vec4 self = inputPixl;
		 
			//Loop neighbours and count how many tiles have a value higher than the tile itself. In traditional cyclical automatons the condition is that the neighbour
			//value is exactly one higher. I opted for this less stringent condition as it produces more chaotic patterns.
			vec4 count = vec4(0.);
			float tot = 0.; 

				for( float i = -dim; i <= dim; i++ ){
					
					for( float j = -dim; j <= dim; j++ ){
						 
						vec2 coord = vUv + vec2( i * reach, j * reach ) /resolution;
						vec4 val = texture2D( input_texture,  coord ).rgba;
						 
						if ( val.r > self.r ){
							count.r++;
						}
						if (val.g > self.g) {
							count.g++;
						}
						if (val.b > self.b) {
							count.b++;
						}
						if (val.a > self.a) {
							count.a++;
						}
						tot++;
						
						
					}
				} 

			 
		 	//For each color value we check if the amount of neighbours with a higher value is higher than the threshold value. If that's the case we execute operation0 of that color.
			//If the amount is equal 0 we execute operation1. Operation2 can be used for additional rules but isn't used in this iteration.
			if (count.r > threshold.r) {
				#op0R#
			}  else if (count.r == 0.) {
				#op1R#	
			} else {
				#op2R#
			}
			
			if (count.g > threshold.g) {
				#op0G#
			} else if (count.g == 0.) {
				#op1G#
			} else {
				#op2G#
			}
			
			if (count.b > threshold.b) {
				#op0B#
			} else if (count.b == 0.) {
				#op1B#
			} else {
				#op2B#
			}
			
			if (count.a > threshold.a) {
				#op0A#
			} else if (count.a == 0.) {
				#op1A#
			} else {
				#op2A#
			}
			
	 
			//Wrap each color value between 0 and its amount of states.
			if (self.r > states.r - 1.) {
				self.r -= states.r - 1.;
			} 
			if (self.g > states.g - 1.) {
				self.g -= states.g - 1.;
			} 
			if (self.b > states.b - 1.) {
				self.b -= states.b - 1.;
			} 
			if (self.a > states.a - 1.) {
				self.a -= states.a - 1.;
			} 
			if (self.r < 0.) {
				self.r = states.r - 1.;
			} 
			if (self.g < 0.) {
				self.g = states.g - 1.;
			} 
			if (self.b < 0.) {
				self.b = states.b - 1.;
			} 
			if (self.a < 0.) {
				self.a = states.a - 1.;
			} 

			//Not using modulo for some values actually gives interesting results. Not exactly sure why.
			self.r = mod(self.r,states.r);
			// self.g = mod(self.g,states.g);
			// self.b = mod(self.b,states.b);
			// self.a = mod(self.a,states.a);


			//Save the new states
			gl_FragColor = self;
			
			
		
		}`
