#pragma strict

function Start () {

}

function Update () {
	if((Input.GetMouseButtonDown(0)) || ((Input.touchCount > 0) && (Input.GetTouch(0).phase == TouchPhase.Began))) {
     var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
     var touchPos : Vector2 = new Vector2(wp.x, wp.y);
     var hit = Physics2D.OverlapPoint(touchPos);
      if(hit){
         var menu = hit.transform.gameObject.name;
         
         if(menu == "start")
         	Application.LoadLevel("Levels");
         if(menu == "setting")
         	Application.LoadLevel("Settings");
         if(menu == "about")
         	//Application.LoadLevel("Levels3");	
     }
	}
}