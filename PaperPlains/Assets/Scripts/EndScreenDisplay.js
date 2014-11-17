var LevelControls : LevelControls;

public var gameEndTextStyle : GUIStyle;
public var reasonTextStyle : GUIStyle;
public var yourUsedTimeTextStyle : GUIStyle;
public var endStar : Texture2D;

var overlay : Texture2D;
var AvenirNextUL : Font;
var AvenirNextHeavy : Font;
var AvenirNextMedium : Font;
//var unlockedlevel :int;

var backButton : Texture2D;
var nextButton : Texture2D;
var replayButton : Texture2D;
var playButton : Texture2D;

//Store best time for each level
public var bestTimeL0 : float;
public var bestTimeL1 : float;
public var bestTimeL2 : float;
public var bestTimeL3 : float;
public var bestTimeL4 : float;
public var bestTime: float;

// Colors
private var gameStartColor : Color = Color(0.0, 0.0, 0.0, 0.6);
private var gameOverColor : Color = Color(0.0, 0.0, 0.36, 1.0);
private var gameWonColor : Color = Color(0.1, 0.5, 0.1, 1.0);
private var gamePauseColor : Color = Color(0.3, 0.0, 0.4, 1.0);

	var spriterender2 : SpriteRenderer;
	var spriterender3 : SpriteRenderer;
	var spriterender4 : SpriteRenderer;
	var spriterender5 : SpriteRenderer;
	var spriterender6 : SpriteRenderer;
	var spriterender7 : SpriteRenderer;
	var spriterender8 : SpriteRenderer;
	var spriterender9 : SpriteRenderer;
	var spriterender10 : SpriteRenderer;

function Start() {
	// Styles
	gameEndTextStyle = new GUIStyle();
    gameEndTextStyle.fontSize = Mathf.Floor(Screen.dpi/2.5);
    gameEndTextStyle.font = AvenirNextUL;
    gameEndTextStyle.alignment = TextAnchor.MiddleCenter;
    gameEndTextStyle.normal.textColor = Color.white;
	
	reasonTextStyle = new GUIStyle();
    reasonTextStyle.fontSize = Mathf.Floor(Screen.dpi/6.5);
    reasonTextStyle.font = AvenirNextUL;
    reasonTextStyle.alignment = TextAnchor.MiddleCenter;
    reasonTextStyle.normal.textColor = Color.white;
    
    yourUsedTimeTextStyle = new GUIStyle();
    yourUsedTimeTextStyle.fontSize = Mathf.Floor(Screen.dpi/5.5);
    yourUsedTimeTextStyle.font = AvenirNextUL;
    yourUsedTimeTextStyle.alignment = TextAnchor.MiddleCenter;
    yourUsedTimeTextStyle.normal.textColor = Color.white;	
}



function OnGUI(){
	if (LevelControls.isGamePaused) {
		if (LevelControls.isGuidanceShown == 0 && !LevelControls.isGameOver && !LevelControls.isGameWon) {
			//ShowPause();
		}		
	}
	if (LevelControls.isGameOver) {
		ShowGameOver();
	}
	if (LevelControls.isGameWon) {
		ShowGameWon();
	}
}



// Overlay & text shown at game over and game won screens
function ShowPause(){
	ShowOverlay(gamePauseColor);
	GUI.color = Color.white;
	GUI.Label(Rect (Screen.width/2-50, Screen.height/3, 100, 50), "PAUSED", gameEndTextStyle);

	ShowBackButton();
	ShowReplayButton();
	ShowPlayButton();
}

function ShowGameWon(){
	/*ShowOverlay(gameWonColor);
	GUI.color = Color(1.0, 0.68, 0.0, 1.0);
	GUI.Label(Rect (Screen.width/2-50, Screen.height/4, 100, 50), "LEVEL COMPLETE", gameEndTextStyle);
	GUI.color = Color.white;
	GUI.Label(Rect (Screen.width/2-50, Screen.height/2.6, 100, 50), "You collected all the rings!", reasonTextStyle);
	
	ShowBackButton();
	ShowReplayButton();
	ShowNextButton();*/
	DrawTimeAndStars();
	
	//LevelCleared();
	

	//Application.LoadLevel("LevelCleared");
}

function ShowGameOver(){
	ShowOverlay(gameOverColor);
	GUI.color = Color(1.0, 0.68, 0.0, 1.0);
	GUI.Label(Rect (Screen.width/2-50, Screen.height/4, 100, 50), "GAME OVER", gameEndTextStyle);
	GUI.color = Color.white;
	if (LevelControls.lostAllLives) {
		GUI.Label(Rect (Screen.width/2-50, Screen.height/2.5, 100, 50), "You lost all your lives!", reasonTextStyle);
	}  else {
		if (LevelControls.isTimeUp) {
			GUI.Label(Rect (Screen.width/2-50, Screen.height/2.6, 100, 50), "Time is up!", reasonTextStyle);
		}  else {
			GUI.Label(Rect (Screen.width/2-50, Screen.height/2.6, 100, 50), "You hit the terrain!", reasonTextStyle);
		}
	}
		
	ShowBackButton();
	ShowReplayButton();
	ShowNextButton();
	DrawTimeAndStars();
}
	



function ShowBackButton(){
	GUI.color = Color.white;
	if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) - Screen.width * 0.13 ,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), backButton, GUIStyle.none)) {
        AudioListener.pause = false;
        Application.LoadLevel("Levels");
    }
}

function ShowReplayButton(){
	GUI.color = Color.white;
	if (GUI.Button (Rect (Screen.width/2 - 0.1 * Screen.width/2,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), replayButton, GUIStyle.none)) {
		LevelControls.RestartLevel();
	}
}

function ShowNextButton() {
	GUI.color = Color.white;
	if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) + Screen.width * 0.13,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), nextButton, GUIStyle.none)) {
		LevelControls.LoadNextLevel();       		
	}
}

function ShowPlayButton(){
	GUI.color = Color.white;
	if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) + Screen.width * 0.13,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), playButton, GUIStyle.none)) {
        LevelControls.UnPauseGame();
    }		
}

function ShowOverlay(color){
	GUI.color = color;
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), overlay);
}

function DrawTimeAndStars(){
	var usedTime = LevelControls.totalTime - LevelControls.timer;
	var secs: int = usedTime % 60;
	var mins: int = usedTime / 60;
	var usedTimeString = "";
	if (mins > 0) {
		usedTimeString = mins.ToString() + " min " + secs.ToString() + " sec";
	}  else {
		usedTimeString = secs.ToString() + " sec";
	}
	//var usedTimeString = String.Format("{0:0}:{1:00}", mins, secs);
		
	//GUI.Label(Rect (Screen.width*1/3 - 150, Screen.height/2, 100, 50), "Time Elapsed: ", yourUsedTimeTextStyle);
	//GUI.Label(Rect (Screen.width/2, Screen.height/2, 100, 50),  usedTimeString, yourUsedTimeTextStyle);
	
	//load best time of a certain level
	var level = "bestTimeL" + LevelControls.levelInt;
	//PlayerPrefs.DeleteAll();
	if(PlayerPrefs.HasKey(level)){
		bestTime = PlayerPrefs.GetFloat(level);
	} else {
		if (!LevelControls.isGameOver){
			print("used time: " + usedTime);
			bestTime = usedTime;
		} else {
			bestTime = -1;
		}
	}
		
	var bestTimeString = "";
	if (bestTime == -1) {
		bestTimeString = "---";
	} else {
		if(!LevelControls.isGameOver && usedTime <= bestTime) {			
			PlayerPrefs.SetFloat(level,usedTime);
			PlayerPrefs.Save();
		}
		bestTime = PlayerPrefs.GetFloat(level);
			
		var bsecs: int = bestTime % 60;
		var bmins: int = bestTime / 60;
		
		if (bmins > 0) {
			bestTimeString = bmins.ToString() + " min " + bsecs.ToString() + " sec";
		}  else {
			bestTimeString = bsecs.ToString() + " sec";
		}
	}
	
	
	//GUI.Label(Rect (Screen.width*1/3 - 150, Screen.height/1.7, 100, 50), "Best Time: ", yourUsedTimeTextStyle);
//	GUI.Label(Rect (Screen.width/2, Screen.height/1.7, 100, 50), bestTimeString , yourUsedTimeTextStyle);


	// Draw stars depending on the time
	if (!LevelControls.isGameOver){
		var unlockedlevel = 0;
		GUI.color = Color(1.0, 0.68, 0.0, 1.0);
		var a = LevelControls.levelInt;
		var levelh = "level"+a;
		var stars = PlayerPrefs.GetString(levelh);
		unlockedlevel = LevelControls.levelInt+1;
		PlayerPrefs.SetInt("currentlevel", a);
		//print(levelh);
		// Stars for used time
		if (usedTime <= LevelControls.totalTime  && usedTime > (LevelControls.totalTime / 4) * 3 ) {
			//GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
			if(stars == "nostar") {
				if(LevelControls.levelInt<=3)
					PlayerPrefs.SetInt("unlocked", unlockedlevel);
				else if(LevelControls.levelInt>3 && LevelControls.levelInt<=6)
					PlayerPrefs.SetInt("unlockedspooky", (unlockedlevel-3));
				else 
					PlayerPrefs.SetInt("unlockedMoon", (unlockedlevel-6));
			}
			if(!(stars == "2star") && !(stars == "3star"))
				PlayerPrefs.SetString(levelh, "1star");
			PlayerPrefs.SetInt("noofstars", 1);	
			Application.LoadLevel("LevelCleared");
		}
		else if (usedTime <= (LevelControls.totalTime / 4) * 3 && usedTime > LevelControls.totalTime/2) {
			//GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
			//GUI.DrawTexture(Rect(Screen.width*2/3 - 130, Screen.height/2, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
			if(stars == "nostar") {
				if(LevelControls.levelInt<=3)
					PlayerPrefs.SetInt("unlocked", unlockedlevel);
				else if(LevelControls.levelInt>3 && LevelControls.levelInt<=6)
					PlayerPrefs.SetInt("unlockedspooky", (unlockedlevel-3));
				else 
					PlayerPrefs.SetInt("unlockedMoon", (unlockedlevel-6));
			}
			if(!(stars == "3star"))
				PlayerPrefs.SetString(levelh, "2star");
				
			PlayerPrefs.SetInt("noofstars", 2);	
			Application.LoadLevel("LevelCleared");
		}  else if (usedTime <= LevelControls.totalTime / 2 ) {
			//GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
			//GUI.DrawTexture(Rect(Screen.width*2/3 + 260, Screen.height/2, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
			//GUI.DrawTexture(Rect(Screen.width*2/3 + 130, Screen.height/2, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
			if(stars == "nostar") {
				if(LevelControls.levelInt<=3)
					PlayerPrefs.SetInt("unlocked", unlockedlevel);
				else if(LevelControls.levelInt>3 && LevelControls.levelInt<=6)
					PlayerPrefs.SetInt("unlockedspooky", (unlockedlevel-3));
				else 
					PlayerPrefs.SetInt("unlockedMoon", (unlockedlevel-6));
			}
			//print("pushing stars");
		//	print(levelh);
			PlayerPrefs.SetString(levelh, "3star");
			PlayerPrefs.SetInt("noofstars", 3);	
			Application.LoadLevel("LevelCleared");
		//	print(PlayerPrefs.GetString("level3"));
		}
	}
	
	if (bestTime != -1) {	
		// Stars for best time
		GUI.color = Color.blue;
		if (bestTime <= LevelControls.totalTime  && bestTime > (LevelControls.totalTime / 4) * 3 ) {
			GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/1.7, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
		}
		else if (bestTime <= (LevelControls.totalTime / 4) * 3 && usedTime > LevelControls.totalTime/2) {
			GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/1.7, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
			GUI.DrawTexture(Rect(Screen.width*2/3 - 130, Screen.height/1.7, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
		}  else if (bestTime <= LevelControls.totalTime / 2 ) {
			GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/1.7, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
			GUI.DrawTexture(Rect(Screen.width*2/3 + 260, Screen.height/1.7, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
			GUI.DrawTexture(Rect(Screen.width*2/3 + 130, Screen.height/1.7, 0.04 * Screen.width, 0.04 * Screen.width), endStar);
		}
	}	
	
}

//var LevelControls : LevelControls;
//
//public var gameEndTextStyle : GUIStyle;
//public var reasonTextStyle : GUIStyle;
//public var yourUsedTimeTextStyle : GUIStyle;
//public var endStar : Texture2D;
//
//var overlay : Texture2D;
//var AvenirNextUL : Font;
//var AvenirNextHeavy : Font;
//var AvenirNextMedium : Font;
//
//var backButton : Texture2D;
//var nextButton : Texture2D;
//var replayButton : Texture2D;
//var playButton : Texture2D;
//
//
//// Colors
//private var gameStartColor : Color = Color(0.0, 0.0, 0.0, 0.6);
//private var gameOverColor : Color = Color(0.0, 0.0, 0.36, 1.0);
//private var gameWonColor : Color = Color(0.1, 0.5, 0.1, 1.0);
//private var gamePauseColor : Color = Color(0.3, 0.0, 0.4, 1.0);
//
//function Start() {
//
//
//	// Styles
//	gameEndTextStyle = new GUIStyle();
//    gameEndTextStyle.fontSize = Mathf.Floor(Screen.dpi/2.5);
//    gameEndTextStyle.font = AvenirNextUL;
//    gameEndTextStyle.alignment = TextAnchor.MiddleCenter;
//    gameEndTextStyle.normal.textColor = Color.white;
//	
//	reasonTextStyle = new GUIStyle();
//    reasonTextStyle.fontSize = Mathf.Floor(Screen.dpi/6.5);
//    reasonTextStyle.font = AvenirNextUL;
//    reasonTextStyle.alignment = TextAnchor.MiddleCenter;
//    reasonTextStyle.normal.textColor = Color.white;
//    
//    yourUsedTimeTextStyle = new GUIStyle();
//    yourUsedTimeTextStyle.fontSize = Mathf.Floor(Screen.dpi/5.5);
//    yourUsedTimeTextStyle.font = AvenirNextUL;
//    yourUsedTimeTextStyle.alignment = TextAnchor.MiddleCenter;
//    yourUsedTimeTextStyle.normal.textColor = Color.white;	
//}
//
//
//
//function OnGUI(){
//	if (LevelControls.isGamePaused) {
//		if (LevelControls.isGuidanceShown == 0 && !LevelControls.isGameOver && !LevelControls.isGameWon) {
//			ShowPause();
//		}		
//	}
//	if (LevelControls.isGameOver) {
//		ShowGameOver();
//	}
//	if (LevelControls.isGameWon) {
//		ShowGameWon();
//	}
//}
//
//
//
//// Overlay & text shown at game over and game won screens
//function ShowPause(){
//	ShowOverlay(gamePauseColor);
//	GUI.color = Color.white;
//	GUI.Label(Rect (Screen.width/2-50, Screen.height/3, 100, 50), "PAUSED", gameEndTextStyle);
//
//	ShowBackButton();
//	ShowReplayButton();
//	ShowPlayButton();
//}
//
//function ShowGameWon(){
//	ShowOverlay(gameWonColor);
//	GUI.color = Color(1.0, 0.68, 0.0, 1.0);
//	GUI.Label(Rect (Screen.width/2-50, Screen.height/4, 100, 50), "LEVEL COMPLETE", gameEndTextStyle);
//	GUI.color = Color.white;
//	GUI.Label(Rect (Screen.width/2-50, Screen.height/2.5, 100, 50), "You collected all the rings!", reasonTextStyle);
//	
//	ShowBackButton();
//	ShowReplayButton();
//	ShowNextButton();
//	DrawTimeAndStars();
//}
//
//function ShowGameOver(){
//	ShowOverlay(gameOverColor);
//	GUI.color = Color(1.0, 0.68, 0.0, 1.0);
//	GUI.Label(Rect (Screen.width/2-50, Screen.height/4, 100, 50), "GAME OVER", gameEndTextStyle);
//	GUI.color = Color.white;
//	if (LevelControls.lostAllLives) {
//		GUI.Label(Rect (Screen.width/2-50, Screen.height/2.5, 100, 50), "You lost all your lives!", reasonTextStyle);
//	} else {
//		if (LevelControls.isTimeUp) {
//			GUI.Label(Rect (Screen.width/2-50, Screen.height/2.5, 100, 50), "Time is up!", reasonTextStyle);
//		} else {
//			GUI.Label(Rect (Screen.width/2-50, Screen.height/2.5, 100, 50), "You hit the terrain!", reasonTextStyle);
//		}
//	}
//		
//	ShowBackButton();
//	ShowReplayButton();
//	ShowNextButton();
//	DrawTimeAndStars();
//}
//	
//
//
//
//function ShowBackButton(){
//	GUI.color = Color.white;
//	if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) - Screen.width * 0.13 ,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), backButton, GUIStyle.none)) {
//        Application.LoadLevel("Levels");
//    }
//}
//
//function ShowReplayButton(){
//	GUI.color = Color.white;
//	if (GUI.Button (Rect (Screen.width/2 - 0.1 * Screen.width/2,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), replayButton, GUIStyle.none)) {
//		LevelControls.RestartLevel();
//	}
//}
//
//function ShowNextButton() {
//	GUI.color = Color.white;
//	if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) + Screen.width * 0.13,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), nextButton, GUIStyle.none)) {
//		LevelControls.LoadNextLevel();       		
//	}
//}
//
//function ShowPlayButton(){
//	GUI.color = Color.white;
//	if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) + Screen.width * 0.13,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), playButton, GUIStyle.none)) {
//        LevelControls.UnPauseGame();
//    }		
//}
//
//function ShowOverlay(color){
//	GUI.color = color;
//	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), overlay);
//}
//
//function DrawTimeAndStars(){
//	var usedTime = LevelControls.totalTime - LevelControls.timer;
//	var secs: int = usedTime % 60;
//	var mins: int = usedTime / 60;
//	var usedTimeString = "";
//	if (mins > 0) {
//		usedTimeString = mins.ToString() + " min " + secs.ToString() + " sec";
//	} else {
//		usedTimeString = secs.ToString() + " sec";
//	}
//	//var usedTimeString = String.Format("{0:0}:{1:00}", mins, secs);
//	
//	GUI.Label(Rect (Screen.width*1/3 - 150, Screen.height/2 + 20, 100, 50), "Time elapsed: ", yourUsedTimeTextStyle);
//	GUI.Label(Rect (Screen.width/2, Screen.height/2 + 20, 100, 50),  usedTimeString, yourUsedTimeTextStyle);
//
//
//	// Draw stars depending on the time
//	GUI.color = Color(1.0, 0.68, 0.0, 1.0);
//	if (!LevelControls.isGameOver) {
//		if (usedTime <= LevelControls.totalTime  && usedTime > (LevelControls.totalTime / 4) * 3 ) {
//			GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
//		}
//		else if (usedTime <= (LevelControls.totalTime / 4) * 3 && usedTime > LevelControls.totalTime/2) {
//			GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
//			GUI.DrawTexture(Rect(Screen.width*2/3 - 130, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
//		} else if (usedTime <= LevelControls.totalTime / 2 ) {
//			GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
//			GUI.DrawTexture(Rect(Screen.width*2/3 + 260, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
//			GUI.DrawTexture(Rect(Screen.width*2/3 + 130, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
//		}	
//	}
//}
//
//
//
// 
// 
