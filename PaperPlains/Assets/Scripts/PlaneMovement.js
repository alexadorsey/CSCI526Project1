﻿var LevelControls : LevelControls;

var touchOn;

// Accelerometer Variables
private var init : float;
private var old : float;
private var rotateSpeed : float;
var tiltAngle = 30.0;
private var flag: boolean;


// TO-DO: Touch Variables



function Start () {

	// Level Initializations
	if(PlayerPrefs.HasKey("touchOn")){
		touchOn = PlayerPrefs.GetInt("touchOn");
	} else {		
		PlayerPrefs.SetInt("touchOn", 0);
	}
	if (touchOn) {
	
		// TO-DO: Touch Initializations
	
	} else {
		// Accelerometer Initializations
		Screen.orientation = ScreenOrientation.LandscapeLeft;
		if(Input.acceleration.z < -0.5){
			init = Input.acceleration.y;
			flag = false;
		}
		else{
			init = Input.acceleration.z;
			flag = true;
		}
		tiltAngle = 45.0;
		rotateSpeed = 5.0;
	}
	
	

	

	
	
	
}


function Update () {
	if (!LevelControls.isGamePaused && !LevelControls.inCountdown) {
	
		if (touchOn) {
		
		} else {
			/**********************/
			// Accelerometer Update	
			var gap : float;
			if(flag)
				gap = Input.acceleration.z - init ;
			else
				gap = init - Input.acceleration.y ;
			// Make smooth
			if(Mathf.Abs( gap ) < 0.03){
				transform.localEulerAngles.z = 5;  // default angle
			} else {
				if (gap * tiltAngle >= 30)
					transform.localEulerAngles.z = 30;
				else if (gap * tiltAngle <= -30)
					transform.localEulerAngles.z = -30;
				else
					transform.localEulerAngles.z = Mathf.Lerp(0, gap ,Time.time) * tiltAngle;
			}
			
			
			// Left & Right
			// var controller : CharacterController = GetComponent(CharacterController);
			// transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);
			// var h = Input.GetAxis("Vertical"); // use the same axis that move back/forth
			// var v = Input.GetAxis("Horizontal"); // use the same axis that turns left/right

		    transform.Rotate(0, Input.acceleration.x * rotateSpeed, 0);
		    var v = Input.acceleration.x;

			// forth/back banking
			transform.localEulerAngles.x = -v * tiltAngle;  //left or right
		}
	}
}
