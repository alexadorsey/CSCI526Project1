#pragma strict

var LevelControls : LevelControls;
var LevelDisplay : LevelDisplay;

var currentlevel = "";
var nextlevel = "";

var pause : GameObject;

function Start () {
	var level = PlayerPrefs.GetInt("currentlevel");
	var level2 = level + 1;
	if(level2 > 3)
		level2 = 3;
	currentlevel = "Level"+level;
	nextlevel = "Level"+level2;
	
	pause = GameObject.Find("pause");
	
}

function Update () {
	if((Input.GetMouseButtonDown(0)) || ((Input.touchCount > 0) && (Input.GetTouch(0).phase == TouchPhase.Began))) {
	print("inside touch");
     var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
     var touchPos : Vector2 = new Vector2(wp.x, wp.y);
     var hit = Physics2D.OverlapPoint(touchPos);
     print(hit);
      if(hit){
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
}