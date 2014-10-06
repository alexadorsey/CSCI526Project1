var speed : float = 1.0;
var rotateSpeed : float = 3.0;
var isFlyingUp = false;
var flyingUpCounter = 0;

var scorePosition : Rect;
var scoreText : String;

private var numRings = 10;
var maxHeight : int = 120;
var score : int;
var updateScore = true;

var isGameWon = false;
var isGameOver = false;
var isGamePaused = false;


var startTime;
var timer;

var scoreStyle : GUIStyle;
var timerStyle : GUIStyle;
var gameOverStyle: GUIStyle;

function Start(){
	score = 0;
	UpdateScore();
	timer = 60;
	
	scoreStyle = new GUIStyle();
	scoreStyle.fontSize = 20;
	scoreStyle.normal.textColor = Color.red;	
	
	timerStyle = new GUIStyle();
	timerStyle.fontSize = 35;
	timerStyle.normal.textColor = Color.blue;	
	
	gameOverStyle = new GUIStyle();
	gameOverStyle.fontSize = 40;
	gameOverStyle.normal.textColor = Color.white;	
}

function OnCollisionEnter(collision : Collision) {
	print("Collision with Terrain");
 }
 
 function OnTriggerEnter (other : Collider) {
	if (other.name == "Ring") {
		print("Collision with Ring");
		var ring: Transform = other.transform.Find("ring");
		
		// If ring is not red already, change it red
		if (ring.renderer.material.color != Color.red){
			AddScore(1);
			ring.renderer.material.color = Color.red;
		}
		
		//Destroy(other.gameObject);
	}
}
 
function Update() {
	if (!isGamePaused) {
	
		RunTimer();
		
	    var controller : CharacterController = GetComponent(CharacterController);
	    transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);
	    
	    // Move the plane forward at a constant speed
	    transform.Translate( 1.5, 0, 0);   
	    
	    // Get input to control the place
	    var h = Input.GetAxis("Vertical"); // use the same axis that move back/forth
	    var v = Input.GetAxis("Horizontal"); // use the same axis that turns left/right
	    transform.localEulerAngles.x = -v*60; // forth/back banking first!
	    
	    // Move plane up
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
		if (Input.GetKeyDown (KeyCode.Space)) {		
			print("space bar pressed " + rigidbody);
			isFlyingUp = true;
			//rigidbody.velocity = Vector3(0, 20, 0);
		}
	}
	
}

function OnGUI () {
	GUI.Label(new Rect(265, 40, 300, 50), scoreText.ToString() + "/" + numRings, scoreStyle);
	GUI.Label(new Rect(250, 5,300,50), "0:" + timer.ToString("0"), timerStyle);
	if (isGameWon) {		
		GUI.Label(new Rect(150, 100, 300, 50), "Level Complete", gameOverStyle);
	}
	if (isGameOver) {		
		GUI.Label(new Rect(150, 100, 300, 50), "Game Over", gameOverStyle);
	}
}


function AddScore (newScoreValue : int) {
    score += newScoreValue;
    UpdateScore();
    if (score == numRings){
		GameWon();
	}
}

function UpdateScore() {
	scoreText = score.ToString();
}

function GameWon() {
	print("LEVEL COMPLETE");	
	yield WaitForSeconds(0.5);
	isGameWon = true;
	PauseGame();
	ShowGameWonScreen();
}

function ShowGameWonScreen() {
	
}

function GameOver(){
	print("GAME OVER");
	isGameOver = true;
	PauseGame();
	ShowGameWonScreen();
}

function ShowGameOverScreen() {
}

function PauseGame() {
	isGamePaused = true;
	Time.timeScale=0;
}

function UnPauseGame(){
	isGamePaused = false;
	Time.timeScale=1;
}

function RunTimer(){
	if (timer > 0){
		timer -= Time.deltaTime;
	} else {
		GameOver();
	}
}


