var LevelControls : LevelControls;
var LevelDisplay : LevelDisplay;


public var guidanceSetTimer:int;
public var guidanceSetDistance:int;
public var guidanceState: int;

private var paperPlane : GameObject;

public var guidanceBoard : GUITexture;

function Start () {
	// guidance background
	guidanceBoard = (GameObject.Find("Guidance Board").GetComponent(GUITexture)as GUITexture);
	guidanceBoard.enabled = false;
	LevelDisplay.guidanceText.enabled = false;
	
	guidanceBoard.pixelInset.width = Screen.height*0.90;
	guidanceBoard.pixelInset.height = Screen.height*0.6;
	guidanceBoard.pixelInset.position.x = -guidanceBoard.pixelInset.width/2;
	guidanceBoard.pixelInset.position.y = -guidanceBoard.pixelInset.height/2;
	guidanceBoard.transform.position.z = 10;
	LevelDisplay.guidanceText.transform.position.z = 60;
	
	paperPlane = GameObject.Find("Plane");


	if (LevelControls.levelInt == 0) {
		LevelDisplay.guidanceText = GameObject.Find("Guidance").guiText;
		guidanceState = 0;//Start
		guidanceSetTimer = 115;
		guidanceSetDistance = 1;
		LevelDisplay.guidanceText.fontSize = Mathf.Floor(Screen.dpi/9);
		LevelDisplay.guidanceText.pixelOffset.y = 0;
		LevelDisplay.guidanceText.color = Color.black;
		LevelDisplay.guidanceText.text = "Welcome to the world of\nPaper Planes!";
	}

}

function Update () {
	if (LevelControls.levelInt == 0) {
		if (!LevelControls.isGamePaused && !LevelControls.inCountdown) {
			if(guidanceState >= 0) {
				if(paperPlane.rigidbody.position.x > guidanceSetDistance){
					guidanceState++;				
					guidanceSetDistance += 300;
					if(guidanceState == 10){
						guidanceSetDistance = 99999;
					}
					ShowGuidance();
				}
				
			}
			
		}else if(LevelControls.isGamePaused && LevelDisplay.guidanceText.enabled){
			for(var i = 0; i < Input.touchCount; ++i){
				// Back Button Listener   
				/*if(backButton.HitTest(Input.GetTouch(0).position)){
					if(Input.GetTouch(0).phase == TouchPhase.Began){
						if(TouchPhase.Ended){
							Application.LoadLevel("Settings");
						}
					}
				}*/
				if(Input.GetTouch(i).phase == TouchPhase.Began){
					HideGuidance();
				
				}
			}
			if(Input.GetKeyDown(KeyCode.Space)){
				HideGuidance();
			}
		}
	}
}

//Timer for automatically closing the instruction
function GuidanceTimer() {
	/*if(guidanceSetTimer>0){
		guidanceSetTimer --;
	} else {
		HideGuidance();
	}*/
}

function HideGuidance() {
	guidanceBoard.enabled = false;
	LevelDisplay.guidanceText.enabled = false;
	//LevelControls.UnPauseGame();	
	LevelControls.isGamePaused = false;
	Time.timeScale=1;
	LevelControls.isGuidanceShown = 0;	
}



//Show guidance in tutorial level
function ShowGuidance(){
	print("Showing Guidance");
	guidanceBoard.enabled = true;
	LevelDisplay.guidanceText.enabled = true;
	guidanceSetTimer = 180;
	//LevelControls.PauseGame(); 
	LevelControls.isGamePaused = true;
	Time.timeScale=0;
	switch(guidanceState){
		case 1:
			LevelDisplay.guidanceText.text = "Welcome to the world of\nPaper Planes!\n\nTap the screen to continue\n";
			break;
		case 2:
			LevelDisplay.guidanceText.text = "Controls:\n\nRotate your phone\n to turn left, right, up, or down\n";
			break;
		case 3:     
			LevelDisplay.guidanceText.text = "See the health bar?\n\nIt will always be going down,\nbut when you go through a ring, \nit will go up\n";
			break;
		case 4:
			LevelDisplay.guidanceText.text = "Your Goal:\n\nGo through the rings!\nCollect all of them\nbefore your health runs out!\n";
			break;
		case 5:
			LevelDisplay.guidanceText.text = "Obstacles:\n\nHitting obstacles will\n damage your paper plane\n(you lose health!)\n";
			break;
		case 6:
			LevelDisplay.guidanceText.text = "Hearts:\n\nHeart items can\nreplenish your health\n";
			break;
		case 7:
			LevelDisplay.guidanceText.text = "Lightning:\n\nCollect a lightning item and press\nthe lightning button to speed up\n";
			break;
		case 8:
			LevelDisplay.guidanceText.text = "Shields:\n\nThese will give you a shield\nagainst obstacles for a while\n";
			break;
		case 9:
			LevelDisplay.guidanceText.text = "Well done!\n\nLet's go through all the rings\nin this level!\n";
			break;
		case 10:
			LevelDisplay.guidanceText.text = "Make sure you get them \nbefore your health runs out.\n\nHappy flying!!!\n";
			break;
	}
	LevelControls.isGuidanceShown = 1;
}