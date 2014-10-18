var numRings : int;
var maxHeight : int;
var timer : float;
var AvenirNextUL : Font;
var backButton : Texture2D;
var nextButton : Texture2D;
var replayButton : Texture2D;
var playButton : Texture2D;
var overlay : Texture2D;
var endStar : Texture2D;


private var numRingsCounter : int;
private var score : int;
private var ringScore : int;
private var lives : int;
private var speed : float;
private var rotateSpeed : float;
private var flyingUpCounter : int;


// Game control booleans
private var isGameWon = false;
private var isGameOver = false;
private var isTimeUp = false;
private var isGamePaused = false;
private var speedBoost = false;
private var updateScore = true;
private var invincibleMode = false;
private var isFlyingUp = false;
private var inCountdown = true;

private var startTime;
private var speedBoostCounter : int;
private var speedBoostTime : int;
private var plusTextWaitTime : float;
private var invincibleTime : float;
private var invincibleCounter : int;
private var countdownCounter : int;
private var countdownTime : int;



// Gameplay displays

private var paperPlane : GameObject;
private var scoreText : GUIText;
private var timeText : GUIText;
private var plusText : GUIText;
private var countdownText : GUIText;
private var pauseButton : GUITexture;
private var heart1 : GUITexture;
private var heart2 : GUITexture;
private var heart3 : GUITexture;
private var heart_disabled : Color = Color(1.0, 0.0, 0.0, 0.2);
private var heart_enabled : Color = Color(1.0, 0.0, 0.0, 1.0);

//var overlay : GUITexture;
private var gameStartColor : Color = Color(0.0, 0.0, 0.0, 0.6);
private var gameOverColor : Color = Color(0.0, 0.0, 0.36, 1.0);
private var gameWonColor : Color = Color(0.1, 0.5, 0.1, 1.0);
private var gamePauseColor : Color = Color(0.3, 0.0, 0.4, 1.0);

private var gameEndTextStyle : GUIStyle;
private var reasonTextStyle : GUIStyle;
private var yourScoreTextStyle : GUIStyle;


function Start(){
	// Initialize the level
	score = 0;
	lives = 3;
	speedBoostCounter = 0;
	speedBoostTime = 5;
	plusTextWaitTime = 0;
	//maxHeight = 120;
	numRingsCounter = 0;
	flyingUpCounter = 0;
	countdownCounter = 0;
	countdownTime = 3;
	speed = 1.0;

	rotateSpeed = 5.0;
	
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
	paperPlane = GameObject.Find("Paper Plane Body");
	scoreText = GameObject.Find("Score").guiText;
	timeText = GameObject.Find("Time").guiText;
	plusText = GameObject.Find("Plus Points Text").guiText;
	countdownText = GameObject.Find("Countdown Text").guiText;
		
	pauseButton = (GameObject.Find("Pause Button").GetComponent(GUITexture)as GUITexture);
	heart1 = (GameObject.Find("heart1").GetComponent(GUITexture)as GUITexture);
	heart2 = (GameObject.Find("heart2").GetComponent(GUITexture)as GUITexture);
	heart3 = (GameObject.Find("heart3").GetComponent(GUITexture)as GUITexture);
	
	// Show the start display
	UpdateScore();
	HidePlusText();	
	
	
	// Pause Button
	pauseButton.pixelInset.width = 0.08 * Screen.width;
	pauseButton.pixelInset.height = pauseButton.pixelInset.width;
	pauseButton.pixelInset.position.x = Screen.width/3 + 70;
	pauseButton.pixelInset.position.y = Screen.height/3 - 40;
	
	
	scoreText.fontSize = Mathf.Floor(Screen.dpi/5);
	timeText.fontSize = Mathf.Floor(Screen.dpi/4);
	plusText.fontSize = Mathf.Floor(Screen.dpi/7);
	
	// Countdown Text
	countdownText.fontSize = Mathf.Floor(Screen.dpi/2);	
	scoreText.pixelOffset.y = Screen.height/3 - 40;
	timeText.pixelOffset.y = -Screen.height/3 - 50;
	plusText.pixelOffset.x = Screen.height/5;
	plusText.color = Color(0.0, 0.9, 0.4);
	
	heart1.pixelInset.width = 0.05 * Screen.width;
	heart1.pixelInset.height = heart1.pixelInset.width;
	heart2.pixelInset.width = heart1.pixelInset.width;
	heart2.pixelInset.height = heart1.pixelInset.width;
	heart3.pixelInset.width = heart1.pixelInset.width;
	heart3.pixelInset.height = heart1.pixelInset.width;
	
	heart1.pixelInset.position.x = -heart2.pixelInset.width * 2 -heart1.pixelInset.width/2 + 20;
	heart2.pixelInset.position.x = -heart1.pixelInset.width/2;
	heart3.pixelInset.position.x = heart2.pixelInset.width * 2 -heart1.pixelInset.width/2 - 20;
	
	heart1.pixelInset.y = Screen.height/3 + 40;
	heart2.pixelInset.y = heart1.pixelInset.y;
	heart3.pixelInset.y = heart1.pixelInset.y;
	
	
	
	gameEndTextStyle = new GUIStyle();
    gameEndTextStyle.fontSize = Mathf.Floor(Screen.dpi/2.5);
    gameEndTextStyle.font = AvenirNextUL;
    gameEndTextStyle.alignment = TextAnchor.MiddleCenter;
    gameEndTextStyle.normal.textColor = Color.white;
	
	reasonTextStyle = new GUIStyle();
    reasonTextStyle.fontSize = Mathf.Floor(Screen.dpi/5);
    reasonTextStyle.font = AvenirNextUL;
    reasonTextStyle.alignment = TextAnchor.MiddleCenter;
    reasonTextStyle.normal.textColor = Color.white;
    
    yourScoreTextStyle = new GUIStyle();
    yourScoreTextStyle.fontSize = Mathf.Floor(Screen.dpi/7);
    yourScoreTextStyle.font = AvenirNextUL;
    yourScoreTextStyle.alignment = TextAnchor.MiddleCenter;
    yourScoreTextStyle.normal.textColor = Color.white;	
    
    	Time.timeScale = 1;	
}


function OnGUI(){
	if (isGameOver || isGameWon || isTimeUp || isGamePaused) {
		if (isGameOver) {
			// Overlay
			GUI.color = gameOverColor;
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), overlay);
			GUI.color = Color(1.0, 0.68, 0.0, 1.0);
			// Game Over Text
			GUI.Label(Rect (Screen.width/2-50, Screen.height/4, 100, 50), "GAME OVER", gameEndTextStyle);
			GUI.color = Color.white;
			GUI.Label(Rect (Screen.width/2-50, Screen.height/2-95, 100, 50), "You hit the terrain!", reasonTextStyle);
			
		}
		if (isGameWon){
			GUI.color = gameWonColor;
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), overlay);
			GUI.color = Color(1.0, 0.68, 0.0, 1.0);
			GUI.Label(Rect (Screen.width/2-50, Screen.height/4, 100, 50), "LEVEL COMPLETE", gameEndTextStyle);
			GUI.color = Color.white;
			GUI.Label(Rect (Screen.width/2-50, Screen.height/2-95, 100, 50), "You collected all the rings!", reasonTextStyle);
		}
		if (isTimeUp) {
			GUI.color = gameWonColor;
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), overlay);
			GUI.color = Color(1.0, 0.68, 0.0, 1.0);
			GUI.Label(Rect (Screen.width/2-50, Screen.height/4, 100, 50), "TIME'S UP!", gameEndTextStyle);
			GUI.color = Color.white;
		}
		if (isGamePaused && (!isGameOver && !isGameWon && !isTimeUp)) {
			GUI.color = gamePauseColor;
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), overlay);
			GUI.color = Color.white;
			GUI.Label(Rect (Screen.width/2-50, Screen.height/3, 100, 50), "PAUSED", gameEndTextStyle);

			// Play button
    		if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) + Screen.width * 0.13,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), playButton, GUIStyle.none)) {
        		UnPauseGame();
    		}
		} else {
			GUI.Label(Rect (Screen.width/4, Screen.height/2 + 20, 100, 50), "your score:", yourScoreTextStyle);
			GUI.Label(Rect (Screen.width/2 - 50, Screen.height/2 + 20, 100, 50), score.ToString(), yourScoreTextStyle);
			GUI.Label(Rect (Screen.width/4, Screen.height/2 + 100, 110, 50), "high score:", yourScoreTextStyle);
			GUI.Label(Rect (Screen.width/2 - 50, Screen.height/2 + 110, 100, 50), "---", yourScoreTextStyle);
	    	
	    	// Draw stars depending on the score
			GUI.color = Color(1.0, 0.68, 0.0, 1.0);
			if (score < ringScore/2) {
				GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
			}
			if (score >= ringScore/2 && score < ringScore) {
				GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
				GUI.DrawTexture(Rect(Screen.width*2/3 + 130, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
			}	
			if (score >= ringScore) {
				GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
				GUI.DrawTexture(Rect(Screen.width*2/3 + 130, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
				GUI.DrawTexture(Rect(Screen.width*2/3 + 260, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
			}
			
			// Next button
			GUI.color = Color.white;
    		if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) + Screen.width * 0.13,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), nextButton, GUIStyle.none)) {
        		//UnPauseGame();
    		}
		}
		
		// Always draw the back & replay buttons
		GUI.color = Color.white;
		// Back button
		if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) - Screen.width * 0.13 ,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), backButton, GUIStyle.none)) {
        	//UnPauseGame();       	
        	Application.LoadLevel("Levels");
    	}
		
		// Replay		
		if (GUI.Button (Rect (Screen.width/2 - 0.1 * Screen.width/2,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), replayButton, GUIStyle.none)) {
	        UnPauseGame();
			Application.LoadLevel(Application.loadedLevel);
	    }
	}
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
 	
 	if(other.tag == "Sphere"){
 		DecreaseLives(1);
 		ChangePlaneColor(Color.black);
 		yield WaitForSeconds(0.3);
 		ChangePlaneColor(Color.white);
 		//Destroy(other.gameObject);
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
	
//	// If hits a heart
	if (other.name == "Heart Body") {
		IncreaseLives(1);
		if (lives == 3) {	
			ShowPlusText("+100");
			AddScore(100);	
		} else {
			ShowPlusText("+1 Life");
		}
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
		ChangePlaneColor(Color(0.4, 0.0, 0.7, 1.0));
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
	    	transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);
	    	var h = Input.GetAxis("Vertical"); // use the same axis that move back/forth
	    	var v = Input.GetAxis("Horizontal"); // use the same axis that turns left/right
	
//	    	transform.Rotate(0, Input.acceleration.x * rotateSpeed, 0);
//	    	var h = Input.acceleration.y;
//	    	var v = Input.acceleration.x;
	    	
	    	transform.localEulerAngles.x = -v*30; // forth/back banking first!
	    }
	    
	    
	    
	    // Move the plane forward at a constant speed
	    if (speedBoost) {
	    	transform.Translate(3.5, 0, 0);
	    } else {
	    	if (inCountdown) {
	    		transform.Translate(0, 0, 0);
	    	} else{
	    		transform.Translate(2, 0, 0);
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
		    if (countdownCounter % 30 == 0) {
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
	    	//rigidbody.velocity = Vector3.zero;
	    } else{
	    	transform.localEulerAngles.z = 20;
	    	flyingUpCounter++;
	    //	ForceMode.Impulse();
	    //	rigidbody.AddForce(Vector3(0, 3, 0), ForceMode.Impulse);
	    }	    
	    if (flyingUpCounter >= 15) {
	    	isFlyingUp = false;
	    	flyingUpCounter = 0;
	    }
	    
	    
    } 
    
    // Keep plane from moving above max height
    if (rigidbody.position.y >= maxHeight) {
		transform.position = Vector3 (rigidbody.position.x, maxHeight, rigidbody.position.z);
	}
	
	
}


function FixedUpdate () {
	//Check when spacebar is pushed
	if (!isGamePaused) {
		if (Input.GetKeyDown (KeyCode.Space)) {		
			print("space bar pressed " + rigidbody);
			isFlyingUp = true;
			//rigidbody.velocity = Vector3(0, 20, 0);
		}
		if(Input.touchCount > 0) {
			for(var i = 0; i < Input.touchCount; ++i){
				if(pauseButton.HitTest(Input.GetTouch(0).position)){
					print("pause button");
					if(Input.GetTouch(0).phase == TouchPhase.Began){
						PauseGame();
					}
				}
				if(Input.GetTouch(i).phase == TouchPhase.Began){
					print("speed up");
					isFlyingUp = true;
				}	
			}
		}
		
		
	}	
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
	yield WaitForSeconds(0.5);
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
	timeText.enabled = false;
	scoreText.enabled = false;
	heart1.enabled = false;
	heart2.enabled = false;
	heart3.enabled = false;
	plusText.enabled = false;
	pauseButton.enabled = false;
}


// Pause & unpause game
function PauseGame() {
	if(isGamePaused){
		pauseButton.enabled = false;
		isGamePaused = false;
		Time.timeScale=1;		
	} else {
		isGamePaused = true;
		Time.timeScale=0;
	}	
}
function UnPauseGame(){
	isGamePaused = false;
	Time.timeScale=1;
	pauseButton.enabled = true;	
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

function EndCountdown() {
	inCountdown = false;
	countdownText.enabled = false;
}

function ChangePlaneColor( c : Color) {
	paperPlane.renderer.material.color = c;
}




