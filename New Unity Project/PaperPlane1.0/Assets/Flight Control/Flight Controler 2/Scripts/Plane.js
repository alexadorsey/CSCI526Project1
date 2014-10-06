 	var Obj : Rigidbody;
	var zrotForce : int = 1;
	var MaxRot : int = 90;
	var MinRot : int = -90;
	var rotupForce : int = 1;
	var speed : float;
	var speedincrease : float;
	var speeddecrease : float;
	var Maxspeed : int;
	var Minspeed : int;
	var takeoffspeed : int;
	var lift : int;
	var minlift : int;
	var hit = false;
function Start () {

    InvokeRepeating("Speed", .1, .1);
}

function Speed(){

if (Input.GetKey(KeyCode.Space)){
Mathf.Repeat(1,Time.time);
    speed=speed+speedincrease;
    }
if (Input.GetKey(KeyCode.LeftAlt)){
Mathf.Repeat(1,Time.time);
    speed=speed-speeddecrease;
    }
}


function Update () {
var spd = Obj.velocity.magnitude;
	Obj.rigidbody.AddRelativeForce(0,0,-speed);
    var H=(Input.GetAxis ("Horizontal"))*zrotForce;
    if (H){
    Obj.rigidbody.AddRelativeTorque(0, 0, H*(spd/100));
    }
    var V=(Input.GetAxis ("Vertical"))*rotupForce;
    if (V){
    Obj.rigidbody.AddRelativeTorque(V*(spd/100), 0, 0);
    }
    
    if(Maxspeed<=speed){
    speed=Maxspeed;
    }else{
    speed=speed;
    }
    if(Minspeed>=speed){
    speed=Minspeed;
    }else{
    speed=speed;
    }
    	if (speed<takeoffspeed){
	Obj.rigidbody.AddForce(0,minlift,0);

	}
	if(speed>takeoffspeed){
	Obj.rigidbody.AddForce(0,lift,0);
	}
	if (Obj.rigidbody.rotation.z>MaxRot){
	Obj.rigidbody.rotation.z=MaxRot;
	}
	if (Obj.rigidbody.rotation.z<MinRot){
	Obj.rigidbody.rotation.z=MinRot;
	}
}



