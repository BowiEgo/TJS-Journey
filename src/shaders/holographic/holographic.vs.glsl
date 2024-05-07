#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

varying vec3 vPosition;
varying vec3 vNormal;

#include ../includes/random2D.glsl

void main() {
  // Position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Glitch
  float glitchTime = u_time - modelPosition.y;
  float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.76);
  glitchStrength /= 3.0;
  glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
  glitchStrength *= 0.25;
  modelPosition.x += (random2d(modelPosition.xz + u_time) - 0.5) * glitchStrength;
  modelPosition.z += (random2d(modelPosition.zx + u_time) - 0.5) * glitchStrength;

  // Final position
  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  // Model normal
  vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

  // Varying
  vPosition = modelPosition.xyz;
  vNormal = modelNormal.xyz;
}
