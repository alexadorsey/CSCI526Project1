#pragma strict

function Start () {

}

function Update () {
	transform.Translate(Mathf.Sin(Time.realtimeSinceStartup * 10),0,0);
}