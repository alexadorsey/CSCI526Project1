var LevelControls : LevelControls;
private var init : float;
private var rotateSpeed : float;

//Set initial angle
function Start () {
	init = Input.acceleration.z;
	rotateSpeed = 5.0;
}

function Update () {
	if (!LevelControls.isGamePaused) {
	
	
	
		// Up & Down
		var gap = Input.acceleration.z - init;
		// Make smooth
		if(Mathf.Abs( gap ) < 0.1){ // original: 0.05
			transform.localEulerAngles.z = -5;  // left/right
		} else {
			if (gap * 90 >= 20)
				transform.localEulerAngles.z = 20;
			else if (gap * 90 <= -20)
				transform.localEulerAngles.z = -20;
			else			
				transform.localEulerAngles.z = Mathf.Floor(gap * 90);
		}
		
		
		
		// Left & Right
		var controller : CharacterController = GetComponent(CharacterController);
		//	transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);
		//	var h = Input.GetAxis("Vertical"); // use the same axis that move back/forth
		//	var v = Input.GetAxis("Horizontal"); // use the same axis that turns left/right

	    transform.Rotate(0, Input.acceleration.x * rotateSpeed, 0);
	    var h = Input.acceleration.y;
	    var v = Input.acceleration.x;

		// forth/back banking
		transform.localEulerAngles.x = -v*60; 
	}
}