
function Quaternion () {
	if(arguments.length != 4) {
		alert("Invalid arguments for Quaternion");
	}else {
		this.a = new Array(arguments.length);
		for( var i = 0; i < arguments.length; i++ ) {
			this.a[i] = arguments[i];
		}
		this.a[3] = 1;
	}
	
	this.add = function(q) {
		for( var i = 0; i < 4; i++ ) {
			this.a[i] += q.a[i];
		}
	}
	
	this.multiply = function(q) {
		if( typeof q == "number" ) {
			for( var i = 0; i < 4; i++ ) {
				this.a[i] *= q.a[i];
			}
		}else if( typeof q == Quaternion) {
			var r = new Array(4);
			r[0] = this.q[0] * a.q[0] - this.q[1] * a.q[1] - this.q[2] * a.q[2] - this.q[3] * a.q[3];
			r[1] = this.q[0] * a.q[1] - this.q[1] * a.q[0] - this.q[2] * a.q[3] - this.q[3] * a.q[2];
			r[2] = this.q[0] * a.q[2] - this.q[1] * a.q[3] - this.q[2] * a.q[0] - this.q[3] * a.q[1];
			r[3] = this.q[0] * a.q[3] - this.q[1] * a.q[2] - this.q[2] * a.q[1] - this.q[3] * a.q[0];
			this.a = r;
		}
	}
	
	this.normalize = function() {
		var n = Math.sqrt(this.a[0]*this.a[0] + this.a[1]*this.a[1] + this.a[2]*this.a[2] + this.a[3]*this.a[3]);
		this.a[0] /= n;
		this.a[1] /= n;
		this.a[2] /= n;
		this.a[3] /= n;
	}
	
	this.conjugate = function() {
		return new Quaternion(this.a[0], -this.a[1], -this.a[2], -this.a[3]);
	}
	
	this.tostring = function() {
		return this.a;
	}
}