var speed : float = 1.0;
var rotateSpeed : float = 3.0;
var isFlyingUp = false;
var flyingUpCounter = 0;


private var numRings = 10;
var maxHeight : int = 120;
var score : int;
var lives : int;


// Game control booleans
var isGameWon = false;
var isGameOver = false;
var isGamePaused = false;
var speedBoost = false;
var updateScore = true;
var invincibleMode = false;


var startTime;
var timer : float;
var speedBoostCounter : int;
var speedBoostTime : int;
var plusTextWaitTime : float;
var invincibleTime : float;
var invincibleCounter : int;


// Gameplay displays
var scoreText : GUIText;
var timeText : GUIText;
var plusText : GUIText;
var heart1 : GUITexture;
var heart2 : GUITexture;
var heart3 : GUITexture;
private var heart_disabled : Color = Color(1.0, 0.0, 0.0, 0.2);
private var heart_enabled : Color = Color(1.0, 0.0, 0.0, 1.0);

var overlay : GUITexture;
private var gameOverColor : Color = Color(0.0, 0.0, 0.36, 0.5);
private var gameWonColor : Color = Color(1.0, 0.0, 0.0, 0.5);

// Game Over displays
var gameOverText : GUIText;





function Start(){
	// Initialize the level
	score = 0;
	timer = 60;
	lives = 3;
	speedBoostCounter = 0;
	speedBoostTime = 5;
	plusTextWaitTime = 0;
	
	
	// Gameplay Text
	scoreText = GameObject.Find("Score").guiText;
	timeText = GameObject.Find("Time").guiText;
	plusText = GameObject.Find("Plus Points Text").guiText;
	
	heart1 = (GameObject.Find("heart1").GetComponent(GUITexture)as GUITexture);
	heart2 = (GameObject.Find("heart2").GetComponent(GUITexture)as GUITexture);
	heart3 = (GameObject.Find("heart3").GetComponent(GUITexture)as GUITexture);
	
	// Game Over Text
	gameOverText = GameObject.Find("Game Over").guiText;
	overlay = (GameObject.Find("Overlay").GetComponent(GUITexture)as GUITexture);	
	
	// Show the start display
	UpdateScore();
	HideOverlay();
	HideGameOverScreen();
	HidePlusText();
	
}

// Check for collision with non-trigger objects -- for us, this is the terrain
function OnCollisionEnter(collision : Collision) {
	DecreaseLives(1);
	print("Collision with Terrain; Lives: " + lives);
}
 
 // Handles triggers with collisions
 // Put the outcome of each collision with a reward/obstacle here
 function OnTriggerEnter (other : Collider) {
 	print("Collision with " + other.name);
 	if (other.transform.IsChildOf(transform))
			return;
			
			
	// If hits a ring
	if (other.name == "Circle") {
		print("Root is " + other.transform.root.name);
		var ring: Transform = other.transform.root;
		
		// If ring is not red already, change it red
		if (ring.renderer.material.color != Color.red){
			AddScore(30);
			ShowPlusText("+30");
			ring.renderer.material.color = Color.red;
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
	}
	
	// If hits a star
	if (other.name == "Collectible Star"){
		MakeInvincible(10);   
		Destroy(other.gameObject);
	}
	
}
 
// Update function called every frame
function Update() {
	if (!isGamePaused) {
	
		// Run the timer
		RunTimer();
		
		// Character controls
	    var controller : CharacterController = GetComponent(CharacterController);
	    //transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);
	    transform.Rotate(0, Input.acceleration.x * rotateSpeed, 0);
	    
	    //var h = Input.GetAxis("Vertical"); // use the same axis that move back/forth
	    var h = Input.acceleration.y;
	    //var v = Input.GetAxis("Horizontal"); // use the same axis that turns left/right
	    var v = Input.acceleration.x;
	    transform.localEulerAngles.x = -v*60; // forth/back banking first!
	    
	    
	    // Move the plane forward at a constant speed
	    if (speedBoost) {
	    	transform.Translate(2.5, 0, 0);
	    } else {
	    	transform.Translate(1.5, 0, 0); 
	    }
	    if (speedBoostCounter >= speedBoostTime * 60) {
	    	speedBoost = false;
	    	speedBoostCounter = 0;
	    } else {
	    	speedBoostCounter++;
	    }
	      
	    // Invincible Counter
	    if (invincibleCounter >= invincibleTime * 60){
	    	invincibleMode = false;
	    	invincibleCounter = 0;
	    } else {
	    	invincibleCounter++;
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
				print("speed up");
				isFlyingUp = true;
			}
		
		}
	}
	
}
 
 
 
 
function OnGUI(){
	scoreText.fontSize = Mathf.Floor(Screen.dpi/5);
	timeText.fontSize = Mathf.Floor(Screen.dpi/5);
	plusText.fontSize = Mathf.Floor(Screen.dpi/5);
	
	scoreText.pixelOffset.y = Screen.height/3 + 20;
	timeText.pixelOffset.y = -Screen.height/3 - 20;
	
	heart1.pixelInset.width = 0.05 * Screen.width;
	heart1.pixelInset.height = 0.05 * Screen.width;
	heart2.pixelInset.width = 0.05 * Screen.width;
	heart2.pixelInset.height = 0.05 * Screen.width;
	heart3.pixelInset.width = 0.05 * Screen.width;
	heart3.pixelInset.height = 0.05 * Screen.width;
	
	heart1.pixelInset.position.x = -heart2.pixelInset.width * 2;
	//heart2.pixelInset.position.x = heart1.pixelInset.position.x * 2;
	heart3.pixelInset.position.x = heart2.pixelInset.width * 2;
	
	heart1.pixelInset.y = Screen.height/3 + 30;
	heart2.pixelInset.y = Screen.height/3 + 30;
	heart3.pixelInset.y = Screen.height/3 + 30;
	
	
	// Game Over Text
	gameOverText.fontSize = Mathf.Floor(Screen.dpi/2);
	gameOverText.pixelOffset.y = Screen.height/6;
	
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
	yield WaitForSeconds(0.5);
	isGameWon = true;
	PauseGame();
	ShowGameWonScreen();
}
function ShowGameWonScreen() {
	ShowOverlay(gameWonColor);
	
}



// Call when game over
function GameOver(){
	isGameOver = true;
	PauseGame();
	ShowGameOverScreen();
}

function ShowGameOverScreen() {
	ShowOverlay(gameOverColor);
	gameOverText.enabled = true;
	timeText.enabled = false;
	scoreText.enabled = false;
}

function HideGameOverScreen(){
	gameOverText.enabled = false;
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
	if (timer > 0){
		timer -= Time.deltaTime;
		var secs: int = timer % 60;
		var mins: int = timer / 60;
		timeText.text = String.Format("{0:0}:{1:00}", mins, secs);
	} else {
		GameOver();
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




