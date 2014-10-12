#pragma strict
var paperPlains : GUIText;
var start : GUITexture;
var about : GUITexture;

function Start () {
	paperPlains = GameObject.Find("Paper Plains").guiText;
	
	start = (GameObject.Find("Start").GetComponent(GUITexture)as GUITexture);
	about = (GameObject.Find("About").GetComponent(GUITexture)as GUITexture);
}

function Update () {
	if(start.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			Application.LoadLevel("Levels");
		}
	
	}
	
	
}


function OnGUI(){
	
	
}