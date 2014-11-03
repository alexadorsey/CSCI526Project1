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

var touchOn;
var soundEffectsOn;
var musicOn;

function Start(){

	if(PlayerPrefs.HasKey("touchOn")){
		touchOn = PlayerPrefs.GetInt("touchOn");
	} else {		
		PlayerPrefs.SetInt("touchOn", 0);
	}

	if(PlayerPrefs.HasKey("soundEffectsOn")){
		soundEffectsOn = PlayerPrefs.GetInt("soundEffectsOn");
	} else {
		PlayerPrefs.SetInt("soundEffectsOn", 1);		
	}

	if(PlayerPrefs.HasKey("musicOn")){	
		musicOn = PlayerPrefs.GetInt("musicOn");	
	} else {
		PlayerPrefs.SetInt("musicOn", 1);
	}
	PlayerPrefs.Save();
	
	
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
		onOffControls.text = "Touch";
	} else {
		onOffControls.color = Color.black;
		onOffControls.text = "Accelerometer";
	}
	if (soundEffectsOn) {
		onOffSoundEffects.color = Color.black;
		onOffSoundEffects.text = "On";
	} else {
		onOffSoundEffects.color = Color.red;
		onOffSoundEffects.text = "Off";
	}
	if (musicOn) {
		onOffMusic.color = Color.black;
		onOffMusic.text = "On";
	} else {
		onOffMusic.color = Color.red;
		onOffMusic.text = "Off";
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
				PlayerPrefs.SetInt("touchOn", 0);			
			} else {
				onOffControls.color = Color.black;
				onOffControls.text = "Touch";
				PlayerPrefs.SetInt("touchOn", 1);		
			}
			PlayerPrefs.Save();
			Application.LoadLevel("AccTester");
		}
	}
	if(onOffSoundEffects.HitTest(Input.GetTouch(0).position)){			
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			if (soundEffectsOn) {
				onOffSoundEffects.color = Color.red;
				onOffSoundEffects.text = "Off";
				PlayerPrefs.SetInt("soundEffectsOn", 0);			
			} else {
				onOffSoundEffects.color = Color.black;
				onOffSoundEffects.text = "On";
				PlayerPrefs.SetInt("soundEffectsOn", 1);			
			}
			PlayerPrefs.Save();
		}
	}
	if(onOffMusic.HitTest(Input.GetTouch(0).position)){		
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			if (musicOn) {
				onOffMusic.color = Color.red;
				onOffMusic.text = "Off";
				PlayerPrefs.SetInt("musicOn", 0);		
			} else {
				onOffMusic.color = Color.black;
				onOffMusic.text = "On";
				PlayerPrefs.SetInt("musicOn", 1);		
			}
			PlayerPrefs.Save();
		}
	}
}