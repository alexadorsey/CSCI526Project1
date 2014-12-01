#pragma strict

var title : GUIText;
var classT : GUIText;
var year : GUIText;
var members1 : GUIText;
var members2 : GUIText;

function Start() {
	title = (GameObject.Find("Title").GetComponent(GUIText)as GUIText);
	classT = (GameObject.Find("Class").GetComponent(GUIText)as GUIText);
	year = (GameObject.Find("Year").GetComponent(GUIText)as GUIText);
	members1 = (GameObject.Find("Members1").GetComponent(GUIText)as GUIText);
	members2 = (GameObject.Find("Members2").GetComponent(GUIText)as GUIText);
	
	title.fontSize = Screen.width * 0.05;
	classT.fontSize = Screen.width * 0.02;
	year.fontSize = Screen.width * 0.02;
	members1.fontSize = Screen.width * 0.027;
	members2.fontSize = Screen.width * 0.027;
	
	
}

function Update () {
  if((Input.GetMouseButtonDown(0)) || ((Input.touchCount > 0) && (Input.GetTouch(0).phase == TouchPhase.Began))) {
     var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
     var touchPos : Vector2 = new Vector2(wp.x, wp.y);
     var hit = Physics2D.OverlapPoint(touchPos);
      if(hit){
      var level = hit.transform.gameObject.name;
         if(level == "backbutton")
         	Application.LoadLevel("Menu");
     }
	}
}