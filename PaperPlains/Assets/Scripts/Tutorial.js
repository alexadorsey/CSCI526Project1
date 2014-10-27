var LevelControls : LevelControls;
var LevelDisplay : LevelDisplay;


public var guidanceSetTimer:int;
public var guidanceSetDistance:int;
public var guidanceState: int;


function Start () {

	//Tutorial Use
	LevelControls.isGuidanceShown = 0;
	if (LevelControls.levelInt == 0) {
		LevelDisplay.guidanceText = GameObject.Find("Guidance").guiText;
		guidanceState = 1;//Start
		guidanceSetTimer = 115;
		guidanceSetDistance = 300;
		LevelDisplay.guidanceText.fontSize = Mathf.Floor(Screen.dpi/7);
		LevelDisplay.guidanceText.pixelOffset.y = 0;
		LevelDisplay.guidanceText.color = Color.black;
		LevelDisplay.guidanceText.text = "Welcome to the world of paper plain\n";
	}

}

function Update () {
	if (LevelControls.levelInt == 0) {
		if(guidanceState > 0) {
			if(rigidbody.position.x > guidanceSetDistance){
				guidanceState++;				
				guidanceSetDistance += 300;
				if(guidanceState == 10){
					guidanceSetDistance = 99999;
				}
				ShowGuidance();
			}
		}
	}

}


function GuidanceTimer() {
	if(guidanceSetTimer>0){
		guidanceSetTimer --;
	} else {
		HideGuidance();
	}
}

function HideGuidance() {
	LevelDisplay.guidanceText.enabled = false;
	LevelControls.UnPauseGame();	
	LevelControls.isGuidanceShown = 0;	
}



//Show guidance in tutorial level
function ShowGuidance(){
	LevelDisplay.guidanceText.enabled = true;
	guidanceSetTimer = 180;
	LevelControls.PauseGame(); 
	switch(guidanceState){
			case 1:
			LevelDisplay.guidanceText.text ="Welcome to the world of paper plain\n";
			break;
		case 2:
			LevelDisplay.guidanceText.text = "Turn\n \nRotate your phone to turn left or right\n";
			break;
		case 3:
			LevelDisplay.guidanceText.text = "Going up \n \nYou can tap screen to fly up\n though there's a maximum height";
			break;
		case 4:
			LevelDisplay.guidanceText.text = "Targets: Go through the rings\n \nAs many rings as possible in the limited time!\n";
			break;
		case 5:
			LevelDisplay.guidanceText.text = "Obstacles\n \nHitting obstacles will damage your paper plane\n(you lose heart)\n";
			break;
		case 6:
			LevelDisplay.guidanceText.text = "Heart items\n \nHeart items can replenish your heart loss";
			break;
		case 7:
			LevelDisplay.guidanceText.text = "Lightning items\n \nLightning items can speed you up for a short time";
			break;
		case 8:
			LevelDisplay.guidanceText.text = "Shield items\n \nIt will give you a shield against annoying obstacles";
			break;
		case 9:
			LevelDisplay.guidanceText.text = "Well done\n \nLet's go through all the rings in this level! ";
			break;
		case 10:
			LevelDisplay.guidanceText.text = "Make sure you take all the rings before time is up. \nHappy flying!!!";
			break;
	}
	LevelControls.isGuidanceShown = 1;
}