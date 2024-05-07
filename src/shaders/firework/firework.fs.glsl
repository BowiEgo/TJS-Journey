#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform vec3 u_color;

void main() {
  float textureAlpha = texture(u_texture, gl_PointCoord).r;

  // Final color
  gl_FragColor = vec4(u_color, textureAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
