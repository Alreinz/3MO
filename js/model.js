
function Face() {
	if(arguments[arguments.length-1].indexOf("#") > -1) {
		this.v = new Array(arguments.length-1);
		for( var i = 0; i < arguments.length-1; i++ ) {
			this.v[i] = arguments[i];
		}
		this.colorValue = arguments[arguments.length-1];
	}else {
		this.v = new Array(arguments.length);
		for( var i = 0; i < arguments.length; i++ ) {
			this.v[i] = arguments[i];
		}
	}
}

function Mesh(vertices, faces) {
	this.vertices = vertices;
	this.faces = faces;
}

function Model(id, name, mesh, position, orientation) {
	this.id = id;
	
	if( name == undefined || name == null) {
		this.name = "unnamed model";
	}else {
		this.name = name;
	}

	if( mesh == undefined || mesh == null) {
		this.mesh = new Array();
	}else {
		this.mesh = mesh;
	}

	this.vertices = mesh.vertices;
	this.originalVertices = new Array();
	for( var i = 0; i < this.vertices.length; i++ ) {
		this.originalVertices[i] = this.vertices[i];
	}
	this.faces = mesh.faces;
	
	if( orientation == undefined || orientation == null) {
		//TODO: Orientation instantation;
	}else {
		this.orientation = orientation;
	}
	this.roll = 0;	// X Axis
	this.pitch = 0;	// Y axis
	this.yaw = 0;	// Z Axis
	
	if( position == undefined || position == null) {
		this.position = createVertex(0,0,0);
	}else {
		this.position = position;
	}
	
	this.transform = function(t) {
		var center = this.findCenter();
		this.centerOrigin(center);
	
		var mesh = this.mesh;
		var faces = mesh.faces;
		var vertices = mesh.vertices;
		
		for( var j = 0; j < vertices.length; j++ ) {
			vertices[j] = vertices[j].multiply(t)
		}
		
		this.restoreOrigin(center);
	}
	
	this.findCenter = function() {
		var centerx = 0;
		var centery = 0;
		var centerz = 0;
		for( var i = 0;  i < this.vertices.length; i++ ) {
			centerx += this.vertices[i].matrix[0][0];
			centery += this.vertices[i].matrix[0][1];
			centerz += this.vertices[i].matrix[0][2];
		}
		centerx = centerx / this.vertices.length;
		centery = centery / this.vertices.length;
		centerz = centerz / this.vertices.length;
		var center = createVertex(centerx, centery, centerz);
		return center;
	}
	
	this.centerOrigin = function(center) {
		var translationMatrix = createTranslationMatrix(-center.matrix[0][0], -center.matrix[0][1], -center.matrix[0][2]);
		for( var i = 0; i < this.vertices.length; i++) {
			this.vertices[i] = this.vertices[i].multiply(translationMatrix);
		}
	}
	
	this.restoreOrigin = function(center) {
		var translationMatrix = createTranslationMatrix(center.matrix[0][0], center.matrix[0][1], center.matrix[0][2]);
		for( var i = 0; i < this.vertices.length; i++) {
			this.vertices[i] = this.vertices[i].multiply(translationMatrix);
		}
	}
	
	this.reset = function() {
		this.mesh.vertices = new Array(this.originalVertices.length);
		for( var i = 0; i < this.originalVertices.length; i++ ) {
			this.mesh.vertices[i] = this.originalVertices[i];
		}
	}
	
	this.tostring = function() {
		return this.name;
	}
}
Model.prototype.toString = function() {

	return "["+ this.name + ",("+this.position+")]";
}