#pragma strict

function OnTriggerEnter (other : Collider) {
		print("Collision with Static Obstacle");
		Destroy(this.gameObject);
		//TODO Decrease a life
}

function Start () {

}

function Update () {

}