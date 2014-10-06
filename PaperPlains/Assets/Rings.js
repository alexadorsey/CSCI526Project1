#pragma strict


 function OnTriggerEnter (other : Collider) {
	if (other.name == "Ring") {
		print("Collision with Ring");
		other.renderer.material.color = Color.red;
	}
}

function Start () {
	gameObject.renderer.material.color.a = 0.0;
}

function Update () {
	

}