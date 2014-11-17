#pragma strict

var OrbitSpeed:float;
var startPosition : Vector3;
function Start () {
	OrbitSpeed =  0.0005f;
	startPosition = transform.position;
}

function FixedUpdate () {
	// rotate 1
	if(transform.tag == "line1ring" || transform.GetChild(0).tag == "line1ring"){
		transform.RotateAround(startPosition+ new Vector3(20,0,0), Vector3.forward, 90.0f* Time.deltaTime);
	}else if (transform.tag == "line2ring" || transform.GetChild(0).tag == "line2ring"){
		transform.RotateAround(startPosition- new Vector3(20,0,0), Vector3.forward, -90.0f* Time.deltaTime);
	}else if (transform.tag == "line3ring" || transform.GetChild(0).tag == "line3ring"){
		transform.RotateAround(startPosition- (new Vector3(0,20,0)), this.transform.up, -90.0f* Time.deltaTime);
	}
}