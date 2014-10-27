var LevelControls : LevelControls;

public var timeText : GUIText;
public var countdownText : GUIText;
public var pauseButton : GUITexture;
public var numRingsText : GUIText;
public var numRingsImage : GUITexture;
public var heart1 : GUITexture;
public var heart2 : GUITexture;
public var heart3 : GUITexture;
public var plusText : GUIText;
public var guidanceText: GUIText;
public var guidanceTexture :Texture2D;
public var boost : GUITexture;
private var plusTextWaitTime : float;


// Colors
private var heart_enabled : Color = Color(1.0, 0.0, 0.0, 1.0);


function Start() {

	// Pause Button
	pauseButton = (GameObject.Find("Pause Button").GetComponent(GUITexture)as GUITexture);
	pauseButton.pixelInset.width = 0.08 * Screen.width;
	pauseButton.pixelInset.height = pauseButton.pixelInset.width;
	pauseButton.pixelInset.position.x = Screen.width/2.5;
	pauseButton.pixelInset.position.y = Screen.height/2.9;
	
	// Countdown
	countdownText = GameObject.Find("Countdown Text").guiText;
	countdownText.fontSize = Mathf.Floor(Screen.dpi/2);	
	
	// Timer
	timeText = GameObject.Find("Time").guiText;
	timeText.fontSize = Mathf.Floor(Screen.dpi/4);
	timeText.pixelOffset.y = -Screen.height/3 - 70;
	
	// Hearts
	heart1 = (GameObject.Find("heart1").GetComponent(GUITexture)as GUITexture);
	heart2 = (GameObject.Find("heart2").GetComponent(GUITexture)as GUITexture);
	heart3 = (GameObject.Find("heart3").GetComponent(GUITexture)as GUITexture);
	heart1.color = heart_enabled;
	heart2.color = heart_enabled;
	heart3.color = heart_enabled;
	heart1.pixelInset.width = 0.05 * Screen.width;
	heart1.pixelInset.height = heart1.pixelInset.width;
	heart2.pixelInset.width = heart1.pixelInset.width;
	heart2.pixelInset.height = heart1.pixelInset.width;
	heart3.pixelInset.width = heart1.pixelInset.width;
	heart3.pixelInset.height = heart1.pixelInset.width;
	
	heart1.pixelInset.position.x = -heart2.pixelInset.width * 2 -heart1.pixelInset.width/2 + 40;
	heart2.pixelInset.position.x = -heart1.pixelInset.width/2;
	heart3.pixelInset.position.x = heart2.pixelInset.width * 2 -heart1.pixelInset.width/2 - 40;
	
	heart1.pixelInset.y = Screen.height/3 + 40;
	heart2.pixelInset.y = heart1.pixelInset.y;
	heart3.pixelInset.y = heart1.pixelInset.y;
	
	
	// Plus Text
	plusText = GameObject.Find("Plus Points Text").guiText;
	plusText.fontSize = Mathf.Floor(Screen.dpi/7);
	plusTextWaitTime = 0;
	// Hide plus text
	HidePlusText();
	
	
	// Rings Text & image
	numRingsImage = (GameObject.Find("Ring Count Image").GetComponent(GUITexture)as GUITexture);
	numRingsImage.color = Color(1.0, 0.68, 0.0, 1.0);
	numRingsText= GameObject.Find("Ring Count Text").guiText;
	numRingsText.text = LevelControls.numRings.ToString();
	numRingsText.color = Color(1.0, 0.68, 0.0, 1.0);
	
	//ring countdown text position
	numRingsText = GameObject.Find("Ring Count Text").guiText;
	numRingsText.pixelOffset.x = -Screen.width/2 + 115;
	numRingsText.pixelOffset.y = Screen.height/2.4;
	numRingsText.fontSize = Mathf.Floor(Screen.dpi/6);
	
	// ring countdown image position
	numRingsImage.pixelInset.width = 0.04 * Screen.width;
	numRingsImage.pixelInset.height = numRingsImage.pixelInset.width;
	numRingsImage.pixelInset.x = -Screen.width/2 + 20;
	numRingsImage.pixelInset.y = Screen.height/2.6;
	
	
	// Speed Boost Button
//	boost = (GameObject.Find("boost").GetComponent(GUITexture)as GUITexture);
//	boost.pixelInset.width = 0.08 * Screen.width;
//	boost.pixelInset.height = boost.pixelInset.width;
//	boost.pixelInset.position.x = -Screen.width/3 - 110;;
//	boost.pixelInset.y = Screen.height/2.9;
//	boost.enabled = false;
	boost = (GameObject.Find("boost").GetComponent(GUITexture)as GUITexture);
	boost.pixelInset.width = 0.06 * Screen.width;
	boost.pixelInset.height = boost.pixelInset.width;
	boost.pixelInset.position.x = Screen.width/2.43;
	boost.pixelInset.position.y = Screen.height/4.8;
	boost.enabled = false;
}



// Shows "+1 life" next to player
function ShowPlusText(plusValue : String){
	plusText.enabled = false;
	plusText.text = plusValue;
	plusText.enabled = true;
	plusTextWaitTime += 1.5;
	yield WaitForSeconds(plusTextWaitTime);
	HidePlusText();
}
function HidePlusText(){
	plusText.enabled = false;
	plusTextWaitTime = 0;
}
