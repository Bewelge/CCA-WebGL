export const PASS_THROUGH_VERTEX_WITH_Z = `
varying vec2 vUv; 
uniform vec2 resolution; 
uniform sampler2D diffuseTexture; 

void main(){
    vUv = uv; 
    gl_PointSize=1.;
    vec4 tex = texture2D(diffuseTexture,position.xy / resolution);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1. + tex.a);
}
 `
