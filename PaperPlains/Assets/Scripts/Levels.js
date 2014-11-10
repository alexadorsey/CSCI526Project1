var backButton : GUITexture;
var levels : GUIText;
var level0 : GUITexture;
var level1 : GUITexture;
var level2 : GUITexture;
var level3 : GUITexture;
var level4 : GUITexture;
var level5 : GUITexture;
var level0Push : Texture;
var level1Push : Texture;
var level2Push : Texture;
var level3Push : Texture;
var level4Push : Texture;
var level5Push : Texture;


function Start () {
	levels = GameObject.Find("Levels").guiText;	
	levels.fontSize = Mathf.Floor(Screen.dpi/2);
	level0 = (GameObject.Find("Level0").GetComponent(GUITexture)as GUITexture);
	level1 = (GameObject.Find("Level1").GetComponent(GUITexture)as GUITexture);
	level2 = (GameObject.Find("Level2").GetComponent(GUITexture)as GUITexture);
	level3 = (GameObject.Find("Level3").GetComponent(GUITexture)as GUITexture);
	level4 = (GameObject.Find("Level4").GetComponent(GUITexture)as GUITexture);
	level5 = (GameObject.Find("Level5").GetComponent(GUITexture)as GUITexture);
	
	backButton = (GameObject.Find("BackButton").GetComponent(GUITexture)as GUITexture);
	backButton.pixelInset.width = 0.1 * Screen.width;
	backButton.pixelInset.height = backButton.pixelInset.width;
}

function OnGUI() {
	level2.pixelInset.width = level0.pixelInset.width;
	level2.pixelInset.height = level0.pixelInset.width;
	level2.pixelInset.x = -level0.pixelInset.width/2;
	level1.pixelInset.width = level0.pixelInset.width;
	level1.pixelInset.height = level0.pixelInset.width;
	level1.pixelInset.x = level2.pixelInset.x - 250;
	level0.pixelInset.width = 0.1 * Screen.width;
	level0.pixelInset.height = level0.pixelInset.width;
	level0.pixelInset.x = level1.pixelInset.x - 250;	
	level3.pixelInset.width = level0.pixelInset.width;
	level3.pixelInset.height = level0.pixelInset.width;
	level3.pixelInset.x = level2.pixelInset.x + 250;
	level4.pixelInset.width = level0.pixelInset.width;
	level4.pixelInset.height = level0.pixelInset.width;
	level4.pixelInset.x = level3.pixelInset.x + 250;
	
	level5.pixelInset.width = level0.pixelInset.width;
	level5.pixelInset.height = level0.pixelInset.width;
	level5.pixelInset.x = level0.pixelInset.x ;
	//level5.pixelInset.y = level2.pixelInset.y + 150;

}

function Update () {
	if(backButton.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			if(TouchPhase.Ended){
				Application.LoadLevel("Menu");
			}
		}
	}

	if(level0.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			level0.texture = level0Push;
			if (TouchPhase.Ended){
				Application.LoadLevel("Level6");
			}
		}
	}

	if(level1.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			level1.texture = level1Push;
			if(TouchPhase.Ended){
				Application.LoadLevel("Moon-1");
			}
		}
	}
	if(level2.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			level2.texture = level2Push;
			if (TouchPhase.Ended){
				Application.LoadLevel("Level7");
			}
		}
	}
	if(level3.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
		level3.texture = level3Push;
			if (TouchPhase.Ended){
				Application.LoadLevel("Level1");
			}
		}
	}
	if(level4.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			level4.texture = level4Push;
			if (TouchPhase.Ended){
				Application.LoadLevel("Level2");
			}
		}
	}
	if(level5.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			level5.texture = level5Push;
			if (TouchPhase.Ended){
				Application.LoadLevel("Level7");
			}
		}
	}
}