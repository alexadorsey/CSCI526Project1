#pragma strict

var currentlevel = "";
var nextlevel = "";
//public TextMesh buttonText;

function Start () {
	var level = PlayerPrefs.GetInt("currentlevel");
	var level2 = level + 1;
	if(level2 > 3)
		level2 = 3;
	currentlevel = "Level"+level;
	nextlevel = "Level"+level2;
	
	var buttonText = GameObject.Find("gameovertext").GetComponent(TextMesh);
	if(!(PlayerPrefs.HasKey("gameovertext")))
			PlayerPrefs.SetString("gameovertext", "You lost all your lives");
	
	buttonText.text = PlayerPrefs.GetString("gameovertext");
	
	var gameovertext = GameObject.Find("gameovertext").GetComponent(Renderer);
	gameovertext.sortingOrder = 2;
	print(gameovertext.sortingOrder);
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