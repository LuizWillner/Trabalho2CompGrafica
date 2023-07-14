export default class Light {
  constructor() {
    // Luz 1
    this.pos_1 = vec4.fromValues(2.0, 2.0, 2.0, 1.0);

    this.amb_c_1 = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
    this.amb_k_1 = 0.2;

    this.dif_c_1 = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
    this.dif_k_1 = 0.5;

    this.esp_c_1 = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
    this.esp_k_1 = 0.4;
    this.esp_p_1 = 5.0;


  }

  createUniforms(gl, program){
    const posLoc = gl.getUniformLocation(program, "light_pos");
    gl.uniform4fv(posLoc, this.pos_1);

    const ambCLoc = gl.getUniformLocation(program, "light_amb_c");
    gl.uniform4fv(ambCLoc, this.amb_c_1);
    const ambKLoc = gl.getUniformLocation(program, "light_amb_k")
    gl.uniform1f(ambKLoc, this.amb_k_1);

    const difCLoc = gl.getUniformLocation(program, "light_dif_c");
    gl.uniform4fv(difCLoc, this.dif_c_1);
    const difKLoc = gl.getUniformLocation(program, "light_dif_k")
    gl.uniform1f(difKLoc, this.dif_k_1);

    const espCLoc = gl.getUniformLocation(program, "light_esp_c");
    gl.uniform4fv(espCLoc, this.pos_1);
    const espKLoc = gl.getUniformLocation(program, "light_esp_k")
    gl.uniform1f(espKLoc, this.esp_k_1);
    const espPLoc = gl.getUniformLocation(program, "light_esp_p")
    gl.uniform1f(espPLoc, this.esp_p_1);
  }

  updateLight() {
    // TODO: Change light position
  }
}