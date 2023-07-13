import vertShaderSrc from './phong.vert.js';
import fragShaderSrc from './phong.frag.js';

import Shader from './shader.js';
import { HalfEdgeDS } from './half-edge.js';

export default class Mesh {
  constructor(delta,name) {
    // model data structure
    this.heds = new HalfEdgeDS();

    // Matriz de modelagem
    this.angle = 0;
    this.delta = delta;
    this.name = name;
    this.model = mat4.create();

    // Shader program
    this.vertShd = null;
    this.fragShd = null;
    this.program = null;

    // Data location
    this.vaoLoc = -1;
    this.indicesLoc = -1;

    this.uModelLoc = -1;
    this.uViewLoc = -1;
    this.uProjectionLoc = -1;
  }

  async loadMeshV4() {
    const resp = await fetch(this.name);
    const data = await resp.text();

    const nv = data[0];
    const nt = data[1];

    const coords = [];
    const indices = [];

    // <<<<<< NOSSO JEITO >>>>>>>
    // const txtList = data.split(/\s+/);
    // let index = 0;

    // while (index < data.length) {
    //   const prefix = data[index];
    //   if (prefix === 'v') {
    //     let x = parseFloat(data[index + 1]);
    //     let y = parseFloat(data[index + 2]);
    //     let z = parseFloat(data[index + 3]);
    //     coords.push(x, y, z, 1.0);
    //     index += 4;
    //   } else if (prefix === 'f') {
    //     let v1 = parseInt(data[index + 1]);
    //     let v2 = parseInt(data[index + 2]);
    //     let v3 = parseInt(data[index + 3]);
        
    //     indices.push(v1, v2, v3);
    //     index += 4;
    //   } else {
    //     index++;
    //   }
    // }

    // <<<<<< OUTRO JEITO >>>>>>>
    const linhas_txt = data.split('\n');

    for (let index = 0; index < linhas_txt.length; index++) {
      const linha = linhas_txt[index].trim();

      if (linha.startsWith('v ')) {
        const [_, x, y, z] = linha.split(/\s+/);
        coords.push(parseFloat(x), parseFloat(y), parseFloat(z), 1.0); 

      } else if (linha.startsWith('f ')) {
        const [_, i1, i2, i3] = linha.split(/\s+/);
        indices.push(parseInt(i1) - 1, parseInt(i2) - 1, parseInt(i3) - 1);
      }
    }

          
    console.log('coords=', coords);
    console.log('indices=', indices);

    this.heds.build(coords, indices);
  }

  createShader(gl) {
    this.vertShd = Shader.createShader(gl, gl.VERTEX_SHADER, vertShaderSrc);
    this.fragShd = Shader.createShader(gl, gl.FRAGMENT_SHADER, fragShaderSrc);
    this.program = Shader.createProgram(gl, this.vertShd, this.fragShd);

    gl.useProgram(this.program);
  }

  createUniforms(gl) {
    this.uModelLoc = gl.getUniformLocation(this.program, "u_model");
    this.uViewLoc = gl.getUniformLocation(this.program, "u_view");
    this.uProjectionLoc = gl.getUniformLocation(this.program, "u_projection");
  }

  createVAO(gl) {
    const vbos = this.heds.getVBOs();
    console.log(vbos);

    var coordsAttributeLocation = gl.getAttribLocation(this.program, "position");
    const coordsBuffer = Shader.createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(vbos[0]));

    var colorsAttributeLocation = gl.getAttribLocation(this.program, "color");
    const colorsBuffer = Shader.createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(vbos[1]));

    var normalsAttributeLocation = gl.getAttribLocation(this.program, "normal");
    const normalsBuffer = Shader.createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(vbos[2]));

    this.vaoLoc = Shader.createVAO(gl,
      coordsAttributeLocation, coordsBuffer, 
      colorsAttributeLocation, colorsBuffer, 
      normalsAttributeLocation, normalsBuffer);

    this.indicesLoc = Shader.createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(vbos[3]));
  }  

  init(gl, light) {
    this.createShader(gl);
    this.createUniforms(gl);
    this.createVAO(gl);

    light.createUniforms(gl, this.program);
  }

  updateModelMatrix() {
    this.angle += 0.005;

    if (this.name === 'model.obj'){
      mat4.identity( this.model );
    
      mat4.translate(this.model, this.model, [this.delta, 0, 0]);
  
      mat4.rotateY(this.model, this.model, this.angle);
  
      mat4.translate(this.model, this.model, [0, 0, 0]);
  
      mat4.scale(this.model, this.model, [0.48, 0.48, 0.48]);
    }

    else {
      mat4.identity( this.model );
    
      mat4.translate(this.model, this.model, [this.delta, 0, 0]);
  
      mat4.rotateZ(this.model, this.model, this.angle);
  
      mat4.translate(this.model, this.model, [-1, 0, -1]);
  
      mat4.scale(this.model, this.model, [0.16, 0.16, 0.16]);
    }

  
  }

  draw(gl, cam, light) {
    // faces orientadas no sentido anti-horÃ¡rio
    gl.frontFace(gl.CCW);

    // face culling
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    gl.useProgram(this.program);

    // updates the model transformations
    this.updateModelMatrix();

    const model = this.model;
    const view = cam.getView();
    const proj = cam.getProj();
    
    gl.uniformMatrix4fv(this.uModelLoc, false, model);
    gl.uniformMatrix4fv(this.uViewLoc, false, view);
    gl.uniformMatrix4fv(this.uProjectionLoc, false, proj);

    gl.bindVertexArray(this.vaoLoc);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesLoc);

    gl.drawElements(gl.TRIANGLES, this.heds.faces.length * 3, gl.UNSIGNED_INT, 0);

    gl.disable(gl.CULL_FACE);
  }
}