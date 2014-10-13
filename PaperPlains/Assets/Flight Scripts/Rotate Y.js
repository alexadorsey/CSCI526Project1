private var numRings : int;
var numRingsCounter : int;
var maxHeight : int;
var score : int;
var lives : int;
var speed : float;
var rotateSpeed : float;
var flyingUpCounter : int;


// Game control booleans
var isGameWon = false;
var isGameOver = false;
var isTimeUp = false;
var isGamePaused = false;
var speedBoost = false;
var updateScore = true;
var invincibleMode = false;
var isFlyingUp = false;
var inCountdown = true;



var startTime;
var timer : float;
var speedBoostCounter : int;
var speedBoostTime : int;
var plusTextWaitTime : float;
var invincibleTime : float;
var invincibleCounter : int;
var countdownCounter : int;
var countdownTime : int;


// Gameplay displays
var scoreText : GUIText;
var timeText : GUIText;
var plusText : GUIText;
var countdownText : GUIText;
var heart1 : GUITexture;
var heart2 : GUITexture;
var heart3 : GUITexture;
private var heart_disabled : Color = Color(1.0, 0.0, 0.0, 0.2);
private var heart_enabled : Color = Color(1.0, 0.0, 0.0, 1.0);

var overlay : GUITexture;
private var gameStartColor : Color = Color(0.0, 0.0, 0.0, 0.2);
private var gameOverColor : Color = Color(0.0, 0.0, 0.36, 0.4);
private var gameWonColor : Color = Color(0.3, 1.0, 0.3, 0.5);

// Game Over displays
var gameOverText : GUIText;
var replayButton : GUITexture;
var reasonText : GUIText;
var yourScoreText : GUIText;
var highScoreText : GUIText;
var yourScoreDisplay : GUIText;
var highScoreDisplay : GUIText;





function Start(){
	// Initialize the level
	score = 0;
	timer = 60;
	lives = 3;
	speedBoostCounter = 0;
	speedBoostTime = 5;
	plusTextWaitTime = 0;
	maxHeight = 120;
	numRings = 9;
	numRingsCounter = 0;
	flyingUpCounter = 0;
	countdownCounter = 0;
	countdownTime = 3;
	speed = 1.0;
	rotateSpeed = 3.0;
	
	isGameWon = false;
	isGameOver = false;
	isTimeUp = false;
	isGamePaused = false;
	speedBoost = false;
	updateScore = true;
	invincibleMode = false;
	isFlyingUp = false;
	inCountdown = true;
	
	// Gameplay Text
	scoreText = GameObject.Find("Score").guiText;
	timeText = GameObject.Find("Time").guiText;
	plusText = GameObject.Find("Plus Points Text").guiText;
	countdownText = GameObject.Find("Countdown Text").guiText;
	
	heart1 = (GameObject.Find("heart1").GetComponent(GUITexture)as GUITexture);
	heart2 = (GameObject.Find("heart2").GetComponent(GUITexture)as GUITexture);
	heart3 = (GameObject.Find("heart3").GetComponent(GUITexture)as GUITexture);
	
	// Game Over Text
	gameOverText = GameObject.Find("Game Over").guiText;
	overlay = (GameObject.Find("Overlay").GetComponent(GUITexture)as GUITexture);
	replayButton = (GameObject.Find("Replay Button").GetComponent(GUITexture)as GUITexture);
	reasonText = GameObject.Find("Reason Text").guiText;
	yourScoreText = GameObject.Find("Your Score").guiText;
	highScoreText = GameObject.Find("High Score").guiText;
	yourScoreDisplay = GameObject.Find("Your Score Display").guiText;
	highScoreDisplay = GameObject.Find("High Score Display").guiText;
	
	// Show the start display
	UpdateScore();
	HideGameEndScreen();
	ShowOverlay(gameStartColor);	
	HidePlusText();	
}

// Check for collision with non-trigger objects -- for us, this is the terrain
function OnCollisionEnter(collision : Collision) {

	print("Collision with Terrain; Lives: " + lives);
	if (!invincibleMode){
		GameOver();
	}
	
}
 
 // Handles triggers with collisions
 // Put the outcome of each collision with a reward/obstacle here
 function OnTriggerEnter (other : Collider) {
 	print("Collision with " + other.name);
 	
 	if(other.tag == "Sphere1"){
 		DecreaseLives(1);
 		Destroy(other.gameObject);
 	} 	
 	if (other.transform.IsChildOf(transform))
			return;
			
			
	// If hits a ring
	if (other.name == "Circle") {
		print("Root is " + other.transform.root.name);
		var ring : Transform = other.transform.parent;
		
		// If ring is not red already, change it red
		if (ring.renderer.material.color != Color.red){
			if (ring.name == "Ring Medium"){
				AddScore(60);
				ShowPlusText("+60");
			}
			if (ring.name == "Ring Hard"){
				AddScore(90);
				ShowPlusText("+90");
			}
			if (ring.name == "Ring Easy"){
				AddScore(30);
				ShowPlusText("+30");
			}
			if (ring.name == "Ring"){
				AddScore(30);
				ShowPlusText("+30");
			}
			
			ring.renderer.material.color = Color.red;
			numRingsCounter++;
			if (numRingsCounter == numRings) {
				GameWon();
			}
		}		
	}
	
	// If hits a heart
	if (other.name == "Heart Body") {
		IncreaseLives(1);
		ShowPlusText("+1 Life");
		Destroy(other.gameObject);
	}
	
	// If hits a lightning bolt
	if (other.name == "Lightning Body"){
		IncreaseSpeed();   
		Destroy(other.gameObject);
		ChangePlaneColor(Color.yellow);
	}
	
	// If hits a star
	if (other.name == "Collectible Star"){
		MakeInvincible(5);   
		Destroy(other.gameObject);
		ChangePlaneColor(Color.red);
	}
	
}
 
// Update function called every frame
function Update() {
	if (!isGamePaused) {
	
		// Run the timer
		RunTimer();		
		
		// Character controls
		if (!inCountdown){
	    	var controller : CharacterController = GetComponent(CharacterController);
//	    	transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);
//	    	var h = Input.GetAxis("Vertical"); // use the same axis that move back/forth
//	    	var v = Input.GetAxis("Horizontal"); // use the same axis that turns left/right
	
	    	transform.Rotate(0, Input.acceleration.x * rotateSpeed, 0);
	    	var h = Input.acceleration.y;
	    	var v = Input.acceleration.x;
	    	transform.localEulerAngles.x = -v*60; // forth/back banking first!
	    }
	    
	    
	    
	    // Move the plane forward at a constant speed
	    if (speedBoost) {
	    	transform.Translate(2.5, 0, 0);
	    } else {
	    	if (inCountdown) {
	    		transform.Translate(0, 0, 0);
	    	} else{
	    		transform.Translate(1.5, 0, 0);
	    	}
	    	 
	    }
	    if (speedBoostCounter >= speedBoostTime * 60) {
	    	speedBoost = false;
	    	ChangePlaneColor(Color.white);
	    	speedBoostCounter = 0;
	    } else {
	    	speedBoostCounter++;
	    }
	      
	    // Invincible Counter
	    if (invincibleCounter >= invincibleTime * 60){
	    	invincibleMode = false;
	    	ChangePlaneColor(Color.white);
	    	invincibleCounter = 0;
	    } else {
	    	invincibleCounter++;
	    }
	    
	    // Starting Countdown
	    if (countdownTime > -1){
		    if (countdownCounter % 60 == 0) {
		    	countdownText.text = countdownTime.ToString();
		    	countdownTime--;
		    }
		    countdownCounter++;
		 } else {
		 	EndCountdown();
		 }
	    
	      
	     
	    // Move plane up (when spacebar is pressed)
	    if (!isFlyingUp) {
	    	transform.localEulerAngles.z = -5;  // left/right
	    } else{
	    	transform.localEulerAngles.z = 20;
	    	flyingUpCounter++;
	    }	    
	    if (flyingUpCounter >= 30) {
	    	isFlyingUp = false;
	    	flyingUpCounter = 0;
	    }
    } else {
    	if(Input.touchCount > 0){
    		if(replayButton.HitTest(Input.GetTouch(0).position)){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					UnPauseGame();
					Application.LoadLevel(Application.loadedLevel);
				}
			}
    	}	
    }
    // Keep plane from moving above max height
    if (rigidbody.position.y >= maxHeight) {
		transform.position = Vector3 (rigidbody.position.x, maxHeight, rigidbody.position.z);
	}	
}


function FixedUpdate () {
	if (!isGamePaused) {
	//Check when spacebar is pushed
//		if (Input.GetKeyDown (KeyCode.Space)) {		
//			print("space bar pressed " + rigidbody);
//			isFlyingUp = true;
//			//rigidbody.velocity = Vector3(0, 20, 0);
//		}
		for(var i = 0; i < Input.touchCount; ++i){
			if(Input.GetTouch(i).phase == TouchPhase.Began){
				print("fly up");
				isFlyingUp = true;
			}
		}
	}
	
}
 
 
 
 
function OnGUI(){
	scoreText.fontSize = Mathf.Floor(Screen.dpi/5);
	timeText.fontSize = Mathf.Floor(Screen.dpi/4.5);
	plusText.fontSize = Mathf.Floor(Screen.dpi/5);
	// Countdown Text
	countdownText.fontSize = Mathf.Floor(Screen.dpi/2);
	
	scoreText.pixelOffset.y = Screen.height/3;
	timeText.pixelOffset.y = -Screen.height/3 - 20;
	
	
	heart1.pixelInset.width = 0.05 * Screen.width;
	heart1.pixelInset.height = 0.05 * Screen.width;
	heart2.pixelInset.width = 0.05 * Screen.width;
	heart2.pixelInset.height = 0.05 * Screen.width;
	heart3.pixelInset.width = 0.05 * Screen.width;
	heart3.pixelInset.height = 0.05 * Screen.width;
	
	heart1.pixelInset.position.x = -heart2.pixelInset.width * 2 -heart1.pixelInset.width/2;
	heart2.pixelInset.position.x = -heart1.pixelInset.width/2;
	heart3.pixelInset.position.x = heart2.pixelInset.width * 2 -heart1.pixelInset.width/2;
	
	heart1.pixelInset.y = Screen.height/3 + 30;
	heart2.pixelInset.y = Screen.height/3 + 30;
	heart3.pixelInset.y = Screen.height/3 + 30;
	
	
	
	
	// Game Over Text
	gameOverText.fontSize = Mathf.Floor(Screen.dpi/2.5);
	gameOverText.pixelOffset.y = Screen.height/4;
	
	// You hit the terrain!
	reasonText.fontSize = Mathf.Floor(Screen.dpi/5);
	reasonText.pixelOffset.y = gameOverText.pixelOffset.y - 150;
	
	// Your score:
	yourScoreText.fontSize = Mathf.Floor(Screen.dpi/7);
	yourScoreText.pixelOffset.x = -Screen.width/5;
	yourScoreText.pixelOffset.y = 0;
	
	// 100
	yourScoreDisplay.fontSize = Mathf.Floor(Screen.dpi/7);
	yourScoreDisplay.pixelOffset.x = 0;
	yourScoreDisplay.pixelOffset.y = yourScoreText.pixelOffset.y;
	
	// High score:
	highScoreText.fontSize = yourScoreText.fontSize;
	highScoreText.pixelOffset.x = yourScoreText.pixelOffset.x;
	highScoreText.pixelOffset.y = yourScoreText.pixelOffset.y - 100;
	
	// 200
	highScoreDisplay.fontSize = yourScoreDisplay.fontSize;
	highScoreDisplay.pixelOffset.x = yourScoreDisplay.pixelOffset.x;
	highScoreDisplay.pixelOffset.y = highScoreText.pixelOffset.y;
	
	// Replay
	replayButton.pixelInset.width = 0.1 * Screen.width;
	replayButton.pixelInset.height = replayButton.pixelInset.width;
	replayButton.pixelInset.position.x = -replayButton.pixelInset.width/2;
	replayButton.pixelInset.position.y = -Screen.height/2.5;

}



 
// Descreases the number of lives by newLifeValue, updates hearts, and checks for game over
function DecreaseLives (newLifeValue : int) {
	if (!invincibleMode) {
    	lives -= newLifeValue;
    	if (lives == 2) {    	
    		heart3.color = heart_disabled;
    	}
	    if (lives == 1) {
	    	heart2.color = heart_disabled;
	    }   
	    if (lives == 0) {
	    	heart1.color = heart_disabled;
	    	GameOver();
	    }
    }
}


// Increases the number of lives by newLifeValue, updates hearts
function IncreaseLives (newLifeValue : int) {
	if (lives <= 2){
	    lives += newLifeValue;
	    if (lives == 3) {
	    	heart3.color = heart_enabled;
	    }
	    if (lives == 2) {
	    	heart2.color = heart_enabled;
	    }   
	    if (lives == 1) {
	    	heart1.color = heart_enabled;
	    	GameOver();
	    }
    }
}

// Increase the speed of the plane due to a lightning bolt
function IncreaseSpeed() {
	speedBoost = true;

}


// Adds newScoreValue to the current score
function AddScore (newScoreValue : int) {
    score += newScoreValue;
    UpdateScore();
    if (score == numRings){
		GameWon();
	}
}

// Updates the score on the screen
function UpdateScore() {
	scoreText.text = score.ToString();
}

// Call when level has been won
function GameWon() {
	isGameWon = true;
	yield WaitForSeconds(1);
	ShowGameEndScreen();
}

function TimesUp(){
	isTimeUp = true;
	ShowGameEndScreen();
}


// Call when game over
function GameOver(){
	isGameOver = true;
	ShowGameEndScreen();
}

function ShowGameEndScreen() {
	PauseGame();
	UpdateScores();
	if (isGameOver){
		ShowOverlay(gameOverColor);
		gameOverText.text = "GAME OVER";
	}
	if (isGameWon){
		ShowOverlay(gameWonColor);
		gameOverText.text = "LEVEL COMPLETE!";
		reasonText.text = "You collected every ring";
	}
	if (isTimeUp) {
		ShowOverlay(gameWonColor);
		gameOverText.text = "TIME'S UP!";
		reasonText.text = "";
	}
	
	gameOverText.gameObject.SetActive(true);
	reasonText.gameObject.SetActive(true);
	yourScoreText.gameObject.SetActive(true);
	highScoreText.gameObject.SetActive(true);
	yourScoreDisplay.gameObject.SetActive(true);
	highScoreDisplay.gameObject.SetActive(true);
	replayButton.gameObject.SetActive(true);
	
	timeText.enabled = false;
	scoreText.enabled = false;
	heart1.enabled = false;
	heart2.enabled = false;
	heart3.enabled = false;
}

function HideGameEndScreen(){
	gameOverText.gameObject.SetActive(false);
	reasonText.gameObject.SetActive(false);
	yourScoreText.gameObject.SetActive(false);
	highScoreText.gameObject.SetActive(false);
	yourScoreDisplay.gameObject.SetActive(false);
	highScoreDisplay.gameObject.SetActive(false);
	replayButton.gameObject.SetActive(false);
	HideOverlay();
}


// Pause & unpause game
function PauseGame() {
	isGamePaused = true;
	Time.timeScale=0;
}
function UnPauseGame(){
	isGamePaused = false;
	Time.timeScale=1;
}


// Countdown the timer and display on the screen
function RunTimer(){
	if (!inCountdown) {
		if (timer > 0){
			timer -= Time.deltaTime;
			var secs: int = timer % 60;
			var mins: int = timer / 60;
			timeText.text = String.Format("{0:0}:{1:00}", mins, secs);
		} else {
			TimesUp();
		}
	}
}


// Show & hide game over/game won overlay
function ShowOverlay(c : Color){
	overlay.color = c;
	overlay.enabled = true;
}
function HideOverlay(){
	overlay.enabled = false;
}


function ShowPlusText(plusValue : String){
	plusText.enabled = false;
	plusText.text = plusValue;
	plusText.enabled = true;
	plusTextWaitTime += 1.5;
	yield WaitForSeconds(plusTextWaitTime);
	HidePlusText();
}

function HidePlusText(){
	plusText.enabled = false;
	plusTextWaitTime = 0;
}

function MakeInvincible(invincibleValue : float){
	invincibleTime = invincibleValue;
	invincibleMode = true;
}

function UpdateScores(){
	yourScoreDisplay.text = score.ToString();
	// TODO: Check if score is greater than stored high score
}

function EndCountdown() {
	inCountdown = false;
	HideOverlay();
	countdownText.gameObject.SetActive(false);
}

function ChangePlaneColor( c : Color) {
	GameObject.Find("Paper Plane Body").renderer.material.color = c;
}




