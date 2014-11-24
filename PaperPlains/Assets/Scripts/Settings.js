//var BGMusic : BGMusic;
var bgMusic : GameObject;

var touch : SpriteRenderer;
var accelerometer : SpriteRenderer;
var onSE : SpriteRenderer;
var offSE : SpriteRenderer;
var onmusic : SpriteRenderer;
var offmusic : SpriteRenderer;

var controlsFontSize : float;
var OnOffColor = Color.blue;

var touchOn;
var soundEffectsOn;
var musicOn;



function Start(){

	bgMusic = GameObject.Find("BGMusic");

	if(PlayerPrefs.HasKey("touchOn")){
		touchOn = PlayerPrefs.GetInt("touchOn");
	} else {		
		PlayerPrefs.SetInt("touchOn", 0);
		touchOn = 0;
	}

	if(PlayerPrefs.HasKey("soundEffectsOn")){
		soundEffectsOn = PlayerPrefs.GetInt("soundEffectsOn");
	} else {
		PlayerPrefs.SetInt("soundEffectsOn", 1);	
		soundEffectsOn = 1;	
	}

	if(PlayerPrefs.HasKey("musicOn")){	
		musicOn = PlayerPrefs.GetInt("musicOn");	
	} else {
		PlayerPrefs.SetInt("musicOn", 1);
		musicOn = 1;
	}
	PlayerPrefs.Save();
	
	
	print("Music on: " + musicOn);
	
	touch = GameObject.Find("touch").GetComponent(SpriteRenderer);
	accelerometer = GameObject.Find("accelerometer").GetComponent(SpriteRenderer);
	onSE = GameObject.Find("OnSE").GetComponent(SpriteRenderer);
	offSE = GameObject.Find("OffSE").GetComponent(SpriteRenderer);
	onmusic = GameObject.Find("Onmusic").GetComponent(SpriteRenderer);
	offmusic = GameObject.Find("Offmusic").GetComponent(SpriteRenderer);
	
	if (musicOn) {
		onmusic.enabled = true;
		offmusic.enabled = false;
	} else {
		onmusic.enabled = false;
		offmusic.enabled = true;
	}
}


function Update() {
if((Input.GetMouseButtonDown(0)) || ((Input.touchCount > 0) && (Input.GetTouch(0).phase == TouchPhase.Began))) {
     var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
     var touchPos : Vector2 = new Vector2(wp.x, wp.y);
     var hit = Physics2D.OverlapPoint(touchPos);
      if(hit){
         var setting = hit.transform.gameObject.name;
         if(setting == "control collider")
         {
			if (touchOn) {
				touch.enabled = false;
				accelerometer.enabled = true;
				PlayerPrefs.SetInt("touchOn", 0);
				touchOn = 0;			
			} else {
				touch.enabled = true;
				accelerometer.enabled = false;
				PlayerPrefs.SetInt("touchOn", 1);	
				touchOn = 1;	
			}
			PlayerPrefs.Save();
        }
        
        if(setting == "SEcollider"){
				if (soundEffectsOn) {
					onSE.enabled = false;
					offSE.enabled = true;
					PlayerPrefs.SetInt("soundEffectsOn", 0);
					soundEffectsOn = 0;			
				} else {
					onSE.enabled = true;
					offSE.enabled = false;
					PlayerPrefs.SetInt("soundEffectsOn", 1);
					soundEffectsOn = 1;				
				}
				PlayerPrefs.Save();
        }
        
        if(setting == "musiccollider"){
				if (musicOn) {
					onmusic.enabled = false;
					offmusic.enabled = true;
					PlayerPrefs.SetInt("musicOn", 0);
					musicOn = 0;	
					bgMusic.audio.Pause();		
				} else {
					onmusic.enabled = true;
					offmusic.enabled = false;
					PlayerPrefs.SetInt("musicOn", 1);
					musicOn = 1;	
					bgMusic.audio.Play();			
				}
				PlayerPrefs.Save();
        }
        
        if(setting == "backbutton")
         	Application.LoadLevel("Menu");
    }
}
}


function Awake() {
	//DontDestroyOnLoad(bgMusic);
}