var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var canvasWidth = 0;
var canvasHeight= 0;

var tempVertices;
var isShowOriginal = false;
var faces = new Array();

var modelList = new Array();

var frameWidth  = 720;
var frameHeight = 1024;
var frameBuffer;
var fps = 1000 / 60; // Default to 60 FPS

// Pixel Data
var PIXEL_X			= 0;
var PIXEL_Y			= 1;
var PIXEL_COLOR		= 2;
var PIXEL_MODEL_ID 	= 3;
var PIXEL_DEPTH		= 4;

var Z_BUFFER;
var worldPos = createTranslationMatrix(0,0,100);

function createFrame(width, height) {
	frameBuffer = new Array(width);
	for( var i = 0; i < width; i++ ){
		frameBuffer[i] = new Array(height);
		for( var j = 0; j < height; j++ ) {
			frameBuffer[i][j] = Array(5);	// Pixel Data
		}
	}
	return frameBuffer;
}

function drawTriangle(frame, face, vertices) {
	var v1 = vertices[face.v[0] - 1];
	var v2 = vertices[face.v[1] - 1];
	var v3 = vertices[face.v[2] - 1];
	var x1 = v1.matrix[0][0];
	var y1 = v1.matrix[0][1];
	var x2 = v2.matrix[0][0];
	var y2 = v2.matrix[0][1];
	var x3 = v3.matrix[0][0];
	var y3 = v3.matrix[0][1];
	var depth = v1.matrix[0][2];
	
	for( var i = 0; i < frame.length; i++ ) {
		for( var j = 0; j < frame[i].length; j++ ) {
			if( isPointInFace(x1, y1, x2, y2, x3, y3, i, j) == true) {
				if( frame[i][j][PIXEL_DEPTH] < depth || frame[i][j][PIXEL_DEPTH] == undefined) {
					frame[i][j][PIXEL_X] = i;
					frame[i][j][PIXEL_Y] = j;
					frame[i][j][PIXEL_COLOR] = face.colorValue;
					frame[i][j][PIXEL_DEPTH] = depth;
				}
			}
		}
	}
}

function isPointInFace(x0, y0, x1, y1, x2, y2, x, y) {
	var A = 1/2 * (-y1 * x2 + y0 * (-x1 + x2) + x0 * (y1 - y2) + x1 * y2);
    var sign = A < 0 ? -1 : 1;
    var s = (y0 * x2 - x0 * y2 + (y2 - y0) * x + (x0 - x2) * y) * sign;
    var t = (x0 * y1 - y0 * x1 + (y0 - y1) * x + (x1 - x0) * y) * sign;
	
    return s > 0 && t > 0 && (s + t) < 2 * A * sign;
}

function moveTo(x, y) {
	ctx.moveTo(x + (canvasWidth / 2),  (-1 * y) + (canvasHeight / 2));
}

function colorAt(x, y) {
	ctx.fillRect(x + (canvasWidth / 2),  (-1 * y) + (canvasHeight / 2), 1, 1);
}

function lineTo(x, y) {
	ctx.lineTo(x + (canvasWidth / 2),  (-1 * y) + (canvasHeight / 2));
}

function fitToContainer(canvas){
	// Make it visually fill the positioned parent
	var height = "500";
	var width  = "100";
  
	canvas.style.width = width + "%";
	canvas.style.height= height + "px";
	
	// ...then set the internal size to match
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
  
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
}

function drawAxis(canvas) {
	ctx.strokeStyle = '#AAA';
	moveTo(0, 0);
	ctx.lineTo(canvasWidth / 2, 10000);
	moveTo(0, 0);
	ctx.lineTo(canvasWidth / 2, 0);
	moveTo(0, 0);
	ctx.lineTo(10000, canvasHeight / 2);
	moveTo(0, 0);
	ctx.lineTo(0, canvasHeight / 2);
	ctx.stroke();
	
	ctx.font = "20px Arial";
	ctx.fillStyle = 'black';
	ctx.fillText("x",canvasWidth - 15, canvasHeight / 2 - 15);
	ctx.fillText("y",canvasWidth / 2, 15);
}

function drawInterval(interval) {
	ctx.font = "10px Comic-Sans";
	ctx.fillStyle = '#555';
	for ( var i = canvasWidth / 2; i < canvasWidth; i += interval ) {
		ctx.fillText(i - (canvasWidth / 2) + '', i + 5, canvasHeight / 2 - 5);
	}
	for ( var i = canvasWidth / 2; i > 0; i -= interval ) {
		ctx.fillText(i - (canvasWidth / 2) + '', i + 5, canvasHeight / 2 - 5);
	}
	for ( var i = canvasHeight / 2; i < canvasHeight; i += interval ) {
		ctx.fillText(-1 * (i - (canvasHeight / 2)) + '', canvasWidth / 2 + 5, i - 5);
	}
	for ( var i = canvasHeight / 2; i > 0; i 	-= interval ) {
		ctx.fillText(-1 * (i - (canvasHeight / 2)) + '', canvasWidth / 2 + 5, i - 5);
	}
}

function render(context) {
	if(arguments.length > 1) {
		var color = arguments[1];
		context.strokeStyle = color;
	}else {
		context.strokeStyle = "#555";
	}

	if( selectedDimension == DIM_2D ) {
		for ( var i = 0; i < modelList.length; i++ ) {
			var model = modelList[i];
			var modelFaces = model.mesh.faces;
			var modelVertices = model.mesh.vertices;
			
			for ( var j = 0; j < modelFaces.length; j++ ) {
				//drawTriangle(frameBuffer, modelFaces[j], modelVertices);
				
				context.beginPath();
				context.globalAlpha = 1;
				context.lineWidth=2;
				context.strokeStyle="#999";
		
				var v = modelFaces[j].v[0] - 1;
				v = modelVertices[v];
				v = v.multiply(worldPos);
				//v = v.multiply(viewMatrix);
				v = divideByW(v);
				moveTo(v.matrix[0][0], v.matrix[0][1]);
				context.stroke();
				
				for( var k = 1; k < 3; k++) {
					v = modelFaces[j].v[k] - 1;
					v = modelVertices[v];
					v = v.multiply(worldPos);
					//v = v.multiply(viewMatrix);
					v = divideByW(v);
					lineTo(v.matrix[0][0], v.matrix[0][1]);
					context.stroke();
				}
				
				if(modelFaces[j].colorValue != undefined) {
					context.fillStyle=modelFaces[j].colorValue;
					context.fill();
				}
				context.closePath();
			}
		}
	}else if( selectedDimension == DIM_3D ) {
		//var frameBuffer = createFrame(canvasWidth, canvasHeight);
		//var viewMatrix = createProjectionPerspective(Math.PI / 30,1024 / 720,1,500);
		//var viewMatrix = createProjectionOrthographic(400,100,100,1);
		for ( var i = 0; i < modelList.length; i++ ) {
			var model = modelList[i];
			var modelFaces = model.mesh.faces;
			var modelVertices = model.mesh.vertices;
			
			for ( var j = 0; j < modelFaces.length; j++ ) {
				//drawTriangle(frameBuffer, modelFaces[j], modelVertices);
				
				context.beginPath();
				context.globalAlpha = 0.5;
				context.lineWidth=2;
				context.strokeStyle="#999";
		
				var v = modelFaces[j].v[0] - 1;
				v = modelVertices[v];
				v = v.multiply(worldPos);
				//v = v.multiply(viewMatrix);
				v = divideByW(v);
				moveTo(v.matrix[0][0], v.matrix[0][1]);
				context.stroke();
				
				for( var k = 1; k < 3; k++) {
					v = modelFaces[j].v[k] - 1;
					v = modelVertices[v];
					v = v.multiply(worldPos);
					//v = v.multiply(viewMatrix);
					v = divideByW(v);
					lineTo(v.matrix[0][0], v.matrix[0][1]);
					context.stroke();
				}
				
				if(modelFaces[j].colorValue != undefined) {
					context.fillStyle=modelFaces[j].colorValue;
					context.fill();
				}
				context.closePath();
			}
		}
		/*
		context.beginPath();
		for( var i = 0; i < frameBuffer.length; i++ ) {
			for( var j = 0; j < frameBuffer[i].length; j++ ) {
				if(frameBuffer[i][j][PIXEL_DEPTH] != undefined) {
					var pixel = frameBuffer[i][j];
					var x = pixel[PIXEL_X];
					var y = pixel[PIXEL_Y];
					
					if(pixel[PIXEL_COLOR] == undefined) {
						context.strokeStyle = "#FFF";
					}else {
						context.strokeStyle = pixel[PIXEL_COLOR];
					}
					moveTo(x, y);
					lineTo(x+1, y+1);
					context.stroke();
				}
			}
		}
		context.closePath();
		*/
	}
}

function update() {
	
}

function transformModel(transformation, model) {
	if(model == undefined || model == null ) {
		for( var i = 0; i < modelList.length; i++ ) {
			var model = modelList[i];
			model.transform(transformation);
		}
	}else {
		model.transform(transformation);
	}
}

function setupCanvas() {
	fitToContainer(canvas);
	//drawAxis(canvas);
	//drawInterval(50);
}

function clearCanvas() {
	ctx.fillStyle = "#222222";
	ctx.fillRect(0, 0, 10000, 10000);
	setupCanvas();
}

function resetCanvas() {
	clearCanvas();
	for( var i = 0; i < modelList.length; i++ ) {
		modelList[i].reset();
	}
	render(ctx);
}

var animation;
var STATUS_STOP = 0;
var STATUS_PLAY = 1;
var animationStatus = STATUS_STOP;
function startAnimation() {
	if(animationStatus == STATUS_STOP) {
		var rawFPSInput = $("#fps-input").val();
		if( isNaN(rawFPSInput) == true ){
			fps = 1000 / 60;
		}else {
			fps = 1000 / parseInt(rawFPSInput);
		}
		animation = setInterval(function(){
			var transformation = createRotationMatrix(1, "y");
			transformModel(transformation);
			clearCanvas();
			render(ctx);
		}, fps);
		$("#statusAnimation").text("Playing");
		animationStatus = STATUS_PLAY;
	}
}
function stopAnimation() {
	if(animationStatus == STATUS_PLAY) {
		clearInterval(animation);
		$("#statusAnimation").text("Stopped");
		animationStatus = STATUS_STOP;
	}
}

function createPrimitive(primitiveId) {
	switch(primitiveId) {
		case PRIMITIVE_PRISM:
			modelList.push(createPrism());
			break;
		case PRIMITIVE_CUBE:
			modelList.push(createCube());
			break;
	}
	render(ctx);
}

window.onresize = setupCanvas;

window.onload = function() {
	$("form").submit(function() {
		try {
			var inputs = $(this).children("input[style!='display: none;']");
			var value = inputs[0].value.split("_");
			var type = value[0];
			var action = value[1];
			
			switch(type) {
				case "draw":
					if( action == "vertices" ) {
						var rawText = $("#vertices").val().split("@");
						var rawVertices = rawText[0].split("\n");
						var rawFaces = rawText[1].split("\n").splice(1);
						var vertices = new Array();
						var faces = new Array();
						rawVertices.pop();
						
						for( var i = 0; i < rawVertices.length; i++ ) {
							var rawVertex = rawVertices[i];
							rawVertex = rawVertex.replace("("," ");
							rawVertex = rawVertex.replace(")"," ");
							rawVertex = rawVertex.split(",");
							var x = parseInt(rawVertex[0]);
							var y = parseInt(rawVertex[1]);
							var z = parseInt(rawVertex[2]);
							var vertex = createVertex(x, y, z);
							vertices.push(vertex);
						}
						
						for( var i = 0; i < rawFaces.length; i++ ) {
							var rawFace = rawFaces[i].split(",");
							faces.push(new Face(rawFace[0], rawFace[1], rawFace[2], rawFace[3]));
						}
						
						for( var i = 0; i < faces.length; i++ ) {
							var depth = 0;
							var face = faces[i];
							var v1 = vertices[face.v[0]-1];
							var v2 = vertices[face.v[1]-1];
							var v3 = vertices[face.v[2]-1];
							face.depth = (v1.matrix[0][2] + v2.matrix[0][2] + v3.matrix[0][2]) / 3;
						}
						faces.sort(function(a,b){return b.depth-a.depth;});
						
						var mesh = new Mesh(vertices, faces);
						var newModel = new Model(modelList.length, "unnamed model #" + (modelList.length + 1), mesh);
						console.log(newModel.toString());
						modelList.push(newModel);
					}
					//originalVertices = new Array(vertices.length);
					//for( var i = 0; i < vertices.length; i++ ) {
					//	originalVertices[i] = vertices[i];
					//}
					render(ctx);
					break;
					
				case "operation":
					var transformation = null;
					if( action == "translate" ) {
						var x = parseInt(inputs[1].value);
						if( x == undefined || x == null || isNaN(x)) {
							x = 0;
						}
						var y = parseInt(inputs[2].value);
						if( y == undefined || y == null || isNaN(y) ) {
							y = 0;
						}

						if(selectedDimension == DIM_3D) {
							var z = parseFloat(inputs[3].value);
							if( z == undefined || z == null || isNaN(z) ) {
								z = 0;
							}
							transformation = createTranslationMatrix(x, y, z);
						}else {
							transformation = createTranslationMatrix(x, y);
						}
					}else if( action == "scale") {
						var xscale = parseFloat(inputs[1].value);
						var yscale = parseFloat(inputs[2].value);
						if(selectedDimension == DIM_3D) {
							var zscale = parseFloat(inputs[3].value);
							transformation = createScalingMatrix(xscale, yscale, zscale);
						}else {
							transformation = createScalingMatrix(xscale, yscale);
						}
					}else if( action == "rotate") {
						var axis = $("#rotate-axis").find(":selected").val();
						var theta = parseFloat(inputs[1].value);
						if( selectedDimension == DIM_2D ) {
							transformation = createRotationMatrix(theta);
						}else if( axis == "x" ) {
							transformation = createRotationMatrix(theta, "x");
						}else if( axis == "y" ) {
							transformation = createRotationMatrix(theta, "y");
						}else if( axis == "z" ) {
							transformation = createRotationMatrix(theta, "z");
						}
					}else  if(action == "shear") {
						var axis = $("#shear-axis").find(":selected").val();
						var a = parseFloat(inputs[1].value);
						var b = parseFloat(inputs[2].value);
						console.log(selectedDimension, axis, a, b);
						if( selectedDimension == DIM_3D) {
							if( axis == "xy" ) {
								transformation = createShearMatrix(a, b, "xy");
							}else if( axis == "xz" ) {
								transformation = createShearMatrix(a, b, "xz");
							}else if( axis == "yz" ) {
								transformation = createShearMatrix(a, b, "yz");
							}
						}else if( selectedDimension == DIM_2D ) {
							if( axis == "x" ) {
								transformation = createShearMatrix(a, "x");
							}else if( axis == "y") { 
								transformation = createShearMatrix(a, "y");
							}
						}
					}else if( action == "reflect") {
						
					}
					for( var i = 0; i < modelList.length; i++ ) {
						var model = modelList[i];
						model.transform(transformation);
					}
					clearCanvas();
					render(ctx);
					break;
			}
			
			if(isShowOriginal == true) {
				tempVertices = vertices;
				vertices = originalVertices;
				render(ctx, "blue");
				vertices = tempVertices;
			}
			
			return false;
		}catch(ex) {
			alert("Error Occurred: Check Console for details");
			console.log(ex);
			return false;
		}
	});
	
	$("#startAnimation").click(startAnimation);
	$("#stopAnimation").click(stopAnimation);
	$("#clear").click(clearCanvas);
	$("#reset").click(resetCanvas);
	$('#toggle-original').change(function() {
		if($(this).prop('checked') == true) {
			isShowOriginal = true;
			
			tempVertices = vertices;
			vertices = originalVertices;
			render(ctx, "blue");
			vertices = tempVertices;
		}else {
			clearCanvas();
			isShowOriginal = false;
			render(ctx);
		}
    });
	
	
	setupCanvas();
	render(ctx);
}

