// import { drawTypes } from "./canvastypes";
var Vector2 = Utils.Vector2;
var Line = DrawTypes.DrawLine;
var Path = DrawTypes.DrawPath;
var Point = DrawTypes.DrawPoint;
var Path2 = DrawTypes2.DrawPath;
var Point2 = DrawTypes2.DrawPoint;
var Vertex = DrawTypes2.Vertex;
var Tangent = DrawTypes2.TangentPoint;
window.addEventListener("load", init);
let crc;
// let l1: Line = new Line(new Vector2(100, 100), new Vector2(200, 200), new Vector2(100, 100), new Vector2(100, 200));
// let l2: Line = new Line(new Vector2(200, 200), new Vector2(300, 100), new Vector2(200, 200), new Vector2(300, 200));
// let l3: Line = new Line(new Vector2(300, 100), new Vector2(200, 0));
// let l4: Line = new Line(new Vector2(200, 0), new Vector2(100, 100));
// let exPath: Path = new Path([l1, l2, l3, l4], "yellow", "test");
// let l5: Line = new Line(new Vector2(0, 0), new Vector2(200, 200), new Vector2(100, 100), new Vector2(100, 200));
// let l6: Line = new Line(new Vector2(100, 100), new Vector2(200, 200), new Vector2(100, 100), new Vector2(100, 200));
// let exPath2: Path = new Path([l5,l6], "hotpink", "test");
let paths = [];
let paths2 = [];
let currentlySelectedPath;
let points = [];
let currentlySelectedPoint;
let originalPos;
function init() {
    let canvas = document.getElementById("myCanvas");
    canvas.addEventListener("mousedown", mousedown);
    canvas.addEventListener("mousemove", mousemove);
    canvas.addEventListener("mouseup", mouseup);
    crc = canvas.getContext("2d");
    // console.log("init");
    // crc.beginPath();
    // crc.moveTo(0, 0);
    // crc.lineTo(100, 100);
    // crc.stroke();
    // exPath.draw(crc);
    // exPath2.draw(crc);
}
function createLines() {
    paths = [];
    paths2 = [];
    console.clear();
    let amountObjectsInput = document.getElementById("amountObjects");
    let amountObjects = parseInt(amountObjectsInput.value);
    let amountPointsInput = document.getElementById("amountPoints");
    let amountPoints = parseInt(amountPointsInput.value);
    for (let i = 0; i < amountObjects; i++) {
        let previousEnd = new Point(Utils.RandomRange(0, 500), Utils.RandomRange(0, 500), null);
        let path = new Path([previousEnd], "black", Utils.RandomColor(), "path" + i, i);
        for (let k = 0; k < amountPoints - 1; k++) {
            let newEnd = new Point(Utils.RandomRange(0, 500), Utils.RandomRange(0, 500), null);
            path.addLineToEnd(new Point(previousEnd.x, previousEnd.y), new Point(newEnd.x, newEnd.y), new Point(newEnd.x, newEnd.y));
            previousEnd = newEnd;
        }
        path.addLineToEnd(new Point(previousEnd.x, previousEnd.y), new Point(path.points[0].x, path.points[0].y), new Point(path.points[0].x, path.points[0].y));
        paths.push(path);
    }
    for (let i = 0; i < amountObjects; i++) {
        let start = new Vertex(Utils.RandomRange(0, 500), Utils.RandomRange(0, 500), null);
        let path = new Path2([start], "black", Utils.RandomColor(), "path" + i, i);
        for (let k = 0; k < amountPoints - 1; k++) {
            let newPoint = new Vertex(Utils.RandomRange(0, 500), Utils.RandomRange(0, 500), null);
            path.addVertexToEnd(newPoint);
        }
        path.setClosed(true);
        paths2.push(path);
    }
    redrawAll();
}
function redrawAll() {
    crc.clearRect(0, 0, 500, 500);
    console.log("[Start] Drawing Old Path Objects");
    paths.sort(Path.sort);
    let startTime = Date.now();
    for (let path of paths) {
        // crc.globalAlpha = (path == currentlySelectedPath) || (currentlySelectedPath == null) ? 1 : 0.5;
        path.draw(crc);
    }
    console.log(`[Done] Drawing Old Path Objects, ${paths.length} Paths with ${(paths[0].points.length - 1) / 3} Vertices each. This took ${Date.now() - startTime}ms`);
    // for (let path of paths) {
    //     if (path == currentlySelectedPath) 
    //     for(let p of path.points){
    //         p.draw(crc);
    //     }
    // }
    console.log("[Start] Drawing New Path Objects");
    paths2.sort(Path2.sort);
    for (let path of paths2) {
        // crc.globalAlpha = 1;
        path.draw(crc);
    }
    console.log(`[Done] Drawing New Path Objects, ${paths2.length} Paths with ${paths2[0].points.length} Vertices each. This took ${Date.now() - startTime}ms`);
}
function mousedown(_event) {
    // let foundPoint: Point;
    // let foundPath: Path;
    // for (let path of paths) {
    //     if (crc.isPointInPath(path.getPath2D(), _event.clientX, _event.clientY)) {
    //         foundPath = path;
    //     }
    //     // if (path == currentlySelectedPath) {
    //     for (let point of path.points) {
    //         if (crc.isPointInPath(point.getPath2D(), _event.clientX, _event.clientY)) {
    //             foundPoint = point;
    //         }
    //     }
    //     // }
    // }
    // if (foundPoint) {
    //     selectPoint(foundPoint, _event);
    //     // selectPath(null, null)
    //     return;
    // }
    // else if (foundPath) {
    //     // console.debug("clicked on " + foundPath.name);
    //     selectPath(foundPath, _event);
    //     selectPoint(null, _event);
    // }
    // else {
    //     selectPath(null, _event);
    //     selectPoint(null, _event);
    //     redrawAll();
    // }
}
function selectPath(pathToSelect, _event) {
    currentlySelectedPath = pathToSelect;
    if (!pathToSelect)
        return;
    originalPos = new Vector2(_event.clientX, _event.clientY);
    redrawAll();
}
function selectPoint(pointToSelect, _event) {
    currentlySelectedPoint = pointToSelect;
    if (!pointToSelect)
        return;
    originalPos = new Vector2(_event.clientX, _event.clientY);
    redrawAll();
}
function mouseup() {
    // currentlySelectedPath = null;
    // console.log("mouseup");
}
function mousemove(_event) {
    // if (_event.buttons == 0) return;
    // if (currentlySelectedPoint) {
    //     currentlySelectedPoint.move(_event.clientX - originalPos.x, _event.clientY - originalPos.y);
    // }
    // else if (currentlySelectedPath){
    //     currentlySelectedPath.move(_event.clientX - originalPos.x, _event.clientY - originalPos.y);
    // }
    // redrawAll();
    // originalPos = new Vector2(_event.clientX, _event.clientY);
}
/*
function mousedown(_event: MouseEvent) {
    let selPoint: Point;
    for (let point of points) {
        if (crc.isPointInPath(point.getPath2D(), _event.clientX, _event.clientY)) {
            selPoint = point;
        }
    }
    if (selPoint) {
        selectPoint(selPoint);
    } else {
        let foundPath: Path;
        for (let path of paths) {
            if (crc.isPointInPath(path.getPath2D(), _event.clientX, _event.clientY)) {
                foundPath = path;
            }
        }
        if (foundPath) {
            console.debug("clicked on " + foundPath.name);
            selectPath(foundPath);

        }
    }
}



    function selectPath(pathToSelect: Path): void {
        if (!pathToSelect) return;
        currentlySelectedPath = pathToSelect;
        redrawAll();
        points = currentlySelectedPath.returnAndDrawCornerPoints(crc);
    }

    function selectPoint(pointToSelect: Point) {
        if (!pointToSelect) return;
        currentlySelectedPoint = pointToSelect;
    }

    function mousemove(_event: MouseEvent) {
        if (!currentlySelectedPoint) return;
        currentlySelectedPoint.parent.changePoint(currentlySelectedPoint.point, new Vector2(_event.clientX, _event.clientY));
        redrawAll();
        currentlySelectedPoint.point = new Vector2(_event.clientX, _event.clientY);
        console.log(currentlySelectedPath);
        currentlySelectedPath.returnAndDrawCornerPoints(crc);
    }

    function mouseup() {
        if (!currentlySelectedPoint) return;
        currentlySelectedPoint = null;
    }
    */ 
//# sourceMappingURL=canvas.js.map