#pragma strict
var bgMusic : GameObject;

function Start () {

}

function Update () {

}

function Awake() {
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
	bgMusic.audio.Play();
//	if (musicOn) {
//		//
//	} else {
//		bgMusic.audio.Stop();
//	}
	
	DontDestroyOnLoad(bgMusic);
	
}