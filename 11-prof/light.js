export default class Light {
  constructor() {
    // Luz 1: Amarela (fixa)
    this.pos_1 = vec4.fromValues(7.0, -5.0, 3.0, 1.0);

    this.amb_c_1 = vec4.fromValues(2.0, 2.0, 0.0, 1.0);
    this.amb_k_1 = 0.2;

    this.dif_c_1 = vec4.fromValues(2.0, 2.0, 0.0, 1.0);
    this.dif_k_1 = 0.8;

    this.esp_c_1 = vec4.fromValues(2.0, 2.0, 0.0, 1.0);
    this.esp_k_1 = 0.0;
    this.esp_p_1 = 5.0;

    // Luz 2: Branca (Centrada onde a câmera aponta
    // para parecer que acompanha a câmera)
    this.pos_2 = vec4.fromValues(0.0, 0.0, 0.0, 1.0);

    this.amb_c_2 = vec4.fromValues(5.0, 5.0, 5.0, 1.0);
    this.amb_k_2 = 0.2;

    this.dif_c_2 = vec4.fromValues(5.0, 5.0, 5.0, 1.0);
    this.dif_k_2 = 0.2;

    this.esp_c_2 = vec4.fromValues(5.0, 5.0, 5.0, 1.0);
    this.esp_k_2 = 0.0;
    this.esp_p_2 = 5.0;

  }

  createUniforms(gl, program){
    // Luz 1: Amarela (fixa)
    const posLoc_1 = gl.getUniformLocation(program, "light_pos_1");
    gl.uniform4fv(posLoc_1, this.pos_1);

    const ambCLoc_1 = gl.getUniformLocation(program, "light_amb_c_1");
    gl.uniform4fv(ambCLoc_1, this.amb_c_1);
    const ambKLoc_1 = gl.getUniformLocation(program, "light_amb_k_1")
    gl.uniform1f(ambKLoc_1, this.amb_k_1);

    const difCLoc_1 = gl.getUniformLocation(program, "light_dif_c_1");
    gl.uniform4fv(difCLoc_1, this.dif_c_1);
    const difKLoc_1 = gl.getUniformLocation(program, "light_dif_k_1")
    gl.uniform1f(difKLoc_1, this.dif_k_1);

    const espCLoc_1 = gl.getUniformLocation(program, "light_esp_c_1");
    gl.uniform4fv(espCLoc_1, this.pos_1);
    const espKLoc_1 = gl.getUniformLocation(program, "light_esp_k_1")
    gl.uniform1f(espKLoc_1, this.esp_k_1);
    const espPLoc_1 = gl.getUniformLocation(program, "light_esp_p_1")
    gl.uniform1f(espPLoc_1, this.esp_p_1);

    // Luz 2: Branca
    const posLoc_2 = gl.getUniformLocation(program, "light_pos_2");
    gl.uniform4fv(posLoc_2, this.pos_2);

    const ambCLoc_2 = gl.getUniformLocation(program, "light_amb_c_2");
    gl.uniform4fv(ambCLoc_2, this.amb_c_2);
    const ambKLoc_2 = gl.getUniformLocation(program, "light_amb_k_2")
    gl.uniform1f(ambKLoc_2, this.amb_k_2);

    const difCLoc_2 = gl.getUniformLocation(program, "light_dif_c_2");
    gl.uniform4fv(difCLoc_2, this.dif_c_2);
    const difKLoc_2 = gl.getUniformLocation(program, "light_dif_k_2")
    gl.uniform1f(difKLoc_2, this.dif_k_2);

    const espCLoc_2 = gl.getUniformLocation(program, "light_esp_c_2");
    gl.uniform4fv(espCLoc_2, this.pos_2);
    const espKLoc_2 = gl.getUniformLocation(program, "light_esp_k_2")
    gl.uniform1f(espKLoc_2, this.esp_k_2);
    const espPLoc_2 = gl.getUniformLocation(program, "light_esp_p_2")
    gl.uniform1f(espPLoc_2, this.esp_p_2);
  }

  updateLight() {
    // TODO: Change light position
  }
}