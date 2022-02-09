export const FINAL_RENDER_FRAGMENT = `
			uniform sampler2D diffuseTexture;
			uniform sampler2D pointsTexture; 
			uniform vec4 states;
			uniform vec2 resolution; 
			uniform vec3 color1;
			uniform vec3 color2;
			uniform vec3 color3;
			uniform vec3 color4;
			uniform bool isRaw;
			varying vec2 vUv;
			
			vec4 getColorForTrail(vec4 trail,vec4 dithered) {
				
				float valR = trail.r / states.r ;
				float valG =  trail.g / states.g;
				float valB =  trail.b / states.b;
				float valA =  trail.a / states.a;

				
				vec4 col = abs(valR - 0.5) / 0.5 * vec4(color1,1.);
				
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

				return col;// mix(col,dithered,0. );
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


			vec4 col = getColorForTrail(trail,trail);
			//  if (trail.r == 0. && trail.g == 0.) {
			// 	// col = vec4(color2,0.5); 
			//  }

			 if (allTheSame == count) {
				 col = vec4(0.);
			 }
			 
			col.a = 1.;
			vec4 trailCol = vec4(trail.r/states.r,trail.g/states.g,trail.b/states.b,0.5 + 0.5 * trail.a / states.a);
			float dif = length(trailCol);
			col = mix(vec4(dif),col ,0.5);
			if (isRaw) {
				col = trailCol;
			}
			gl_FragColor =  col;

			}
            `
