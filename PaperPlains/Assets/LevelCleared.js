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
	var noofstars = PlayerPrefs.GetInt("noofstars");
	var star1 = GameObject.Find("star1").GetComponent(SpriteRenderer);
	var star2 = GameObject.Find("star2").GetComponent(SpriteRenderer);
	var star3 = GameObject.Find("star3").GetComponent(SpriteRenderer);
	if(noofstars == 1){
		star1.enabled = true;
		star2.enabled = false;
		star3.enabled = false;
	}
	if(noofstars == 2){
		star1.enabled = false;
		star2.enabled = true;
		star3.enabled = false;
	}
	if(noofstars == 3){
		star1.enabled = false;
		star2.enabled = false;
		star3.enabled = true;
	}
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