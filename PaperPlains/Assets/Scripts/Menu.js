var bgMusic : GameObject;

var paperPlains : GUIText;

var AvenirNextH : Font;

var startButtonStyle : GUIStyle;
var settingsButtonStyle : GUIStyle;
var aboutButtonStyle : GUIStyle;

function Start () {
	paperPlains = GameObject.Find("Paper Plains").guiText;	
	paperPlains.fontSize = Mathf.Floor(Screen.dpi/2.5);	
	paperPlains.transform.position = new Vector3(0.5,0.7,0);
	
	startButtonStyle = new GUIStyle();
    startButtonStyle.fontSize = Mathf.Floor(Screen.dpi/4);
    startButtonStyle.font = AvenirNextH;
    startButtonStyle.alignment = TextAnchor.MiddleCenter;
    startButtonStyle.normal.textColor = Color.white;
    
    settingsButtonStyle = new GUIStyle();
    settingsButtonStyle.fontSize = Mathf.Floor(Screen.dpi/4);
    settingsButtonStyle.font = AvenirNextH;
    settingsButtonStyle.alignment = TextAnchor.MiddleCenter;
    settingsButtonStyle.normal.textColor = Color.white; 
    
    aboutButtonStyle = new GUIStyle();
    aboutButtonStyle.fontSize = Mathf.Floor(Screen.dpi/4);
    aboutButtonStyle.font = AvenirNextH;
    aboutButtonStyle.alignment = TextAnchor.MiddleCenter;
    aboutButtonStyle.normal.textColor = Color.white;
}

function OnGUI(){
	var startButton = GUI.Button (Rect (Screen.width/2 - 50, Screen.height * 3/6, 200, 50), "START", startButtonStyle);
	if (startButton) {
		startButtonStyle.normal.textColor = Color.red;
		Application.LoadLevel("Levels");
    }
    
    var settingsButton = GUI.Button (Rect (Screen.width/2 - 50, Screen.height * 4/6 , 200, 50), "SETTINGS", settingsButtonStyle);
    if (settingsButton) {
    	settingsButtonStyle.normal.textColor = Color.yellow;
    	Application.LoadLevel("Settings");
    }
    

    if (GUI.Button (Rect (Screen.width/2 - 50, Screen.height * 5/6 , 200, 50), "ABOUT", aboutButtonStyle)) {
    	Application.LoadLevel("Levels");

    }
}

function Awake() {
	bgMusic = GameObject.Find("BGMusic");
	var musicOn;
	var soundEffectsOn;
	if(PlayerPrefs.HasKey("soundEffectsOn")){
		soundEffectsOn = PlayerPrefs.GetInt("soundEffectsOn");
	} else {
		PlayerPrefs.SetInt("soundEffectsOn", 1);		
	}

	if(PlayerPrefs.HasKey("musicOn")){	
		musicOn = PlayerPrefs.GetInt("musicOn");	
	} else {
		PlayerPrefs.SetInt("musicOn", 1);
		bgMusic.audio.Play();
		musicOn = 1;
	}
	PlayerPrefs.Save();
	
//	if (musicOn) {
//		//
//	} else {
//		bgMusic.audio.Stop();
//	}
	
	DontDestroyOnLoad(bgMusic);
	
}