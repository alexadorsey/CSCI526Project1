#pragma strict

var spriterender2 : SpriteRenderer;
var spriterender3 : SpriteRenderer;
var spriterender4 : SpriteRenderer;
var spriterender5 : SpriteRenderer;
var spriterender6 : SpriteRenderer;
var spriterender7 : SpriteRenderer;
var spriterender8 : SpriteRenderer;
var spriterender9 : SpriteRenderer;
var spriterender10 : SpriteRenderer;
var spriterender2nostar : SpriteRenderer;

function Start () {
	spriterender2 = GameObject.Find("l2locked").GetComponent(SpriteRenderer);
	spriterender3 = GameObject.Find("l3locked").GetComponent(SpriteRenderer);
	spriterender2nostar = GameObject.Find("l2nostar").GetComponent(SpriteRenderer);
	spriterender4 = GameObject.Find("l4locked").GetComponent(SpriteRenderer);
	spriterender5 = GameObject.Find("l5locked").GetComponent(SpriteRenderer);
	spriterender6 = GameObject.Find("l6locked").GetComponent(SpriteRenderer);
	spriterender7 = GameObject.Find("l7locked").GetComponent(SpriteRenderer);
	//spriterender8 = GameObject.Find("l8locked").GetComponent(SpriteRenderer);
	//spriterender9 = GameObject.Find("l9locked").GetComponent(SpriteRenderer);
	//spriterender10 = GameObject.Find("l10locked").GetComponent(SpriteRenderer);
	
	if(!(spriterender2.isVisible) && !(spriterender2nostar.isVisible))
	{
		spriterender3.enabled = false;
		GameObject.Find("l3nostar").GetComponent(SpriteRenderer).enabled = true;
	}
}

function Update () {
//if(Input.touchCount > 0) {
             //if(Input.GetTouch(0).phase == TouchPhase.Began){
  if((Input.GetMouseButtonDown(0)) || ((Input.touchCount > 0) && (Input.GetTouch(0).phase == TouchPhase.Began))) {
     //print("Inside Mouseclick");
     var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
     var touchPos : Vector2 = new Vector2(wp.x, wp.y);
     var hit = Physics2D.OverlapPoint(touchPos);
      if(hit){
      //Application.LoadLevel("Level0");
         print(hit.transform.gameObject.name);
         print(spriterender2.isVisible);
         var level = hit.transform.gameObject.name;
         
         if(level == "l1collider")
         	Application.LoadLevel("Level0");
         if(level == "l2collider" && !(spriterender2.isVisible))
         {
         	DontDestroyOnLoad(spriterender2);
         	DontDestroyOnLoad(spriterender3);
         	Application.LoadLevel("Level1");
         }
         if(level == "l3collider" && !(spriterender3.isVisible))
         	Application.LoadLevel("Level2");
         if(level == "l4collider" && !(spriterender4.isVisible))
         	Application.LoadLevel("Level3");
         if(level == "l5collider" && !(spriterender5.isVisible))
         	Application.LoadLevel("Level4");
         if(level == "l6collider" && !(spriterender6.isVisible))
         	Application.LoadLevel("Level5");
         if(level == "backbutton" && !(spriterender7.isVisible))
         	Application.LoadLevel("Menu");
     }
	}
	//}
}

function spriteobject (){
	//return GameObject.Find("l3locked").GetComponent(SpriteRenderer);
	return 1;
	}