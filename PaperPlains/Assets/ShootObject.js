#pragma strict

function Start () {
}


function OnTriggerEnter(other : Collider) {
	Debug.Log("hit in ontriggerenter shootobject");
	Debug.Log(other.transform.name);
	if(other.name == "Paper Plane Body"){
	
		Debug.Log("hit");
		//var dir = new Ray (transform.position, other.transform.position);
		rigidbody.AddForce(other.transform.position);
	}
	
}

function Update () {

}