#pragma strict

var currentlevel = "";
var nextlevel = "";

function Start () {
	var level = PlayerPrefs.GetInt("currentlevel");
	var level2 = level + 1;
	if(level2 > 3)
		level2 = 3;
	currentlevel = "Level"+level;
	nextlevel = "Level"+level2;
}

function Update () {
	if((Input.GetMouseButtonDown(0)) || ((Input.touchCount > 0) && (Input.GetTouch(0).phase == TouchPhase.Began))) {
     var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
     var touchPos : Vector2 = new Vector2(wp.x, wp.y);
     var hit = Physics2D.OverlapPoint(touchPos);
      if(hit){
         var option = hit.transform.gameObject.name;
         if(option == "menubutton")
         	Application.LoadLevel("Levels");
         else if(option == "forwardbutton")
         	Application.LoadLevel(nextlevel);
         else if(option == "reloadbutton")
         	Application.LoadLevel(currentlevel);
      }
     }
}