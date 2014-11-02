var settings : GUIText;
var controls : GUIText;
var soundEffects : GUIText;
var music : GUIText;
var onOffControls : GUIText;
var onOffSoundEffects : GUIText;
var onOffMusic : GUIText;
var backButton : GUITexture;

var controlsFontSize : float;
var OnOffColor = Color.blue;

var touchControl = true;
var touchOn = true;
var soundEffectsOn = true;
var musicOn = true;

function Start(){

	backButton = (GameObject.Find("BackButton").GetComponent(GUITexture)as GUITexture);
	backButton.pixelInset.width = 0.1 * Screen.width;
	backButton.pixelInset.height = backButton.pixelInset.width;

	settings = GameObject.Find("Settings").guiText;
	settings.fontSize = Mathf.Floor(Screen.dpi/2);
	
	controlsFontSize = Mathf.Floor(Screen.dpi/5);
	controls = GameObject.Find("Controls").guiText;
	controls.fontSize = controlsFontSize;
	
	soundEffects = GameObject.Find("Sound Effects").guiText;
	soundEffects.fontSize = controlsFontSize;
	
	music = GameObject.Find("Music").guiText;
	music.fontSize = controlsFontSize;
	
	
	onOffControls = GameObject.Find("OnOffControls").guiText;
	onOffControls.fontSize = controlsFontSize;
	
	onOffSoundEffects = GameObject.Find("OnOffSoundEffects").guiText;
	onOffSoundEffects.fontSize = controlsFontSize;
	
	onOffMusic = GameObject.Find("OnOffMusic").guiText;
	onOffMusic.fontSize = controlsFontSize;	
	
	
	// Set the on/off colors
	if (touchOn) {
		onOffControls.color = Color.black;
	} else {
		onOffControls.color = Color.black;
	}
	if (soundEffectsOn) {
		onOffSoundEffects.color = Color.black;
	} else {
		onOffSoundEffects.color = Color.red;
	}
	if (soundEffectsOn) {
		onOffMusic.color = Color.black;
	} else {
		onOffMusic.color = Color.red;
	}
}


function Update() {

	if(backButton.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			if(TouchPhase.Ended){
				Application.LoadLevel("Menu");
			}
		}
	}

	if(onOffControls.HitTest(Input.GetTouch(0).position)){		
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			if (touchOn) {
				onOffControls.color = Color.black;
				onOffControls.text = "Accelerometer";
				touchOn = false;				
			} else {
				onOffControls.color = Color.black;
				onOffControls.text = "Touch";
				touchOn = true;				
			}
		}
	}
	if(onOffSoundEffects.HitTest(Input.GetTouch(0).position)){			
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			if (soundEffectsOn) {
				onOffSoundEffects.color = Color.red;
				onOffSoundEffects.text = "Off";
				soundEffectsOn = false;				
			} else {
				onOffSoundEffects.color = Color.black;
				onOffSoundEffects.text = "On";
				soundEffectsOn = true;				
			}
		}
	}
	if(onOffMusic.HitTest(Input.GetTouch(0).position)){		
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			if (musicOn) {
				onOffMusic.color = Color.red;
				onOffMusic.text = "Off";
				musicOn = false;				
			} else {
				onOffMusic.color = Color.black;
				onOffMusic.text = "On";
				musicOn = true;				
			}
		}
	}
}