export const FINAL_RENDER_FRAGMENT = `
			uniform sampler2D diffuseTexture; 
			uniform vec4 states;
			uniform vec2 resolution; 
			uniform vec3 color1;
			uniform vec3 color2;
			uniform vec3 color3;
			uniform vec3 color4;
			uniform bool isRaw;
			uniform bool isOnlyRed;
			uniform float blending;
			varying vec2 vUv;
			
			vec4 getColorForTrail(vec4 trail,vec4 dithered) {
				
				//Each trail value can cycle as high as the corresponding number of states. So dividing by it gives us a value between 0 and 1
				float valR = abs(trail.r) / states.r ;
				float valG =  abs(trail.g) / states.g;
				float valB =  abs(trail.b) / states.b;
				float valA =  abs(trail.a) / states.a;
				

				// float val = max(max(max(valR,valG),valB),valA);
				// vec4 col = vec4( val,val,val,1.)  ;

				vec4 col = abs(valR - 0.5) / 0.5 * vec4(color1,1.);

				vec4 ratio = vec4(1.);

				if (isOnlyRed) {
				//For this automaton we only care about the red values for the final render. So we assign each of the four output colors to a 25% range of red.
				if (valR < 1. / 4.) {
					col = vec4(color1,1.);
					ratio = vec4(1. - abs(valR/0.25 - 0.5 )/0.5); 
				} else if (valR <   2. / 4.) {
					col = vec4(color2,1.);
					ratio = vec4( 1. - abs((valR-0.25)/0.25 -0.5)/0.5 ); 
				} else if (valR <  3. / 4.) {
					col = vec4(color3,1.);
					ratio = vec4(1. - abs((valR-0.5) / 0.25 - 0.5) / 0.5 ); 
				}else if (valR <  4. / 4.) {
					col = vec4(color4,1.);
					ratio = vec4(1. - abs((valR-0.75) / 0.25-0.5)/0.5 );
				}  
				 

				col = mix(col,ratio,blending);

			} else {

					//Use this if we want to always display the most dominant color.
					// col =  abs(valR - 0.5) / 0.5 * vec4(color1,1.);
					if (valR > valG && valR > valB && valR > valA) {
						col =  abs(valR - 0.5) / 0.5 * vec4(color1,1.);
					}  else if (valG > valR && valG > valB && valG > valA) {
						col = abs(valG - 0.5) / 0.5 * vec4(color2,1.);
					} else if (valB > valG && valB > valR && valB > valA) {
						col = abs(valB - 0.5) / 0.5 * vec4(color3,1.);
					} else if (valA > valR && valA > valG && valA > valB) {
						col = abs(valA-0.5) / 0.5 * vec4(color4,1.);
					} 
				}


				//No dithering. We want sharp edges.
				return   mix(col,dithered,0. );
			}

			 


			void main(){
				vec2 uv = gl_FragCoord.xy / resolution.xy;
				vec4 trail = texture2D(diffuseTexture, vUv);
				
				const float dim = 1.; 
				float weight = 1. / pow( 2. * dim + 1., 2. ); 
				float allTheSame = 0.;
				vec4 acc = vec4(0.,0.,0.,1.); 
				float count = 0.;
				for( float i = -dim; i <= dim; i++ ){ 
					for( float j = -dim; j <= dim; j++ ){ 
						vec4 val = texture2D( diffuseTexture,  (vUv + vec2(i,j)/resolution ));
					 
						acc+=getColorForTrail(val,vec4(0.,0.,0.,1.)) * weight;
						if (val == trail) {
							allTheSame++;
						}
						count++;
					}
				}


				vec4 col = getColorForTrail(trail,acc);
			
				//if all surrounding tiles have the same color, we'll set this color to some constant color. This helps reducing the flickering.
				if (allTheSame == count) {
					col =   vec4(color1,1.);
				}
				//Set alpha of output color to 1. to get brighter colors. 
				col.a = 1.;
				
				//If raw-mode is enabled we simply output the trail values divided by the corresponding amount of states. Except for the alpha value which only gets half a weight.
				vec4 trailCol = vec4(trail.r/states.r,trail.g/states.g,trail.b/states.b,0.5 + 0.5 * trail.a / states.a);
				float dif = length(trailCol);
				// col  = mix(vec4(dif),col ,0.5);
				if (isRaw) {
					col = trailCol;
				}
				gl_FragColor =  col;

			}
            `
