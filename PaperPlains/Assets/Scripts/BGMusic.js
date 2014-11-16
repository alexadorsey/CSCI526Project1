//var Menu : Menu;
//
//var soundEffectsOn;
//var musicOn;
//
//function Start () {
//
//	bgMusic = Menu.bgMusic;
//}
//
//function Update () {
//
//}
//
//function Awake() {
//	if(PlayerPrefs.HasKey("soundEffectsOn")){
//		soundEffectsOn = PlayerPrefs.GetInt("soundEffectsOn");
//	} else {
//		PlayerPrefs.SetInt("soundEffectsOn", 1);		
//	}
//
//	if(PlayerPrefs.HasKey("musicOn")){	
//		musicOn = PlayerPrefs.GetInt("musicOn");	
//	} else {
//		PlayerPrefs.SetInt("musicOn", 1);
//		musicOn = 1;
//	}
//	
//	
//	if (musicOn) {
//		PlayBGMusic();
//	} else {
//		StopBGMusic();
//	}
//	DontDestroyOnLoad(bgMusic);
//	
//}
//
//function StopBGMusic() {
//	bgMusic.audio.Stop();
//}
//
//function PlayBGMusic() {
//	bgMusic.audio.Play();
//}