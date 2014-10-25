var numEasy : int;
var numMedium : int;
var numHard : int;
var maxHeight : int;
var levelInt : int;
var timer : float;
var totalTime : float;
var AvenirNextUL : Font;
var AvenirNextHeavy : Font;
var AvenirNextMedium : Font;
var backButton : Texture2D;
var nextButton : Texture2D;
var replayButton : Texture2D;
var playButton : Texture2D;
var overlay : Texture2D;
var endStar : Texture2D;
var endinvincibleTime = 10000;
var endspeedBoostTime = 10000;

private var numRings : int;
private var numRingsCounter : int;
//private var score : int;
//private var ringScore : int;
private var lives : int;
private var speed : float;
private var rotateSpeed : float;
private var flyingUpCounter : int;


// Game control booleans
private var isGameWon = false;
private var isGameOver = false;
private var isTimeUp = false;
private var isGamePaused = false;
private var lostAllLives = false;
private var speedBoost = false;
//private var updateScore = true;
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
private var countdownTime : float;
private var blinkflag : int;

// Gameplay displays
private var plane_shield: GameObject;

private var numRingsText: GUIText;
private var paperPlane : GameObject;
//private var scoreText : GUIText;
private var timeText : GUIText;
private var plusText : GUIText;
private var countdownText : GUIText;
private var pauseButton : GUITexture;
private var numRingsImage : GUITexture;
private var heart1 : GUITexture;
private var heart2 : GUITexture;
private var heart3 : GUITexture;
private var heart_disabled : Color = Color(1.0, 0.0, 0.0, 0.2);
private var heart_enabled : Color = Color(1.0, 0.0, 0.0, 1.0);

private var gameStartColor : Color = Color(0.0, 0.0, 0.0, 0.6);
private var gameOverColor : Color = Color(0.0, 0.0, 0.36, 1.0);
private var gameWonColor : Color = Color(0.1, 0.5, 0.1, 1.0);
private var gamePauseColor : Color = Color(0.3, 0.0, 0.4, 1.0);

private var gameEndTextStyle : GUIStyle;
private var reasonTextStyle : GUIStyle;
private var yourUsedTimeTextStyle : GUIStyle;

//Tutorial Use
private var guidanceText: GUIText;
private var guidanceState: int;
private var isGuidanceShown:int;
private var guidanceSetTimer:int;
private var guidanceSetDistance:int;
private var guidanceTexture :Texture2D;


function Start(){
	// Initialize the level
	//score = 0;
	numRings = numEasy + numMedium + numHard;
	//ringScore = (30 * numEasy) + (60 * numMedium) + (90 * numHard);
	totalTime = 120;
	timer = 120;
	lives = 3;
	speedBoostCounter = 0;
	speedBoostTime = 5;
	plusTextWaitTime = 0;
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
	lostAllLives = false;
	speedBoost = false;
	//updateScore = true;
	invincibleMode = false;
	isFlyingUp = false;
	inCountdown = true;
	
	// Gameplay Text
	plane_shield= GameObject.Find("Invincible Shield Body");
	plane_shield.renderer.enabled= false;

	paperPlane = GameObject.Find("Paper Plane Body");
	//scoreText = GameObject.Find("Score").guiText;
	timeText = GameObject.Find("Time").guiText;
	plusText = GameObject.Find("Plus Points Text").guiText;
	countdownText = GameObject.Find("Countdown Text").guiText;
	numRingsImage = (GameObject.Find("Ring Count Image").GetComponent(GUITexture)as GUITexture);
	numRingsImage.color = Color.yellow;
	numRingsText= GameObject.Find("Ring Count Text").guiText;
	numRingsText.text = numRings.ToString();
	numRingsText.color = Color.yellow;
	
	//Tutorial Use
	isGuidanceShown = 0;
	if (levelInt == 0) {
		guidanceText = GameObject.Find("Guidance").guiText;
		guidanceState = 1;//Start
		guidanceSetTimer = 115;
		guidanceSetDistance = 300;
		guidanceText.fontSize = Mathf.Floor(Screen.dpi/7);
		guidanceText.pixelOffset.y = 0;
		guidanceText.color = Color.black;
		guidanceText.text = "Welcome to the world of paper plain\n";
	}
		
	pauseButton = (GameObject.Find("Pause Button").GetComponent(GUITexture)as GUITexture);
	heart1 = (GameObject.Find("heart1").GetComponent(GUITexture)as GUITexture);
	heart2 = (GameObject.Find("heart2").GetComponent(GUITexture)as GUITexture);
	heart3 = (GameObject.Find("heart3").GetComponent(GUITexture)as GUITexture);
	heart1.color = heart_enabled;
	heart2.color = heart_enabled;
	heart3.color = heart_enabled;
	
	// Show the start display
	//UpdateScore();
	HidePlusText();	
	UpdateRingCounter();
	
	
	// Pause Button
	pauseButton.pixelInset.width = 0.08 * Screen.width;
	pauseButton.pixelInset.height = pauseButton.pixelInset.width;
	pauseButton.pixelInset.position.x = Screen.width/3 + 70;
	pauseButton.pixelInset.position.y = Screen.height/2.9;
	
	//ring countdown text position
	numRingsText.pixelOffset.x = -Screen.width/2 + 115;
	numRingsText.pixelOffset.y = -Screen.height/3 - 80;
	numRingsText.fontSize = Mathf.Floor(Screen.dpi/6);
	
	// ring countdown image position
	numRingsImage.pixelInset.width = 0.04 * Screen.width;
	numRingsImage.pixelInset.height = numRingsImage.pixelInset.width;
	numRingsImage.pixelInset.x = -Screen.width/2 + 20;
	numRingsImage.pixelInset.y = -Screen.height/3 - 110;
	
	
	//scoreText.fontSize = Mathf.Floor(Screen.dpi/5);
	timeText.fontSize = Mathf.Floor(Screen.dpi/4);
	plusText.fontSize = Mathf.Floor(Screen.dpi/7);
	
	// Countdown Text
	countdownText.fontSize = Mathf.Floor(Screen.dpi/2);	
	
	//scoreText.pixelOffset.x = -Screen.width/3 - 90;
	//scoreText.pixelOffset.y = Screen.height/2.5;
	
	timeText.pixelOffset.y = -Screen.height/3 - 70;
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
    reasonTextStyle.fontSize = Mathf.Floor(Screen.dpi/4);
    reasonTextStyle.font = AvenirNextMedium;
    reasonTextStyle.alignment = TextAnchor.MiddleCenter;
    reasonTextStyle.normal.textColor = Color.white;
    
    yourUsedTimeTextStyle = new GUIStyle();
    yourUsedTimeTextStyle.fontSize = Mathf.Floor(Screen.dpi/4);
    yourUsedTimeTextStyle.font = AvenirNextMedium;
    yourUsedTimeTextStyle.alignment = TextAnchor.MiddleCenter;
    yourUsedTimeTextStyle.normal.textColor = Color.white;		
    
    UnPauseGame();
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
			if (lostAllLives) {
				GUI.Label(Rect (Screen.width/2-50, Screen.height/2-95, 100, 50), "You lost all your lives!", reasonTextStyle);
			} else {
				GUI.Label(Rect (Screen.width/2-50, Screen.height/2-95, 100, 50), "You hit the terrain!", reasonTextStyle);
			}
		}
		if (isGameWon){
			GUI.color = gameWonColor;
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), overlay);
			GUI.color = Color(1.0, 0.68, 0.0, 1.0);
			GUI.Label(Rect (Screen.width/2-50, Screen.height/4, 100, 50), "LEVEL COMPLETE", gameEndTextStyle);
			GUI.color = Color.white;
			//GUI.Label(Rect (Screen.width/2-50, Screen.height/2-95, 100, 50), "You collected all the rings!", reasonTextStyle);
		}
		if (isTimeUp) {
			GUI.color = gameWonColor;
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), overlay);
			GUI.color = Color(1.0, 0.68, 0.0, 1.0);
			GUI.Label(Rect (Screen.width/2-50, Screen.height/4, 100, 50), "TIME'S UP!", gameEndTextStyle);
			GUI.color = Color.white;
		}
		if (isGamePaused && (!isGameOver && !isGameWon && !isTimeUp)) {
			//Tutorial Use
			if (!isGuidanceShown) {
			//	if(!isGuidanceShown){
					GUI.color = gamePauseColor;
					GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), overlay);
					GUI.color = Color.white;
					GUI.Label(Rect (Screen.width/2-50, Screen.height/3, 100, 50), "PAUSED", gameEndTextStyle);

					// Play button
	    			if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) + Screen.width * 0.13,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), playButton, GUIStyle.none)) {
	        			UnPauseGame();
	    			}
					//Tutorial Use
				//} else {
					
			} else {
				GUI.color = Color.clear;
				GUI.Box(new Rect(0,0,Screen.width,Screen.height),"");
			}
			
		//	}
			// GUI.color = gamePauseColor;
// 			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), overlay);
// 			GUI.color = Color.white;
// 			GUI.Label(Rect (Screen.width/2-50, Screen.height/3, 100, 50), "PAUSED", gameEndTextStyle);
// 
// 			// Play button
//     		if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) + Screen.width * 0.13,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), playButton, GUIStyle.none)) {
//         		UnPauseGame();
//     		}
		} else {
		
			var usedTime = totalTime - timer;
			var secs: int = usedTime % 60;
			var mins: int = usedTime / 60;
			var usedTimeString = String.Format("{0:0}:{1:00}", mins, secs);
			
			
			GUI.Label(Rect (Screen.width*1/3 - 150, Screen.height/2 + 20, 100, 50), "Time elapsed:", yourUsedTimeTextStyle);
			GUI.Label(Rect (Screen.width/2, Screen.height/2 + 20, 100, 50),  usedTimeString, yourUsedTimeTextStyle);
			//GUI.Label(Rect (Screen.width/4, Screen.height/2 + 100, 110, 50), "total time:", yourUsedTimeTextStyle);
			//GUI.Label(Rect (Screen.width/2 - 50, Screen.height/2 + 110, 100, 50), "---", yourUsedTimeTextStyle);
	    	
	    	// Draw stars depending on the score
			GUI.color = Color(1.0, 0.68, 0.0, 1.0);

			if (!isGameOver) {
				
				if (usedTime <= totalTime  && usedTime > (totalTime / 4) * 3 ) {
					GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
				}
				else if (usedTime <= (totalTime / 4) * 3 && usedTime > totalTime/2) {
					GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
					GUI.DrawTexture(Rect(Screen.width*2/3 - 130, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
				}else if (usedTime <= totalTime / 2 ) {
					GUI.DrawTexture(Rect(Screen.width*2/3, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
					GUI.DrawTexture(Rect(Screen.width*2/3 + 260, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
					GUI.DrawTexture(Rect(Screen.width*2/3 + 130, Screen.height/2, 0.06 * Screen.width, 0.06 * Screen.width), endStar);
				}
				
			}

			// Next button
			GUI.color = Color.white;
    		if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) + Screen.width * 0.13,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), nextButton, GUIStyle.none)) {
        		//UnPauseGame();
        		LoadNextLevel();       		
    		}
		}
		if(!isGuidanceShown){
			// Always draw the back & replay buttons
			GUI.color = Color.white;
			// Back button
			if (GUI.Button (Rect ((Screen.width/2 - 0.1 * Screen.width/2) - Screen.width * 0.13 ,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), backButton, GUIStyle.none)) {
	        	//UnPauseGame();       	
	        	Application.LoadLevel("Levels");
	    	}
			
			// Replay		
			if (GUI.Button (Rect (Screen.width/2 - 0.1 * Screen.width/2,Screen.height * 4/6, 0.1 * Screen.width, 0.1 * Screen.width), replayButton, GUIStyle.none)) {
		        //UnPauseGame();
				Application.LoadLevel(Application.loadedLevel);
		    }
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
 		//ChangePlaneColor(Color.black);
 		//yield WaitForSeconds(0.3);
 		//ChangePlaneColor(Color.white);
 		StartCoroutine(Blink(2.0));
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
		
			/*
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
			}*/
			
			ring.renderer.material.color = Color.red;
			numRingsCounter++;
			UpdateRingCounter();
			if (numRingsCounter == numRings) {
				GameWon();
			}
		}		
	}
	
	// If hits a heart
	if (other.name == "Heart Body") {
		IncreaseLives(1);
		if (lives == 3) {	
			//ShowPlusText("+100");
			//AddScore(100);	
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
	

	// If hits a shield
	if (other.name == "Shield Body"){
		plane_shield.renderer.enabled= true;
		MakeInvincible(5);   
		Destroy(other.gameObject);
		ChangePlaneColor(Color(0.4, 0.0, 0.7, 1.0));
	}
	
}
 
// Update function called every frame
function Update() {
	if (!isGamePaused && !inCountdown) {
	
		// Run the timer
		RunTimer();

		// Control the character
    	var controller : CharacterController = GetComponent(CharacterController);
//    	transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);
//    	var h = Input.GetAxis("Vertical"); // use the same axis that move back/forth
//    	var v = Input.GetAxis("Horizontal"); // use the same axis that turns left/right

	    transform.Rotate(0, Input.acceleration.x * rotateSpeed, 0);
	    var h = Input.acceleration.y;
	    var v = Input.acceleration.x;
    	
    	// forth/back banking first!
    	transform.localEulerAngles.x = -v*60; 

	    
	    // Move the plane forward at a constant speed
	    if (speedBoost) {
	    	transform.Translate(3.8, 0, 0);
	    } else {
	    	if (inCountdown) {
	    		transform.Translate(0, 0, 0);
	    	} else{
	    		transform.Translate(1.8, 0, 0);
	    	}
	    }
	    
	    // Give a speedboost
	    //if (speedBoostCounter >= speedBoostTime * 60) {
	    if (Time.time >= endspeedBoostTime){
	    	speedBoost = false;
	    	ChangePlaneColor(Color.white);
	    	speedBoostTime = 10000;
	    }
	    
	   /* if (invincibleCounter == (invincibleTime - 1) * 60){
	    	StartCoroutine(Blink(2.0));
	    }*/
	     
	       
	    // Make invincible
	    if (Time.time >= endinvincibleTime){
	    	plane_shield.renderer.enabled= false;
	    	invincibleMode = false;
	    	ChangePlaneColor(Color.white);
	    	endinvincibleTime = 10000;
	    } else {
	    	if (Time.time >= (endinvincibleTime-3.0) && Time.time < (endinvincibleTime)){
	    	if(blinkflag == 1)
	    	{
	    		StartCoroutine(Blink(2.0));
	    		blinkflag = 0;
	    	}
	    	}
	    }
	    
	     
	    // Move plane up (when spacebar is pressed)
	    if (!isFlyingUp) {
	    	transform.localEulerAngles.z = -5;  // left/right
	    } else{
	    	transform.localEulerAngles.z = 20;
	    	flyingUpCounter++;
	    }	    
	    if (flyingUpCounter >= 18) {
	    	isFlyingUp = false;
	    	flyingUpCounter = 0;
	    }
	    
	    
	    
	    //Tutorial Use
		//Show guidance in tutorial level	
		if (levelInt == 0) {
			if(guidanceState>0){
				if(rigidbody.position.x>guidanceSetDistance){
					guidanceState++;
					
					guidanceSetDistance += 300;
					if(guidanceState ==10){
						guidanceSetDistance = 99999;
					}
					ShowGuidance();
				}
			}
		}
    } else {  
    
    	if(isGuidanceShown){		
			if(levelInt ==0){
					GuidanceTimer();
			}
		} else {
			RunCountdown();
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
					//print("pause button");
					if(Input.GetTouch(0).phase == TouchPhase.Began){
						PauseGame();
					}
				}
				if(Input.GetTouch(i).phase == TouchPhase.Began){
					//print("speed up");
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
    		heart3.enabled = false;	
    	}
	    if (lives == 1) {
	    	heart2.enabled = false;
	    }   
	    if (lives == 0) {
	    	heart1.enabled = false;
				lostAllLives = true;
	    	GameOver();
	    }
    }
}


// Increases the number of lives by newLifeValue, updates hearts
function IncreaseLives (newLifeValue : int) {
	if (lives <= 2){
	    lives += newLifeValue;
	    if (lives == 3) {
	    	heart3.enabled = true;
	    }
	    if (lives == 2) {
	    	heart2.enabled = true;
	    }   
	    if (lives == 1) {
	    	heart1.enabled = true;
	    }
    }
}


// Increase the speed of the plane due to a lightning bolt
function IncreaseSpeed() {
	endspeedBoostTime = Time.time+3.0;
	speedBoost = true;

}

/*
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
*/
//updates ring counter text which shows number of rings left to collect
function UpdateRingCounter(){
	numRingsText.text= (numRings - numRingsCounter).ToString();
}

// Call when level has been won
function GameWon() {
	isGameWon = true;
	yield WaitForSeconds(0.4);
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
	//scoreText.enabled = false;
	heart1.enabled = false;
	heart2.enabled = false;
	heart3.enabled = false;
	plusText.enabled = false;
	pauseButton.enabled = false;
	numRingsText.enabled = false;
	numRingsImage.enabled = false;
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

function RunCountdown(){
	if (countdownTime > 0){
		countdownTime -= Time.deltaTime;
		countdownText.text = Mathf.Ceil(countdownTime).ToString();
	} else {
		EndCountdown();
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
	endinvincibleTime=Time.time + 5.0;
	print(Time.time + endinvincibleTime);
	invincibleTime = invincibleValue;
	invincibleMode = true;
	blinkflag = 1;
}

function EndCountdown() {
	inCountdown = false;
	countdownText.enabled = false;
}

function ChangePlaneColor( c : Color) {
	paperPlane.renderer.material.color = c;
}



function LoadPreviousLevel() {
	if (levelInt == 0) {
		Application.LoadLevel("Level3");
	} else {
		Application.LoadLevel("Level" + (levelInt-1).ToString());
	}
}

function LoadNextLevel() {
	if (levelInt == 3) {
		Application.LoadLevel("Level0");
	} else {
		Application.LoadLevel("Level" + (levelInt+1).ToString());
	}
}



//Tutorial Use
////Show guidance in tutorial level
function ShowGuidance(){
	guidanceText.enabled = true;
	guidanceSetTimer = 180;
	PauseGame(); 
	switch(guidanceState){
			case 1:
			guidanceText.text ="Welcome to the world of paper plain\n";
			break;
		case 2:
			guidanceText.text = "Turn\n \nRotate your phone to turn left or right\n";
			break;
		case 3:
			guidanceText.text = "Going up \n \nYou can tap screen to fly up\n though there's a maximum height";
			break;
		case 4:
			guidanceText.text = "Targets: Go through the rings\n \nAs many rings as possible in the limited time!\n";
			break;
		case 5:
			guidanceText.text = "Obstacles\n \nHitting obstacles will damage your paper plane\n(you lose heart)\n";
			break;
		case 6:
			guidanceText.text = "Heart items\n \nHeart items can replenish your heart loss";
			break;
		case 7:
			guidanceText.text = "Lightning items\n \nLightning items can speed you up for a short time";
			break;
		case 8:
			guidanceText.text = "Shield items\n \nIt will give you a shield against annoying obstacles";
			break;
		case 9:
			guidanceText.text = "Well done\n \nLet's go through all the rings in this level! ";
			break;
		case 10:
			guidanceText.text = "Make sure you take all the rings before time is up. \nHappy flying!!!";
			break;
	}
	isGuidanceShown = 1;
}

function HideGuidance(){
	guidanceText.enabled = false;
	UnPauseGame();	
	isGuidanceShown = 0;	
}
function GuidanceTimer(){
	if(guidanceSetTimer>0){
		guidanceSetTimer --;
	}else{
		HideGuidance();
	}
}

function Blink(waitTime : float) {
    var endTime=Time.time + waitTime;
    while(Time.time<endTime){
        paperPlane.renderer.enabled = false;
        if(invincibleMode)
        {
        	plane_shield.renderer.enabled= false;
        }
        yield WaitForSeconds(0.2);
        if(invincibleMode)
        {
        	plane_shield.renderer.enabled= true;
        }
        paperPlane.renderer.enabled = true;
        yield WaitForSeconds(0.2);
        
        
    }
}
