var Scenes;
(function (Scenes) {
    var ƒ = Fudge;
    function createThreeLevelNodeHierarchy() {
        createMiniScene();
        let child = Scenes.node.getChildren()[0];
        let grandchild;
        grandchild = createCompleteMeshNode("Grandchild", ƒ.ShaderBasic, new ƒ.Vector3(0, 255, 0), new ƒ.MeshCube(3, 3, 3));
        grandchild.cmpTransform.translateX(2);
        child.appendChild(grandchild);
    }
    Scenes.createThreeLevelNodeHierarchy = createThreeLevelNodeHierarchy;
    function createMiniScene() {
        ƒ.GLUtil.initializeContext();
        Scenes.node = createCompleteMeshNode("Node", ƒ.ShaderBasic, new ƒ.Vector3(255, 0, 0), new ƒ.MeshCube(5, 2, 5));
        let cmpTransform = Scenes.node.cmpTransform;
        cmpTransform.scaleX(2);
        Scenes.camera = createCamera();
        let child = new ƒ.Node("Child");
        Scenes.node.appendChild(child);
    }
    Scenes.createMiniScene = createMiniScene;
    function createViewport() {
        Scenes.viewPort = new ƒ.Viewport("TestViewport", Scenes.node, Scenes.camera.getComponent(ƒ.ComponentCamera));
        // viewPort.drawScene();
        Scenes.viewPort.showSceneGraph();
    }
    Scenes.createViewport = createViewport;
    function createCamera(_translation = new ƒ.Vector3(10, 10, 50), _lookAt = new ƒ.Vector3()) {
        let camera = new ƒ.Node("Camera");
        let cmpTransform = new ƒ.ComponentTransform();
        cmpTransform.translate(_translation.x, _translation.y, _translation.z);
        cmpTransform.lookAt(_lookAt);
        camera.addComponent(cmpTransform);
        let cmpCamera = new ƒ.ComponentCamera();
        camera.addComponent(cmpCamera);
        return camera;
    }
    Scenes.createCamera = createCamera;
    function createCompleteMeshNode(_name, _shaderClass, _color, _mesh) {
        let node = new ƒ.Node(_name);
        let shader = new _shaderClass();
        let mtrRed = new ƒ.Material(`rgb(${_color.x}, ${_color.y}, ${_color.z})`, _color, _shaderClass);
        let cmpMesh = new ƒ.ComponentMesh();
        cmpMesh.setMesh(_mesh);
        let cmpMaterial = new ƒ.ComponentMaterial();
        cmpMaterial.initialize(mtrRed);
        let cmpTransform = new ƒ.ComponentTransform();
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        node.addComponent(cmpTransform);
        return node;
    }
    Scenes.createCompleteMeshNode = createCompleteMeshNode;
})(Scenes || (Scenes = {}));
//# sourceMappingURL=Scenes.js.map