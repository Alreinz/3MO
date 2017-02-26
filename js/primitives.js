
var PRIMITIVE_PRISM = 0;
var PRIMITIVE_CUBE = 1;
var PRIMITIVE_SPHERE = 2;

function createPrism(x, y, z) {
	if(arguments.length == 0) {
		var vertices = new Array();
		vertices.push(createVertex(-50,-50,50));
		vertices.push(createVertex(50,-50,50));
		vertices.push(createVertex(-50,-50,-50));
		vertices.push(createVertex(50,-50,-50));
		vertices.push(createVertex(0,50,0));
		var faces = new Array();
		faces.push(new Face(1,2,3,"#550000"));
		faces.push(new Face(4,2,3,"#005500"));
		faces.push(new Face(1,2,5,"#000055"));
		faces.push(new Face(1,3,5,"#550055"));
		faces.push(new Face(2,3,5,"#555500"));
		faces.push(new Face(2,4,5,"#005500"));
		var mesh = new Mesh(vertices, faces);
		var prism = new Model(modelList.length, "cube", mesh);
		return prism;
	}else if(arguments.length == 3) {
		var vertices = new Array();
		vertices.push(createVertex(-50,-50,50));
		vertices.push(createVertex(50,-50,50));
		vertices.push(createVertex(-50,-50,-50));
		vertices.push(createVertex(50,-50,-50));
		vertices.push(createVertex(0,50,0));
		var faces = new Array();
		faces.push(new Face(1,2,3,"#550000"));
		faces.push(new Face(4,2,3,"#005500"));
		faces.push(new Face(1,2,5,"#000055"));
		faces.push(new Face(1,3,5,"#550055"));
		faces.push(new Face(2,3,5,"#555500"));
		faces.push(new Face(2,4,5,"#005500"));
		var mesh = new Mesh(vertices, faces);
		var prism = new Model(modelList.length, "cube", mesh);
		return prism;
	}
}

function createCube(x, y, z) {
	var x = x;
	var y = y;
	var z = z;
	if(arguments.length == 0) {
		x = 0;
		y = 0;
		z = 0;
	}
	
	var vertices = new Array();
	vertices.push(createVertex(x - 50,  y - 50,  z + 50));
	vertices.push(createVertex(x - 50,  y - 50,  z - 50));
	vertices.push(createVertex(x + 50,  y - 50,  z - 50));
	vertices.push(createVertex(x + 50,  y - 50,  z + 50));
	vertices.push(createVertex(x - 50,  y + 50,  z + 50));
	vertices.push(createVertex(x - 50,  y + 50,  z - 50));
	vertices.push(createVertex(x + 50,  y + 50,  z - 50));
	vertices.push(createVertex(x + 50,  y + 50,  z + 50));
	var faces = new Array();
	faces.push(new Face(1,2,4,"#990000"));
	faces.push(new Face(3,2,4,"#009900"));
	faces.push(new Face(6,5,2,"#555555"));
	faces.push(new Face(1,5,2,"#000099"));
	faces.push(new Face(1,4,5,"#555555"));
	faces.push(new Face(8,5,4,"#555555"));
	faces.push(new Face(5,6,8,"#555555"));
	faces.push(new Face(7,6,8,"#555555"));
	faces.push(new Face(8,7,4,"#555555"));
	faces.push(new Face(3,7,4,"#555555"));
	faces.push(new Face(2,3,7,"#009900"));
	faces.push(new Face(6,7,2,"#000099"));
	var mesh = new Mesh(vertices, faces);
	var cube = new Model(modelList.length, "cube", mesh);
	return cube;
}

function createSphere(x, y, z) {
	var radius = 50;
	var vertices = new Array();
	
}