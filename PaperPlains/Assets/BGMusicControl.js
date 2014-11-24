#pragma strict
var bgMusic : GameObject;


function Update () {

}

// blah blah blah 
function Start() {
	print("in awake");
	bgMusic = GameObject.Find("BGMusic");
	print(bgMusic);
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
	
	print("music on: " + musicOn);
	
	if (musicOn) {
		bgMusic.audio.Play();
	}
	
	//bgMusic.audio.Play();
//	if (musicOn) {
//		//
//	} else {
//		bgMusic.audio.Stop();
//	}
	
	
	
}

function Awake() {
	DontDestroyOnLoad(bgMusic);
}