var LevelControls : LevelControls;
var LevelDisplay : LevelDisplay;

var boostCount : int;
var endinvincibleTime = 10000;
var endspeedBoostTime = 10000;

private var lives : int;
private var speed : float;

// Game control booleans
private var speedBoost = false;
private var invincibleMode = false;

private var speedBoostCounter : int;
private var speedBoostTime : int;
private var invincibleTime : float;
private var invincibleCounter : int;
private var blinkflag : int;

// GameObjects
private var plane_shield: GameObject;
private var paperPlane : GameObject;

private var isCircleCollision = false;
private var isRingCollision = false;

function Start(){
	// Initialize the plane	
	paperPlane = GameObject.Find("Paper Plane Body");
	plane_shield= GameObject.Find("Invincible Shield Body");
	plane_shield.renderer.enabled= false;
	
	lives = 3;
	boostCount = 0;
	speedBoostCounter = 0;
	speedBoostTime = 5;
	speed = 1.0;	
	
	speedBoost = false;
	invincibleMode = false;
	
}



// Collision with non-trigger objects -- for us, this is the terrain
function OnCollisionEnter(collision : Collision) {
	//print("Collision with " + collision);
	//print("Collision with Terrain; Lives: " + lives);
	if(collision.gameObject.tag =="OuterRing")
	{
		isRingCollision= true;
	}
	else
	{
		if (!invincibleMode){
			DecreaseLives(1);
	 		StartCoroutine(Blink(2.0));
	 		//GameObject.Find("Plane").rigidbody.freezeRotation = true;
			//LevelControls.GameOver();
		}	
	}
}
 
// Collisions with trigger objects
 function OnTriggerEnter (other : Collider) {
 	print("Collision with " + other.name);
 	
 	
 	// Collision with Obstacle Sphere
 	if(other.tag == "Sphere"){
 		if (!invincibleMode){
	 		DecreaseLives(1);
	 		StartCoroutine(Blink(2.0));
	 	}
 	} 	
 	if (other.transform.IsChildOf(transform))
			return;			
			
	
	
	//Collision with actual outer ring
	if(other.tag == "OuterRing"){
		isRingCollision= true;
 		print("Did not pass through ring");
  	} 	
	
	
	// Collision with Ring's inner circle
	if (other.name == "Circle") {
		//print("Root is " + other.transform.root.name);
		isCircleCollision= true;
		
		var ring : Transform = other.transform.parent;
				if(!isRingCollision)
				{
					print("Passed through ring");
		 								
					if(ring.renderer.enabled == true)
					{
						var PS = ring.Find("ParticleSystem");
						//PS.active= true;
						PS.particleEmitter.Emit();
					
						ring.renderer.enabled=false;
						LevelControls.UpdateRingCounter();
						if (LevelControls.numRingsCounter == LevelControls.numRings) {
							LevelControls.GameWon();
						}
					}	
				}
			
	}
	
	
	// Collision with Heart
	if (other.name == "Heart Body") {
		IncreaseLives(1);
		LevelDisplay.ShowPlusText("+1 Life");
		Destroy(other.gameObject);
	}
	
	
	// Collision with Lightning Bolt
	if (other.name == "Lightning Body"){
		SaveBoost();
		Destroy(other.gameObject);
		//ChangePlaneColor(Color.yellow);
	}
	

	// Collision with Shield
	if (other.name == "Shield Body"){
		plane_shield.renderer.enabled= true;
		MakeInvincible(5);   
		Destroy(other.gameObject);
		//ChangePlaneColor(Color(0.4, 0.0, 0.7, 1.0));
	}
	
}

//function OnCollisionExit(collisionInfo : Collision) {
//		print("No longer in contact with " + collisionInfo.transform.name);
//		isRingCollision= false;	
//	}

function OnTriggerExit (other : Collider) {
			
		isRingCollision= false;
}
 
// Update function called every frame
function Update() {
	if (!LevelControls.isGamePaused && !LevelControls.inCountdown) {

	    
	    // Move the plane forward at a constant speed
	    if (speedBoost) {
	    	transform.Translate(3.8, 0, 0);
	    } else {
	    	if (LevelControls.inCountdown) {
	    		transform.Translate(0, 0, 0);
	    	} else{
	    		transform.Translate(1.8, 0, 0);
	    	}
	    }
	    
	    // Give a speedboost
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
		    	if(blinkflag == 1) {
		    		StartCoroutine(Blink(2.0));
		    		blinkflag = 0;
		    	}
	    	}
	    }  
    }
}


function FixedUpdate () {
	if (!LevelControls.isGamePaused) {		
		if(Input.touchCount > 0) {
			for(var i = 0; i < Input.touchCount; ++i){
			
				// If hit pause button
				if(LevelDisplay.pauseButton.HitTest(Input.GetTouch(0).position)){
					if(Input.GetTouch(0).phase == TouchPhase.Began){
						LevelControls.PauseGame();
					}
				}
				
				// If hit boost button
				if(LevelDisplay.boost.HitTest(Input.GetTouch(0).position)){
					if(boostCount>0){
						boostCount--;
						IncreaseSpeed();
					}
					if(boostCount == 0){
						LevelDisplay.boost.enabled = false;
						//LevelDisplay.boost.color = LevelDisplay.boost_enabled;
					}
				}
			}
		}
	}	
}
 


// Change the plane color
function ChangePlaneColor( c : Color) {
	paperPlane.renderer.material.color = c;
}

 
// Descreases the number of lives by newLifeValue, updates hearts, and checks for game over
function DecreaseLives (newLifeValue : int) {
	if (!invincibleMode) {
    	lives -= newLifeValue;
    	if (lives == 2) {
    		LevelDisplay.heart3.enabled = false;	
    	}
	    if (lives == 1) {
	    	LevelDisplay.heart2.enabled = false;
	    }   
	    if (lives == 0) {
	    	LevelDisplay.heart1.enabled = false;
			LevelControls.lostAllLives = true;
	    	LevelControls.GameOver();
	    }
    }
}
// Increases the number of lives by newLifeValue, updates hearts
function IncreaseLives (newLifeValue : int) {
	if (lives <= 2){
	    lives += newLifeValue;
	    if (lives == 3) {
	    	LevelDisplay.heart3.enabled = true;
	    }
	    if (lives == 2) {
	    	LevelDisplay.heart2.enabled = true;
	    }   
	    if (lives == 1) {
	    	LevelDisplay.heart1.enabled = true;
	    }
    }
}




// Make the plane invisible
function MakeInvincible(invincibleValue : float){
	endinvincibleTime=Time.time + 5.0;
	print(Time.time + endinvincibleTime);
	invincibleTime = invincibleValue;
	invincibleMode = true;
	blinkflag = 1;
}


// Make the plane blink
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


// Increase the speed of the plane due to a lightning bolt
function IncreaseSpeed() {
	endspeedBoostTime = Time.time+3.0;
	speedBoost = true;

}
function SaveBoost () {
	if(boostCount == 0) {
		LevelDisplay.boost.enabled = true;
		//LevelDisplay.boost.color = LevelDisplay.boost_enabled;
	}
	boostCount++;
}