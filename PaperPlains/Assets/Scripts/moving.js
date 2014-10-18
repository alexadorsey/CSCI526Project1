#pragma strict

var speed : double;


function Start () {

}

function Update () {
	//Debug.Log("sin value: "+Mathf.Sin(Time.realtimeSinceStartup * 20));
	transform.Translate(Mathf.Sin(Time.realtimeSinceStartup * speed),0,0);
}