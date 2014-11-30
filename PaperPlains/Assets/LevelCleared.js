#pragma strict

var currentlevel = "";
var nextlevel = "";

function Start () {
	
	var level = PlayerPrefs.GetInt("currentlevel");
	var level2 = level + 1;
	if(level2 > 16)
		level2 = 16;
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
	
	//3d text update
	var timeText = GameObject.Find("timetext").GetComponent(TextMesh);
	var besttimeText = GameObject.Find("besttimetext").GetComponent(TextMesh);
	if(!(PlayerPrefs.HasKey("timetext")))
			PlayerPrefs.SetString("timetext", "0s");
	if(!(PlayerPrefs.HasKey("besttimetext")))
			PlayerPrefs.SetString("besttimetext", "150s");
	if(!(PlayerPrefs.HasKey("besttime1")))
			PlayerPrefs.SetFloat("besttime1", 150.0);
	if(!(PlayerPrefs.HasKey("besttime2")))
			PlayerPrefs.SetFloat("besttime2", 150.0);
	if(!(PlayerPrefs.HasKey("besttime3")))
			PlayerPrefs.SetFloat("besttime3", 150.0);
	if(!(PlayerPrefs.HasKey("besttime4")))
			PlayerPrefs.SetFloat("besttime4", 150.0);
	if(!(PlayerPrefs.HasKey("besttime5")))
			PlayerPrefs.SetFloat("besttime5", 150.0);
	if(!(PlayerPrefs.HasKey("besttime6")))
			PlayerPrefs.SetFloat("besttime6", 150.0);
	if(!(PlayerPrefs.HasKey("besttime7")))
			PlayerPrefs.SetFloat("besttime7", 150.0);
	if(!(PlayerPrefs.HasKey("besttime8")))
			PlayerPrefs.SetFloat("besttime8", 150.0);
	if(!(PlayerPrefs.HasKey("besttime9")))
			PlayerPrefs.SetFloat("besttime9", 150.0);
		if(!(PlayerPrefs.HasKey("besttime10")))
			PlayerPrefs.SetFloat("besttime10", 150.0);
	if(!(PlayerPrefs.HasKey("besttime11")))
			PlayerPrefs.SetFloat("besttime11", 150.0);
	if(!(PlayerPrefs.HasKey("besttime12")))
			PlayerPrefs.SetFloat("besttime12", 150.0);
	if(!(PlayerPrefs.HasKey("besttime13")))
			PlayerPrefs.SetFloat("besttime13", 150.0);
	
	timeText.text = PlayerPrefs.GetString("timetext");
	besttimeText.text = PlayerPrefs.GetString("besttimetext");
	
	var besttimetext = GameObject.Find("besttimetext").GetComponent(Renderer);
	besttimetext.sortingOrder = 2;
	
	var timetext = GameObject.Find("timetext").GetComponent(Renderer);
	timetext.sortingOrder = 2;
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