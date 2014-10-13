var levels : GUIText;
var level1 : GUITexture;
var level2 : GUITexture;
var level3 : GUITexture;
var level4 : GUITexture;
var level5 : GUITexture;

function Start () {

	levels = GameObject.Find("Levels").guiText;	
	levels.fontSize = Mathf.Floor(Screen.dpi/2);

	level1 = (GameObject.Find("Level1").GetComponent(GUITexture)as GUITexture);
	level2 = (GameObject.Find("Level2").GetComponent(GUITexture)as GUITexture);
	level3 = (GameObject.Find("Level3").GetComponent(GUITexture)as GUITexture);
	level4 = (GameObject.Find("Level4").GetComponent(GUITexture)as GUITexture);
	level5 = (GameObject.Find("Level5").GetComponent(GUITexture)as GUITexture);
}

function OnGUI() {
	
	level3.pixelInset.width = level1.pixelInset.width;
	level3.pixelInset.height = level1.pixelInset.width;
	level3.pixelInset.x = -level1.pixelInset.width/2;
	
	level2.pixelInset.width = level1.pixelInset.width;
	level2.pixelInset.height = level1.pixelInset.width;
	level2.pixelInset.x = level3.pixelInset.x - 250;
	
	level1.pixelInset.width = 0.1 * Screen.width;
	level1.pixelInset.height = level1.pixelInset.width;
	level1.pixelInset.x = level2.pixelInset.x - 250;	
	
	level4.pixelInset.width = level1.pixelInset.width;
	level4.pixelInset.height = level1.pixelInset.width;
	level4.pixelInset.x = level3.pixelInset.x + 250;
	
	level5.pixelInset.width = level1.pixelInset.width;
	level5.pixelInset.height = level1.pixelInset.width;
	level5.pixelInset.x = level4.pixelInset.x + 250;

}



function Update () {

	if(level1.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			Application.LoadLevel("Tutorial");
		}
	
	}
	
	if(level2.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			Application.LoadLevel("Level1Scene");
		}
	
	}
	
	if(level3.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			Application.LoadLevel("Tutorial");
		}
	
	}
	
	if(level4.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			Application.LoadLevel("Tutorial");
		}
	
	}
	
	if(level5.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			Application.LoadLevel("Tutorial");
		}
	
	}
	
}