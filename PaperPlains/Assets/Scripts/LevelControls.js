var LevelDisplay : LevelDisplay;
var Tutorial : Tutorial;

var levelInt : int;
var numRings : int;

public var numRingsCounter : int;

public var isGamePaused;
public var isGameWon;
public var isGameOver;
public var isTimeUp;
public var inCountdown;
public var isGuidanceShown : int;


public var lostAllLives;
public var totalTime : float;


public var countdownTime : float;
var timer : float;


function Start(){
	isGamePaused = false;
	isGameWon = false;
	isGameOver = false;
	isTimeUp = false;
	inCountdown = true;
	lostAllLives = false;
	
	numRingsCounter = 0;
	countdownTime = 3;
	timer = 120;
	totalTime = timer;
	
	// Set the ring counter
	UpdateRingCounter();
	numRingsCounter = 0;
	// Unpause the game
    UnPauseGame();
}

function Update() {
	// Run the timer
	if (!isGamePaused && !inCountdown) {	
		Screen.sleepTimeout = SleepTimeout.NeverSleep;
		// Run the timer
		RunTimer();
	} else {
	//	Screen.sleepTimeout = SleepTimeout.SystemSetting;
		// Don't run countdown if in tutorial, otherwise run countdown at start of each level
    	if(isGuidanceShown){
    		if(levelInt == 0){			
				Tutorial.GuidanceTimer();
			}
			inCountdown = false;
		} else {
			// Run the Countdown
			RunCountdown();
		}
	}
}


// Load previous level
function LoadPreviousLevel() {
 	if (levelInt == 0) {
 		Application.LoadLevel("Level4");
 	} else {
 		Application.LoadLevel("Level" + (levelInt-1).ToString());
 	}
 }
 
 
 // Load next level
 function LoadNextLevel() {
 	if (levelInt == 4) {
 		Application.LoadLevel("Level0");
 	} else {
 		Application.LoadLevel("Level" + (levelInt+1).ToString());
 	}
 }
 
 
 // Restart the current level
 function RestartLevel() {
 	Application.LoadLevel(Application.loadedLevel);
 }
 
 
 // Pause level
 function PauseGame() {
	if(isGamePaused){
		//Screen.sleepTimeout = SleepTimeout.SystemSetting;
		LevelDisplay.pauseButton.enabled = false;
		AudioListener.pause = false;
		isGamePaused = false;
		Time.timeScale=1;		
	} else {
		isGamePaused = true;
		AudioListener.pause = true;
		Time.timeScale=0;
	}	
}

// Unpause the level
function UnPauseGame(){
	isGamePaused = false;
	Time.timeScale=1;
	LevelDisplay.pauseButton.enabled = true;	
	AudioListener.pause = false;
	Screen.sleepTimeout = SleepTimeout.NeverSleep;	
}


// Level is won
function GameWon() {
	isGameWon = true;
	yield WaitForSeconds(0.4);
	ShowGameEndScreen();
}


// Level is over
function GameOver(){
	isGameOver = true;
	ShowGameEndScreen();
}


// Time is up
function TimesUp(){
	isTimeUp = true;
	ShowGameEndScreen();
}


function ShowGameEndScreen() {
	PauseGame();	
	LevelDisplay.timeText.enabled = false;
	LevelDisplay.heart1.enabled = false;
	LevelDisplay.heart2.enabled = false;
	LevelDisplay.heart3.enabled = false;
	LevelDisplay.pauseButton.enabled = false;
	LevelDisplay.numRingsText.enabled = false;
	LevelDisplay.numRingsImage.enabled = false;
	LevelDisplay.boost.enabled = false;
}



//Updates ring counter text which shows number of rings left to collect
function UpdateRingCounter(){
	if (!inCountdown) {
		numRingsCounter++;
	}
	LevelDisplay.numRingsText.text = (numRings - numRingsCounter).ToString();
	
}



// Runs the timer
function RunTimer(){
	if (!(inCountdown || isGameOver || isGameWon || isGamePaused)) {
		if (timer > 0){
			timer -= Time.deltaTime;
			var secs: int = timer % 60;
			var mins: int = timer / 60;
			LevelDisplay.timeText.text = String.Format("{0:0}:{1:00}", mins, secs);
		} else {
			TimesUp();
		}
	}
}


// Runs the countdown
function RunCountdown(){
	if (countdownTime > 0){
		countdownTime -= Time.deltaTime;
		if (levelInt > 0){
			LevelDisplay.countdownText.text = Mathf.Ceil(countdownTime).ToString();
		} else {
			LevelDisplay.countdownText.text = "";
		}
	} else {
		EndCountdown();
	}
}

// Ends the countdown
function EndCountdown() {
	inCountdown = false;
	LevelDisplay.countdownText.enabled = false;
}



function Awake () {
	// Make the game run as fast as possible in the web player
	Application.targetFrameRate = 60;
}
