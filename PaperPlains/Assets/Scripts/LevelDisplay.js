var LevelControls : LevelControls;

public var timeText : GUIText;
public var countdownText : GUIText;
public var pauseButton : GUITexture;
public var numRingsText : GUIText;
public var numRingsImage : GUITexture;
public var plusText : GUIText;
public var guidanceText: GUIText;
public var guidanceTexture :Texture2D;
public var boost : GUITexture;
private var plusTextWaitTime : float;

//textures for the health bar
public var maxHealthGUI: Texture;
public var curHealthGUI: Texture;


function Start() {

	// Pause Button
	pauseButton = (GameObject.Find("Pause Button").GetComponent(GUITexture)as GUITexture);
	pauseButton.pixelInset.width = 0.08 * Screen.width;
	pauseButton.pixelInset.height = pauseButton.pixelInset.width;
	pauseButton.pixelInset.position.x = Screen.width/2.5;
	pauseButton.pixelInset.position.x = -Screen.width/2 + 20;
	pauseButton.pixelInset.position.y = Screen.height/2.9;
		
	
	// Countdown
	countdownText = GameObject.Find("Countdown Text").guiText;
	countdownText.fontSize = Mathf.Floor(Screen.dpi/2);	
	
	// Timer
	timeText = GameObject.Find("Time").guiText;
	timeText.fontSize = Mathf.Floor(Screen.dpi/4);
	timeText.pixelOffset.y = -Screen.height/3 - 70;
	
	// Plus Text
	plusText = GameObject.Find("Plus Points Text").guiText;
	plusText.fontSize = Mathf.Floor(Screen.dpi/7);
	plusTextWaitTime = 0;
	// Hide plus text
	HidePlusText();
	
	// Rings Text & image
	numRingsImage = (GameObject.Find("Ring Count Image").GetComponent(GUITexture)as GUITexture);
	numRingsImage.color = Color(1.0, 0.4, 0.0, 1.0);
	numRingsText= GameObject.Find("Ring Count Text").guiText;
	numRingsText.text = LevelControls.numRings.ToString();
	numRingsText.color = Color(1.0, 0.68, 0.0, 1.0);
	
	//ring countdown text position
	numRingsText = GameObject.Find("Ring Count Text").guiText;
	numRingsText.pixelOffset.x = -Screen.width/2 + 125;
	//numRingsText.pixelOffset.y = Screen.height/2.4;
	numRingsText.pixelOffset.y = -Screen.height/3 - 70;
	numRingsText.fontSize = Mathf.Floor(Screen.dpi/6);
		
	// ring countdown image position
	numRingsImage.pixelInset.width = 0.04 * Screen.width;
	numRingsImage.pixelInset.height = numRingsImage.pixelInset.width;
	numRingsImage.pixelInset.x = -Screen.width/2 + 30;
	//numRingsImage.pixelInset.y = Screen.height/2.6;
	numRingsImage.pixelInset.y = -Screen.height/3 - 90;
	
	
	
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


function OnGUI()
{
	if( !LevelControls.isGamePaused )
	{
		//fixed max health bar
		GUI.DrawTexture(new Rect(Screen.width/4, 40, Screen.width/2/(LevelControls.maxHealth/LevelControls.maxHealth),50),maxHealthGUI, ScaleMode.StretchToFill);
	   	//current health bar
	  	//GUI.DrawTexture(new Rect(Screen.width/4, 40, Screen.width/2/(LevelControls.maxHealth/LevelControls.curHealth),50),curHealthGUI, ScaleMode.StretchToFill);
	  	if(LevelControls.curHealth < 20)
	  	{
	  		var msecs: int = Time.time * 1000;
	  		if ( msecs % 6 < 3) {
        		GUI.DrawTexture(new Rect(Screen.width/4, 40, Screen.width/2/(LevelControls.maxHealth/LevelControls.curHealth),50),curHealthGUI, ScaleMode.StretchToFill);
  			}
  		}
  		else
  			GUI.DrawTexture(new Rect(Screen.width/4, 40, Screen.width/2/(LevelControls.maxHealth/LevelControls.curHealth),50),curHealthGUI, ScaleMode.StretchToFill);
	}
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
