
function Matrix(rows, cols, matrix) {
	this.rows = rows;
	this.cols = cols;
	
	if(matrix == undefined || matrix == null) {
		this.matrix = new Array(rows);
		for( var i = 0; i < rows; i++ ) {
			this.matrix[i] = new Array(cols);
		}
	}else {
		this.matrix = matrix;
	}
	
	this.add = function(A) {
		if(this.rows = A.rows && this.cols == A.cols) {
			var B = new Matrix(A.rows, A.cols);
			
			for( var i = 0; i < A.rows; i++ ) { 
				for( var j = 0; j < A.cols; j++ ) {
					B.matrix[i][j] = this.matrix[i][j] + A.matrix[i][j];
				}
			}
			return B;
		}
		return null;
	}
	
	this.multiply = function(A) {
		if(this.cols == A.rows) {
			var B = new Matrix(this.rows, A.cols);
			for( var i = 0; i < this.rows; i++ ) {
				for( var j = 0; j < A.cols; j++ ) {
					var sum = 0;
					for( var k = 0; k < this.cols; k++ ) {
						sum += this.matrix[i][k] * A.matrix[k][j];
					}
					
					B.matrix[i][j] = sum;
				}
			}
			return B;
		}else {
		}
	}
	
	this.toString = function() {
		var debugOutput = "[\n";
		var rows = this.matrix.length;
		var cols = this.matrix[0].length;
		for( var i = 0; i < cols; i++ ) {
			debugOutput += "\t[";
			for( var j = 0; j < rows; j++ ) {
				debugOutput += this.matrix[j][i] + " ";
			}
			debugOutput += "]\n";
		}
		debugOutput += "]\n";
		return debugOutput;
	}
}

Matrix.prototype.toString = function() {
	var debugOutput = "[\n";
	var rows = this.matrix.length;
	var cols = this.matrix[0].length;
	for( var i = 0; i < cols; i++ ) {
		debugOutput += "\t[";
		for( var j = 0; j < rows; j++ ) {
			debugOutput += this.matrix[j][i] + " ";
		}
		debugOutput += "]\n";
	}
	debugOutput += "]\n";
	return debugOutput;
}


function createVertex(x, y, z) {
	var matrix = new Array(1);
	this.dim = arguments.length;


	if(arguments.length == 2) {
		matrix[0] = new Array(2);
		matrix[0][0] = x;
		matrix[0][1] = y;
		matrix[0][2] = 1;
		matrix = new Matrix(1, 3, matrix);
	}else if(arguments.length == 3) {
		matrix[0] = new Array(3);
		matrix[0][0] = x;
		matrix[0][1] = y;
		matrix[0][2] = z;
		matrix[0][3] = 1;
		matrix = new Matrix(1, 4, matrix);
	}
	
	return matrix;
}

function divideByW(v) {
	v.matrix[0][0] = v.matrix[0][0]/v.matrix[0][3];
	v.matrix[0][1] = v.matrix[0][1]/v.matrix[0][3];
	v.matrix[0][2] = v.matrix[0][2]/v.matrix[0][3];
	v.matrix[0][3] = v.matrix[0][3]/v.matrix[0][3];
	return v;
}

function createTranslationMatrix(x, y, z) {
	var matrix = new Array(arguments.length + 1);
	for( var i = 0; i < arguments.length + 1; i++ ) {
		matrix[i] = new Array(arguments.length + 1);
		for( var j = 0; j < arguments.length + 1; j++ ) {
			matrix[i][j] = 0;
		}
		matrix[i][i] = 1;
	}
	for( var i = 0; i < arguments.length; i++ ) {
		matrix[arguments.length][i] = arguments[i];
	}
	matrix[arguments.length][i] = 1;
	return new Matrix(arguments.length + 1, arguments.length + 1, matrix);
}

function createScalingMatrix(x, y, z) {
	var matrix = new Array(arguments.length + 1);
	for( var i = 0; i < arguments.length + 1; i++ ) {
		matrix[i] = new Array(arguments.length + 1);
		for( var j = 0; j < arguments.length + 1; j++ ) {
			matrix[i][j] = 0;
		}
		matrix[i][i] = arguments[i];
	}
	matrix[arguments.length][arguments.length] = 1;
	return new Matrix(arguments.length + 1, arguments.length + 1, matrix);
}

function createShearMatrix(a, b, c) {
	if(arguments.length == 3) {
		if( c == "xy" ) {
			var matrix = new Array(4);
			for( var i = 0; i < 4; i++ ) {
				matrix[i] = new Array(4);
				for( var j = 0; j < 4; j++ ) {
					matrix[i][j] = 0;
				}
				matrix[i][i] = 1;
			}
			matrix[2][0] = a;
			matrix[2][1] = b;
			return new Matrix(4, 4, matrix);
		}else if( c == "xz" ) {
			var matrix = new Array(4);
			for( var i = 0; i < 4; i++ ) {
				matrix[i] = new Array(4);
				for( var j = 0; j < 4; j++ ) {
					matrix[i][j] = 0;
				}
				matrix[i][i] = 1;
			}
			matrix[1][0] = a;
			matrix[1][2] = b;
			return new Matrix(4, 4, matrix);
		}else if( c == "yz" ) {
			var matrix = new Array(4);
			for( var i = 0; i < 4; i++ ) {
				matrix[i] = new Array(4);
				for( var j = 0; j < 4; j++ ) {
					matrix[i][j] = 0;
				}
				matrix[i][i] = 1;
			}
			matrix[0][1] = a;
			matrix[0][2] = b;
			return new Matrix(4, 4, matrix);x
		}
 	}else if(arguments.length == 2) {
		if( b == "x" ) {
			var matrix = new Array(3);
			for( var i = 0; i < 3; i++ ) {
				matrix[i] = new Array(3);
				for( var j = 0; j < 3; j++ ) {
					matrix[i][j] = 0;
				}
				matrix[i][i] = 1;
			}
			matrix[1][0] = a;
			return new Matrix(3, 3, matrix);
		}else if( b == "y" ) {
			var matrix = new Array(3);
			for( var i = 0; i < 3; i++ ) {
				matrix[i] = new Array(3);
				for( var j = 0; j < 3; j++ ) {
					matrix[i][j] = 0;
				}
				matrix[i][i] = 1;
			}
			matrix[0][1] = a;
			return new Matrix(3, 3, matrix);
		}
	}
}

function createRotationMatrix(theta, axis) {
	var theta = theta * (Math.PI / 180);
	var matrix = null;
	if( arguments.length == 1) { 
		matrix = new Array(3);
		for( var i = 0; i < 3; i++ ) {
			matrix[i] = new Array(3);
			for( var j = 0; j < 3; j++ ) {
				matrix[i][j] = 0;
			}
		}
		matrix[0][0] = Math.cos(theta);
		matrix[0][1] = Math.sin(theta);
		matrix[1][0] = -Math.sin(theta);
		matrix[1][1] = Math.cos(theta);
		return new Matrix(3, 3, matrix);
	}else if( arguments.length == 2) {
		if(axis == "x") {
			matrix = new Array(4);
			for( var i = 0; i < 4; i++ ) {
				matrix[i] = new Array(4);
				for( var j = 0; j < 4; j++ ) {
					matrix[i][j] = 0;
				}
				matrix[i][i] = 1;
			}
			matrix[1][1] = Math.cos(theta);
			matrix[2][1] = -Math.sin(theta);
			matrix[2][2] = Math.cos(theta);
			matrix[1][2] = Math.sin(theta);
			return new Matrix(4, 4, matrix);
		}else if(axis == "y") {
			matrix = new Array(4);
			for( var i = 0; i < 4; i++ ) {
				matrix[i] = new Array(4);
				for( var j = 0; j < 4; j++ ) {
					matrix[i][j] = 0;
				}
				matrix[i][i] = 1;
			}
			matrix[0][0] = Math.cos(theta);
			matrix[2][0] = Math.sin(theta);
			matrix[2][2] = Math.cos(theta);
			matrix[0][2] = -Math.sin(theta);
			return new Matrix(4, 4, matrix);
		}else if(axis == "z") {
			matrix = new Array(4);
			for( var i = 0; i < 4; i++ ) {
				matrix[i] = new Array(4);
				for( var j = 0; j < 4; j++ ) {
					matrix[i][j] = 0;
				}
				matrix[i][i] = 1;
			}
			matrix[0][0] = Math.cos(theta);
			matrix[1][0] = -Math.sin(theta);
			matrix[1][1] = Math.cos(theta);
			matrix[0][1] = Math.sin(theta);
			return new Matrix(4, 4, matrix);
		}
	}
}

function createProjectionOrthographic(width, height, zfar, znear) {
	var matrix = new Array(4);
	for( var i = 0; i < 4; i++ ) {
		matrix[i] = new Array(4);
		for( var j = 0; j < 4; j++ ) {
			matrix[i][j] = 0;
		}
	}
	
	matrix[0][0] = 1 / width;
	matrix[1][1] = 1 / height;
	matrix[2][2] = - ( 2 / (zfar - znear) );
	matrix[3][2] = - ( (zfar + znear) / (zfar - znear) );
	matrix[4][4] = 1;
	return new Matrix(4, 4, matrix);
}

function createProjectionPerspective(fov, aspect, nearPlane, farPlane) {
	var matrix = new Array(4);
	for( var i = 0; i < 4; i++ ) {
		matrix[i] = new Array(4);
		for( var j = 0; j < 4; j++ ) {
			matrix[i][j] = 0;
		}
	}
	
	var m11 = 1.0 / (Math.tan(fov * 0.5));
	var m00 = m11 / aspect;
	var m22 = farPlane / (nearPlane - farPlane);
	var m32 = (nearPlane * farPlane) / (nearPlane - farPlane);
	
	matrix[0][0] = m00;
	matrix[1][1] = m11;
	matrix[2][2] = m22;
	matrix[3][2] = m32;
	matrix[2][3] = 1;
	
	return new Matrix(4, 4, matrix);
}

function createViewMatrix() {

}

function createLookAt(camPos, camTarget, camUp) {
	
}	