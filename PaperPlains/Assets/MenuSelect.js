#pragma strict

var bgMusic : GameObject;

function Start () {

	var musicOn;

	if(PlayerPrefs.HasKey("musicOn")){	
		musicOn = PlayerPrefs.GetInt("musicOn");	
	} else {
		PlayerPrefs.SetInt("musicOn", 1);
		musicOn = 1;
	}
	PlayerPrefs.Save();
	
	bgMusic = GameObject.Find("BGMusic");
	if (musicOn) {
		bgMusic.audio.Play();
	}



}

function Update () {
	if((Input.GetMouseButtonDown(0)) || ((Input.touchCount > 0) && (Input.GetTouch(0).phase == TouchPhase.Began))) {
     var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
     var touchPos : Vector2 = new Vector2(wp.x, wp.y);
     var hit = Physics2D.OverlapPoint(touchPos);
      if(hit){
         var menu = hit.transform.gameObject.name;
         
         if(menu == "plainbasestart")
         	Application.LoadLevel("Levels");
         if(menu == "plainbasesetting")
         	Application.LoadLevel("Settings");
         if(menu == "plainbaseabout")
         	Application.LoadLevel("About");
         if(menu == "plainbasetutorial")
         	Application.LoadLevel("tutorial");	
         //if(menu == "about")
         	//Application.LoadLevel("Levels3");	
     }
	}
}

