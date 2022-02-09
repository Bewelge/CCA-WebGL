export const PASS_THROUGH_VERTEX_WITH_Z = `
varying vec2 vUv; 
void main(){
    vUv = uv; 
    gl_PointSize=1.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,position.z);
}
 `
