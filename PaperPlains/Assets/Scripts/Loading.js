#pragma strict

private var startTime = 0;
private var duration = 2;

function Start () {
	//Invoke("NextScene", 2);
}

function Update() {
//	if( Time.time - startTime > duration ) {
//		NextScene();
//	}
}

function Awake() {
	var bgMusic : GameObject = GameObject.Find("BGMusic");
	// make sure we survive going to different scenes
	DontDestroyOnLoad(bgMusic);
	
	//NextScene();
}

//function NextScene() {
//	print("In nect scene");
//	//yield WaitForSeconds(2);
//	Application.LoadLevel("Menu");
//	
//}