import Camera from './camera.js';
import Light from './light.js';
import Mesh from './mesh.js';

class Scene {
  constructor(gl) {
    // Camera virtual
    this.cam = new Camera(gl);

    // Luz
    this.light = new Light();

    // Mesh
    this.mesh_armadillo = new Mesh(0, "armadillo.obj");
    this.mesh_bunny = new Mesh(0, "bunny.obj");

  }

  async init(gl) {
    await this.mesh_armadillo.loadMeshV4();
    this.mesh_armadillo.init(gl, this.light);

    await this.mesh_bunny.loadMeshV4();
    this.mesh_bunny.init(gl, this.light);
  }

  draw(gl) {  
    this.cam.updateCam();
    this.light.updateLight();
    this.mesh_armadillo.draw(gl, this.cam, this.light);
    this.mesh_bunny.draw(gl, this.cam, this.light);

  }
}

class Main {
  constructor() {
    const canvas = document.querySelector("#glcanvas");

    this.gl = canvas.getContext("webgl2");
    this.setViewport();

    this.scene = new Scene(this.gl);
    this.scene.init(this.gl).then(() => {
      this.draw();
    });
    this.updateColorVertex = this.updateColorVertex.bind(this);
    document.getElementById("submit").addEventListener("click", this.updateColorVertex);
  }

  setViewport() {
    var devicePixelRatio = window.devicePixelRatio || 1;
    this.gl.canvas.width = 1024 * devicePixelRatio;
    this.gl.canvas.height = 768 * devicePixelRatio;

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  }

  draw() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.scene.draw(this.gl);

    //Faz rotaçãoS
    requestAnimationFrame(this.draw.bind(this));
  }

  updateColorVertex() {
    console.log(this.scene);
    const armadilloIndex = document.getElementById("tatu_index").value;
    const bunnyIndex = document.getElementById("coelho_index").value;

    this.scene.mesh_armadillo.heds.estrela(armadilloIndex, this.gl, this.scene.mesh_armadillo);
    this.scene.mesh_bunny.heds.estrela(bunnyIndex, this.gl, this.scene.mesh_bunny);
  }
}

window.onload = () => {
  const app = new Main();
  app.draw();
}