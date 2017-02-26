
var DIM_2D = "2d";
var DIM_3D = "3d";
var selectedDimension = DIM_3D;

show3DInputs();
function show3DInputs() {
	$(".3d").attr("required");
	$(".3d").show();
	$(".2d").hide();
}

function hide3DInputs() {
	$(".3d").removeAttr("required");
	$(".3d").hide();
	$(".2d").show();
}

$("#dimensions").change(function(){
	var dimensions = $("#dimensions option:selected").val();
	
	if( dimensions == DIM_2D ) {
		selectedDimension = DIM_2D;
		hide3DInputs();
		$('#draw-list a[href="#inputPoint"]').trigger('click');
	}else if( dimensions == DIM_3D) {
		selectedDimension = DIM_3D;
		show3DInputs();
		$('#draw-list a[href="#inputVertices"]').trigger('click');
	}
});

/**
	Virtual Keys
**/
var VK_BACKSPACE= 8;
var VK_TAB 		= 9;
var VK_ENTER 	= 13;
var VK_SHIFT 	= 16;
var VK_CTRL 	= 17;
var VK_ALT		= 18;
var VK_PAUSE	= 19;
var VK_CAPS		= 20;
var VK_ESC		= 27;
var VK_SPACE	= 32;
var VK_PAGEUP	= 33;
var VK_PAGEDOWN = 34;
var VK_END 		= 35;
var VK_HOME		= 36;
var VK_LEFT		= 37;
var VK_UP		= 38;
var VK_RIGHT	= 39;
var VK_DOWN		= 40;
var VK_INSERT	= 45;
var VK_DELETE 	= 46;
var VK_0		= 48;
var VK_1		= 49;
var VK_2		= 50;
var VK_3		= 51;
var VK_4		= 52;
var VK_5		= 53;
var VK_6		= 54;
var VK_7		= 55;
var VK_8		= 56;
var VK_9		= 57;
var VK_A		= 65;
var VK_B		= 66;
var VK_C		= 67;
var VK_D		= 68;
var VK_E		= 69;
var VK_F		= 70;
var VK_G		= 71;
var VK_H		= 72;
var VK_I		= 73;
var VK_J		= 74;
var VK_K		= 75;
var VK_L		= 76;
var VK_M		= 77;
var VK_N		= 78;
var VK_O		= 79;
var VK_P		= 80;
var VK_Q		= 81;
var VK_R		= 82;
var VK_S		= 83;
var VK_T		= 84;
var VK_U		= 85;
var VK_V		= 86;
var VK_W		= 87;
var VK_X		= 88;
var VK_Y		= 89;
var VK_Z		= 90;

function sceneKeyHandler(key) {

}

$(document).ready(function() {
	$.contextMenu({
		selector: '#canvas',
		trigger: 'right',
		items: {
			addPrimitive: {
				name: "Add Primitives",
				callback: function(key, opt){
					alert("Clicked on " + key);
				},
				items: {
						prism: {
							name: "Prism",
							callback: function(key, opt){ 
								createPrimitive(PRIMITIVE_PRISM);
							}
						},
						cube: {
							name: "Cube",
							callback: function(key, opt){ 
								createPrimitive(PRIMITIVE_CUBE);
							}
						}
					}
			}
		}
	});

	$("#canvas").bind({
		keydown: function(e) {
			var key = e.keyCode;
			sceneKeyHandler(key);
		},

		focusin: function(e) {
			$(e.currentTarget).addClass("selected");
		},

		focusout: function(e) {
			$(e.currentTarget).removeClass("selected");
		}
	});
	$("#canvas").focus();
	
});