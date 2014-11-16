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
var spriterender1nostar : SpriteRenderer;
var spriterender3nostar : SpriteRenderer;
var spriterender4nostar : SpriteRenderer;
var spriterender5nostar : SpriteRenderer;
var spriterender6nostar : SpriteRenderer;
var spriterender7nostar : SpriteRenderer;

//player saved data

var unlocked;
var flag : int;
var level1;
var level2;
var level3;
var level4;
var level5;
var level6;
var level7;

function Start () {
	spriterender1nostar = GameObject.Find("l1nostar").GetComponent(SpriteRenderer);
	spriterender2 = GameObject.Find("l2locked").GetComponent(SpriteRenderer);
	spriterender2nostar = GameObject.Find("l2nostar").GetComponent(SpriteRenderer);
	spriterender3 = GameObject.Find("l3locked").GetComponent(SpriteRenderer);
	spriterender3nostar = GameObject.Find("l3nostar").GetComponent(SpriteRenderer);
	spriterender4 = GameObject.Find("l4locked").GetComponent(SpriteRenderer);
	//spriterender4nostar = GameObject.Find("l4nostar").GetComponent(SpriteRenderer);
	spriterender5 = GameObject.Find("l5locked").GetComponent(SpriteRenderer);
	spriterender6 = GameObject.Find("l6locked").GetComponent(SpriteRenderer);
	spriterender7 = GameObject.Find("l7locked").GetComponent(SpriteRenderer);
	//spriterender8 = GameObject.Find("l8locked").GetComponent(SpriteRenderer);
	//spriterender9 = GameObject.Find("l9locked").GetComponent(SpriteRenderer);
	//spriterender10 = GameObject.Find("l10locked").GetComponent(SpriteRenderer);
	
	if(!(PlayerPrefs.HasKey("flag")))
			PlayerPrefs.SetInt("flag", 0);
	flag = PlayerPrefs.GetInt("flag");
	print(flag);
	if(flag == 0)
	{
		PlayerPrefs.SetInt("unlockedspooky", 1);
		PlayerPrefs.SetString("level1", "nostar");
		PlayerPrefs.SetString("level2", "nostar");
		PlayerPrefs.SetString("level3", "nostar");
		PlayerPrefs.SetString("level4", "nostar");
		PlayerPrefs.SetString("level5", "nostar");
		PlayerPrefs.SetString("level6", "nostar");
		PlayerPrefs.SetString("level7", "nostar");
		PlayerPrefs.SetString("level8", "nostar");
		PlayerPrefs.SetString("level9", "nostar");
		PlayerPrefs.SetString("level10", "nostar");
		PlayerPrefs.SetInt("flag", 1);
	}
		
		
	EnableSprites(1, PlayerPrefs.GetString("level4"));
	EnableSprites(2, PlayerPrefs.GetString("level5"));
	print("in level select");
	print(PlayerPrefs.GetString("level3"));
	EnableSprites(3, PlayerPrefs.GetString("level6"));
	/*EnableSprites(4, PlayerPrefs.GetString("level4"));
	EnableSprites(5, PlayerPrefs.GetString("level5"));
	EnableSprites(6, PlayerPrefs.GetString("level6"));
	EnableSprites(7, PlayerPrefs.GetString("level7"));/
	
	/*unlocked = PlayerPrefs.GetInt("unlocked");
	if((unlocked == 1) && !(spriterender1nostar.isVisible))
	{
		spriterender2.enabled = false;
		GameObject.Find("l2nostar").GetComponent(SpriteRenderer).enabled = true;
	}
	
	if((unlocked == 2 && !(spriterender2.isVisible) && !(spriterender2nostar.isVisible)))
	{
		spriterender3.enabled = false;
		GameObject.Find("l3nostar").GetComponent(SpriteRenderer).enabled = true;
	}*/
}

function Update () {
  if((Input.GetMouseButtonDown(0)) || ((Input.touchCount > 0) && (Input.GetTouch(0).phase == TouchPhase.Began))) {
     var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
     var touchPos : Vector2 = new Vector2(wp.x, wp.y);
     var hit = Physics2D.OverlapPoint(touchPos);
      if(hit){
         var level = hit.transform.gameObject.name;
         var loading : SpriteRenderer;
         if(level == "l1collider")
         {
         	loading = GameObject.Find("loading").GetComponent(SpriteRenderer);
         	loading.enabled = true;
         	Application.LoadLevel("Level4");
         }
         //if(level == "l2collider" && !(spriterender2.isVisible))
         if(level == "l2collider")
         {
            loading = GameObject.Find("loading").GetComponent(SpriteRenderer);
         	loading.enabled = true;
         	Application.LoadLevel("Level5");
         }
         if(level == "l3collider")// && !(spriterender3.isVisible))
         {
         	loading = GameObject.Find("loading").GetComponent(SpriteRenderer);
         	loading.enabled = true;
         	Application.LoadLevel("Level6");
         }
         	
         if(level == "l4collider" && !(spriterender4.isVisible))
         {
         	loading = GameObject.Find("loading").GetComponent(SpriteRenderer);
         	loading.enabled = true;
         	Application.LoadLevel("Level4");
         }
         if(level == "l5collider" && !(spriterender5.isVisible))
         {
         	loading = GameObject.Find("loading").GetComponent(SpriteRenderer);
         	loading.enabled = true;
         	Application.LoadLevel("Level5");
         }
         if(level == "l6collider" && !(spriterender6.isVisible))
         {
         	loading = GameObject.Find("loading").GetComponent(SpriteRenderer);
         	loading.enabled = true;
         	Application.LoadLevel("Level6");
         }
         if(level == "l7collider" && !(spriterender6.isVisible))
         {
         	loading = GameObject.Find("loading").GetComponent(SpriteRenderer);
         	loading.enabled = true;
         	Application.LoadLevel("Level7");
         }
         if(level == "l8collider" && !(spriterender6.isVisible))
         {
         	loading = GameObject.Find("loading").GetComponent(SpriteRenderer);
         	loading.enabled = true;
         	Application.LoadLevel("Level8");
         }
         if(level == "l9collider" && !(spriterender6.isVisible))
         {
         	loading = GameObject.Find("loading").GetComponent(SpriteRenderer);
         	loading.enabled = true;
         	Application.LoadLevel("Level9");
         }
         if(level == "backbutton")
         	Application.LoadLevel("Levels");
     }
	}
}

function spriteobject (){
	//return GameObject.Find("l3locked").GetComponent(SpriteRenderer);
	return 1;
	}

function EnableSprites(level:int, stars){
var s1 = "l";
	//var sprite = s1.Concat(level,stars);
	var sprite = s1+level+stars;
	var lockedsprite = s1+level+"locked";
	//int l = level;
	print(lockedsprite);
	print(sprite);
	var lev = PlayerPrefs.GetInt("unlockedspooky");
	print("unlockedspooky");
	print(lev);
	if((level) <= lev)
	{
		print("Inside");
		var spriterender = GameObject.Find(sprite).GetComponent(SpriteRenderer);
		spriterender.enabled = true;
		//if(level > 1)
		//{
			spriterender = GameObject.Find(lockedsprite).GetComponent(SpriteRenderer);
			spriterender.enabled = false;
		//}
	}
	
}