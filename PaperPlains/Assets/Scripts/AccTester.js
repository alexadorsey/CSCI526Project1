// GameObjects
private var plane_shield: GameObject;
private var paperPlane : GameObject;

// Buttons
var backButton : GUITexture;

// Text Objects
var title : GUIText;
var instructions : GUIText;

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
	backButton = (GameObject.Find("BackButton").GetComponent(GUITexture)as GUITexture);
	backButton.pixelInset.width = 0.1 * Screen.width;
	backButton.pixelInset.height = backButton.pixelInset.width;
	
	paperPlane = GameObject.Find("Paper Plane Body");
	plane_shield= GameObject.Find("Invincible Shield Body");
	plane_shield.renderer.enabled= false;
	
	title = GameObject.Find("ControlTitle").guiText;
	title.fontSize = Mathf.Floor(Screen.dpi/5);
	
	instructions = GameObject.Find("ControlInstructions").guiText;
	instructions.fontSize = Mathf.Floor(Screen.dpi/7);
	
	touchOn = PlayerPrefs.GetInt("touchOn");
	if (touchOn) {
		title.text = "Touch";
		instructions.text = "Hold the left side of the screen to move down\nand the right to move up";
	} else {
		title.text = "Accelerometer";
		instructions.text = "Tilt the phone to move up and down";
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
	
	Time.timeScale=1;
}

function Update () {

	
	if (touchOn) {
	
			// TO-DO: Touch Update
		
		} else {

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
	
	// Level Updates
	
	// Move the plane forward at a constant speed
	transform.Translate(1.8, 0, 0);
	
	// Back Button Listener
	if(backButton.HitTest(Input.GetTouch(0).position)){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			if(TouchPhase.Ended){
				Application.LoadLevel("Settings");
			}
		}
	}
}