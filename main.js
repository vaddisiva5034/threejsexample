import "./style.css";
import * as THREE from "three";
import * as Check from "three-orbit-controls";
import * as dat from "dat.gui";

const gui = new dat.GUI();

const OrbitControls = Check(THREE);

const createTexture = () => {
  return new THREE.TextureLoader().load("test.jpg");
};

class Base3dModal {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      100
    );

    this.rendrer = new THREE.WebGLRenderer();
  }
}

class ThreeDCube extends Base3dModal {
  constructor() {
    super();
    this.boxObj = {
      position: {
        x: -4,
        y: -4,
        z: -10,
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    };
  }

  setCameraPostions(x, y, z) {
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  createBox() {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    const sampleTexture = createTexture();
    const material = new THREE.MeshBasicMaterial({
      map: sampleTexture,
      color: "#ff",
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  setupRender() {
    this.rendrer.render(this.scene, this.camera);
    this.rendrer.setSize(window.innerWidth, window.innerHeight);
    this.rendrer.setClearColor("rgb(255, 255, 255)");
    document.querySelector("#app").appendChild(this.rendrer.domElement);
  }

  setupOrbitoryController() {
    this.controller = new OrbitControls(this.camera, this.rendrer.domElement);
  }

  setupGuisettings() {
    gui.add(this.mesh.position, "x", -5, 5);
  }

  updateUi() {
    this.boxObj.rotation.x += 0.01;
    this.mesh.rotation.x = this.boxObj.rotation.x;
    this.mesh.rotation.y = this.boxObj.rotation.x;
    this.mesh.rotation.z = this.boxObj.rotation.x;

    this.rendrer.render(this.scene, this.camera);

    this.controller.update();
    requestAnimationFrame(() => {
      this.updateUi();
    });
  }

  render() {
    this.setCameraPostions(1, 2, 5);
    this.createBox();
    this.setupRender();
    this.setupOrbitoryController();
    this.setupGuisettings();
    this.updateUi();
  }
}

new ThreeDCube().render();
