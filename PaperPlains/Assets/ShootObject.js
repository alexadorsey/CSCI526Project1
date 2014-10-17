#pragma strict


var detected ;
var shootPosition : Vector3;
var currentPosition : Vector3;
function Start () {
	detected = false;
	shootPosition = new Vector3(0.0f,0.0f,0.0f);
}
function OnTriggerEnter(other : Collider){
	if(other.transform.name == "Paper Plane Body"){
		Debug.Log("hit in the trigger");
		detected = true;
		shootPosition = other.transform.position + new Vector3(10.0f,0.0f,0.0f);
		currentPosition = this.transform.position;
//		var delta = this.transform.position - other.transform.position;
//		delta.Normalize();
//		var speed = 10.0f * Time.deltaTime;
//		rigidbody.MovePosition(rigidbody.position + (delta * speed));
 
	}
}
//function OnTriggerExit(other : Collider){
//	if(other.transform.name == "Paper Plane Body"){
//		Destroy(this.gameObject);
//	}
//	
//
//}
function shoot(otherPosition: Vector3){
		var delta = otherPosition - this.transform.position;
		if(delta == 0){
			Destroy(this.gameObject);
			return;
		}
		
		delta.Normalize();
		var speed = 300.0f * Time.deltaTime;
		rigidbody.MovePosition(rigidbody.position + (delta * speed));
}


function FixedUpdate () {
	if(detected){
		Debug.Log("Detected");
		shoot(shootPosition);
	}
}