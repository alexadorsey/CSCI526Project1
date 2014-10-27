var levels : GUIText;
var level0 : GUITexture;
var level1 : GUITexture;
var level2 : GUITexture;
var level3 : GUITexture;
var level4 : GUITexture;
var level0Push : Texture;
var level1Push : Texture;
var level2Push : Texture;
var level3Push : Texture;
var level4Push : Texture;

function Start () {
	levels = GameObject.Find("Levels").guiText;	
	levels.fontSize = Mathf.Floor(Screen.dpi/2);
	level0 = (GameObject.Find("Level0").GetComponent(GUITexture)as GUITexture);
	level1 = (GameObject.Find("Level1").GetComponent(GUITexture)as GUITexture);
	level2 = (GameObject.Find("Level2").GetComponent(GUITexture)as GUITexture);
	level3 = (GameObject.Find("Level3").GetComponent(GUITexture)as GUITexture);
	level4 = (GameObject.Find("Level4").GetComponent(GUITexture)as GUITexture);
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
}

function Update () {
	if(level0.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			level0.texture = level0Push;
			if (TouchPhase.Ended){
				Application.LoadLevel("Level0");
			}
		}
	}

	if(level1.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			level1.texture = level1Push;
			if(TouchPhase.Ended){
				Application.LoadLevel("Level1");
			}
		}
	}
	if(level2.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			level2.texture = level2Push;
			if (TouchPhase.Ended){
				Application.LoadLevel("Level2");
			}
		}
	}
	if(level3.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
		level3.texture = level3Push;
			if (TouchPhase.Ended){
				Application.LoadLevel("Level3");
			}
		}
	}
	if(level4.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			level4.texture = level4Push;
			if (TouchPhase.Ended){
				Application.LoadLevel("Level4");
			}
		}
	}
}