var LevelControls : LevelControls;
var LevelDisplay : LevelDisplay;


public var guidanceSetTimer:int;
public var guidanceSetDistance:int;
public var guidanceState: int;

private var paperPlane : GameObject;


function Start () {

	paperPlane = GameObject.Find("Plane");

	if (LevelControls.levelInt == 0) {
		LevelDisplay.guidanceText = GameObject.Find("Guidance").guiText;
		guidanceState = 1;//Start
		guidanceSetTimer = 115;
		guidanceSetDistance = 300;
		LevelDisplay.guidanceText.fontSize = Mathf.Floor(Screen.dpi/7);
		LevelDisplay.guidanceText.pixelOffset.y = 0;
		LevelDisplay.guidanceText.color = Color.black;
		LevelDisplay.guidanceText.text = "Welcome to the world of paper plains\n";
	}

}

function Update () {
	if (LevelControls.levelInt == 0) {
		if (!LevelControls.isGamePaused && !LevelControls.inCountdown) {
			if(guidanceState > 0) {
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
	LevelDisplay.guidanceText.enabled = false;
	LevelControls.UnPauseGame();	
	LevelControls.isGuidanceShown = 0;	
}



//Show guidance in tutorial level
function ShowGuidance(){
	print("Showing Guidance");
	LevelDisplay.guidanceText.enabled = true;
	guidanceSetTimer = 180;
	LevelControls.PauseGame(); 
	switch(guidanceState){
			case 1:
			LevelDisplay.guidanceText.text = "Welcome to the world of paper plains\n";
			break;
		case 2:
			LevelDisplay.guidanceText.text = "Controls:\nRotate your phone to turn left, right, up, or down\n";
			break;
		case 3:
			LevelDisplay.guidanceText.text = "But don't go crazy:\nHitting the terrain means game over\n";
			break;
		case 4:
			LevelDisplay.guidanceText.text = "Your Goal: Go through the rings!\nGet as many as possible in the limited time!\n";
			break;
		case 5:
			LevelDisplay.guidanceText.text = "Obstacles:\nHitting obstacles will damage your paper plane\n(you lose heart)\n";
			break;
		case 6:
			LevelDisplay.guidanceText.text = "Hearts:\nHeart items can replenish your heart loss\n";
			break;
		case 7:
			LevelDisplay.guidanceText.text = "Lightning:\nCollect a lightning item and press the\nlightning button to speed up\n";
			break;
		case 8:
			LevelDisplay.guidanceText.text = "Shields:\nThese will give you a shield against annoying obstacles\n";
			break;
		case 9:
			LevelDisplay.guidanceText.text = "Well done!\nLet's go through all the rings in this level!\n";
			break;
		case 10:
			LevelDisplay.guidanceText.text = "Make sure you get them before time is up. \nHappy flying!!!\n";
			break;
	}
	LevelControls.isGuidanceShown = 1;
}