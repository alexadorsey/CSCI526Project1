#pragma strict

var LevelControls : LevelControls;
var LevelDisplay : LevelDisplay;

var currentlevel = "";
var nextlevel = "";

var pause : GameObject;
var playButton : GUITexture;
var menuButton : GUITexture;
var reloadButton : GUITexture;

function Start () {
	var level = PlayerPrefs.GetInt("currentlevel");
	var level2 = level + 1;
	if(level2 > 3)
		level2 = 3;
	currentlevel = "Level"+level;
	nextlevel = "Level"+level2;
	
	pause = GameObject.Find("pause");
	
	playButton = (GameObject.Find("PlayButton").GetComponent(GUITexture)as GUITexture);
	reloadButton = (GameObject.Find("ReloadButton").GetComponent(GUITexture)as GUITexture);
	menuButton = (GameObject.Find("MenuButton").GetComponent(GUITexture)as GUITexture);
	
	var buttonWidth = 0.09 * Screen.width;
	
	playButton.pixelInset.width = buttonWidth;
	playButton.pixelInset.height = buttonWidth;
	playButton.pixelInset.position.x = Screen.width/2 - buttonWidth/2 - 300;
	
	reloadButton.pixelInset.width = buttonWidth;
	reloadButton.pixelInset.height = buttonWidth;
	reloadButton.pixelInset.position.x = Screen.width/2 - buttonWidth/2;
	
	menuButton.pixelInset.width = buttonWidth;
	menuButton.pixelInset.height = buttonWidth;
	menuButton.pixelInset.position.x = Screen.width/2 - buttonWidth/2 + 300;
}

function Update() {
	if(Input.touchCount > 0) {
			for(var i = 0; i < Input.touchCount; ++i){
			
				// If hit play button
				if(playButton.HitTest(Input.GetTouch(0).position)){
					if(Input.GetTouch(0).phase == TouchPhase.Began){
						DestroyPause();
					}
				}
				
				// If hit menu button
				if(menuButton.HitTest(Input.GetTouch(0).position)){
					if(Input.GetTouch(0).phase == TouchPhase.Began){
						AudioListener.pause = false;
						Application.LoadLevel(currentlevel);
					}
				}
				
				// If hit reload button
				if(reloadButton.HitTest(Input.GetTouch(0).position)){
					if(Input.GetTouch(0).phase == TouchPhase.Began){
						AudioListener.pause = false;
						Application.LoadLevel("Levels");
					}
				}
			}
		}
		
	// On MouseOver
	if (playButton.HitTest(Input.mousePosition)) {
		DestroyPause();
	}
	if (reloadButton.HitTest(Input.mousePosition)) {
		Application.LoadLevel(currentlevel);
	}
	if (menuButton.HitTest(Input.mousePosition)) {
		Application.LoadLevel("Levels");
	}
}

function DestroyPause() {
  	Destroy(pause);
    Time.timeScale=1;	
	AudioListener.pause = false;
	Screen.sleepTimeout = SleepTimeout.NeverSleep;	
}

//function Update () {

	//print(playButton);
/*
	if (playButton) {
		 print("lets destroy");
        // Destroy(pause);
         print("destroyed");
//         LevelControls.isGamePaused = false;
         Time.timeScale=1;
//         	LevelControls.isGamePaused = false;
			
//			LevelDisplay.pauseButton.enabled = true;	
		AudioListener.pause = false;
		Screen.sleepTimeout = SleepTimeout.NeverSleep;
	}

*//*
	if((Input.GetMouseButtonDown(0)) || ((Input.touchCount > 0) && (Input.GetTouch(0).phase == TouchPhase.Began))) {
	print("inside touch");
	 var hit: RaycastHit;
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	if(Physics.Raycast(ray, hit)){
//	Vector2 pos = new Vector2(Input.mousePosition.x, Input.mousePosition.y);
//	RaycastHit2D hit = Physics2D.Raycast(Camera.main.ScreenToWorldPoint(pos), Vector2.zero);
//     var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
  //   var touchPos : Vector2 = new Vector2(wp.x, wp.y);
    // var hit = Physics2D.OverlapPoint(touchPos);
     print(hit);
     // if(hit){
         var option = hit.transform.gameObject.name;
 //        var option = "play";
         print(option);
         if(option == "menubutton")
         	Application.LoadLevel("Levels");
         else if(option == "play"){
         print("lets destroy");
         Destroy(pause);
         print("destroyed");
//         LevelControls.isGamePaused = false;
         Time.timeScale=1;
//         	LevelControls.isGamePaused = false;
			
//			LevelDisplay.pauseButton.enabled = true;	
			AudioListener.pause = false;
			Screen.sleepTimeout = SleepTimeout.NeverSleep;	
		}
         else if(option == "reloadbutton")
         	Application.LoadLevel(currentlevel);
      }
     }
    */
//}