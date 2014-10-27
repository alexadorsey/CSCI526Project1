var LevelControls : LevelControls;

public var gameEndTextStyle : GUIStyle;
public var reasonTextStyle : GUIStyle;
public var yourUsedTimeTextStyle : GUIStyle;
public var endStar : Texture2D;

var overlay : Texture2D;
var AvenirNextUL : Font;
var AvenirNextHeavy : Font;
var AvenirNextMedium : Font;

var backButton : Texture2D;
var nextButton : Texture2D;
var replayButton : Texture2D;
var playButton : Texture2D;


// Colors
private var gameStartColor : Color = Color(0.0, 0.0, 0.0, 0.6);
private var gameOverColor : Color = Color(0.0, 0.0, 0.36, 1.0);
private var gameWonColor : Color = Color(0.1, 0.5, 0.1, 1.0);
private var gamePauseColor : Color = Color(0.3, 0.0, 0.4, 1.0);

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
			ShowPause();
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
	ShowOverlay(gameWonColor);
	GUI.color = Color(1.0, 0.68, 0.0, 1.0);
	GUI.Label(Rect (Screen.width/2-50, Screen.height/4, 100, 50), "LEVEL COMPLETE", gameEndTextStyle);
	GUI.color = Color.white;
	GUI.Label(Rect (Screen.width/2-50, Screen.height/2.5, 100, 50), "You collected all the rings!", reasonTextStyle);
	
	ShowBackButton();
	ShowReplayButton();
	ShowNextButton();
	DrawTimeAndStars();
}

function ShowGameOver(){
	ShowOverlay(gameOverColor);
	GUI.color = Color(1.0, 0.68, 0.0, 1.0);
	GUI.Label(Rect (Screen.width/2-50, Screen.height/4, 100, 50), "GAME OVER", gameEndTextStyle);
	GUI.color = Color.white;
	if (LevelControls.lostAllLives) {
		GUI.Label(Rect (Screen.width/2-50, Screen.height/2.5, 100, 50), "You lost all your lives!", reasonTextStyle);
	} else {
		if (LevelControls.isTimeUp) {
			GUI.Label(Rect (Screen.width/2-50, Screen.height/2.5, 100, 50), "Time is up!", reasonTextStyle);
		} else {
			GUI.Label(Rect (Screen.width/2-50, Screen.height/2.5, 100, 50), "You hit the terrain!", reasonTextStyle);
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
	} else {
		usedTimeString = secs.ToString() + " sec";
	}
	//var usedTimeString = String.Format("{0:0}:{1:00}", mins, secs);
	
	GUI.Label(Rect (Screen.width*1/3 - 150, Screen.height/2 + 20, 100, 50), "Time elapsed: ", yourUsedTimeTextStyle);
	GUI.Label(Rect (Screen.width/2, Screen.height/2 + 20, 100, 50),  usedTimeString, yourUsedTimeTextStyle);


	// Draw stars depending on the time
	GUI.color = Color(1.0, 0.68, 0.0, 1.0);
	if (!LevelControls.isGameOver) {
		if (usedTime <= LevelControls.totalTime  && usedTime > (LevelControls.totalTime / 4) * 3 ) {
			GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
		}
		else if (usedTime <= (LevelControls.totalTime / 4) * 3 && usedTime > LevelControls.totalTime/2) {
			GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
			GUI.DrawTexture(Rect(Screen.width*2/3 - 130, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
		} else if (usedTime <= LevelControls.totalTime / 2 ) {
			GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
			GUI.DrawTexture(Rect(Screen.width*2/3 + 260, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
			GUI.DrawTexture(Rect(Screen.width*2/3 + 130, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
		}	
	}
}



 
 
