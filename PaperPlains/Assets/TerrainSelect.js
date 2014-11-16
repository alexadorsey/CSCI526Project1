#pragma strict

function Start () {

}

function Update () {
	if((Input.GetMouseButtonDown(0)) || ((Input.touchCount > 0) && (Input.GetTouch(0).phase == TouchPhase.Began))) {
     var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
     var touchPos : Vector2 = new Vector2(wp.x, wp.y);
     var hit = Physics2D.OverlapPoint(touchPos);
      if(hit){
         var terrain = hit.transform.gameObject.name;
         
         if(terrain == "greenery")
         	Application.LoadLevel("Levels1");
         //if(level == "l2collider" && !(spriterender2.isVisible))
         if(terrain == "spooky")
         	Application.LoadLevel("Levels2");
         if(terrain == "rigid")
         	Application.LoadLevel("Levels3");	
        /* if(level == "l3collider")// && !(spriterender3.isVisible))
         	Application.LoadLevel("Level7");
         if(level == "l4collider" && !(spriterender4.isVisible))
         	Application.LoadLevel("Level2");
         if(level == "l5collider" && !(spriterender5.isVisible))
         	Application.LoadLevel("Level3");
         if(level == "l6collider" && !(spriterender6.isVisible))
         	Application.LoadLevel("Level5");
         if(level == "backbutton")*/
         if(terrain == "backbutton")
         {
         	Application.LoadLevel("Menu");
         }
     }
	}
}