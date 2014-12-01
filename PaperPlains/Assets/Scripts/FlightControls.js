var LevelControls : LevelControls;
var LevelDisplay : LevelDisplay;
var indicator : indicator;
var boostCount : int;
var endinvincibleTime = 10000;
var endspeedBoostTime = 10000;

private var counter :int;

private var lives : int;
private var speed : float;

// Game control booleans
private var speedBoost = false;
static var invincibleMode = false;

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

/*-------------------------------------------------------------------------*/
/*added by Jing for mini map*/	
private var tex2d : Texture2D;	//map texture
private var mapSize = Screen.width * 0.23;	//map size, proportional to terrain
private var oldX : int;
private var oldY : int;
private var oldForward : Vector3;
private var oldRight : Vector3;
private var plane : GameObject;
private var terrainSize : int;
private var backgroundColor : Color = new Color32(0, 0, 0, 150);
private var ringSize : int = 10;
/*-------------------------------------------------------------------------*/


function Start(){
// Initialize the plane	
	paperPlane = GameObject.Find("Paper Plane Body");
	plane_shield= GameObject.Find("Invincible Shield Body");
	plane_shield.renderer.enabled= false;
	
	counter = 0;
	
	lives = 3;
	boostCount = 0;
	speedBoostCounter = 0;
	speedBoostTime = 5;
	speed = 1.0;	
	
	speedBoost = false;
	invincibleMode = false;
	
/*-------------------------------------------------------------------------*/
/*added by Jing for mini map*/	
	//create a mini map
	var map : GameObject = new GameObject("Mini Map");
	var land : Terrain = GameObject.Find("Terrain").GetComponent("Terrain");
	terrainSize = land.terrainData.size.x;
	map.AddComponent("GUITexture");
	map.guiTexture.transform.localScale =  Vector3.zero;
	map.guiTexture.pixelInset = new Rect(Screen.width * 0.76,Screen.width * 0.01, mapSize, mapSize);
	tex2d = new Texture2D(mapSize, mapSize);
	for (var y : int = 0; y < mapSize; ++y) {
		for (var x : int = 0; x < mapSize; ++x) 
			tex2d.SetPixel (x, y, backgroundColor);
	}
	tex2d.Apply();
	map.guiTexture.texture = tex2d;
	
	//set plane position
	var plane : GameObject = GameObject.Find("Plane");
	var px : int = plane.transform.position.x;	//project to x axis
	var py : int = plane.transform.position.z;	//project z axis to y axis
	var forward : Vector3 = plane.transform.right;
	var right : Vector3 = plane.transform.forward;
	drawPlane(px,py,forward,right, Color.white);
	//record the last position
	oldX = px;
	oldY = py;
	oldForward = forward;
	oldRight = right;
	print(px);
	print(py);
	
	//set all rings in the mini map
	var allRings = GameObject.FindGameObjectsWithTag("Circle");
	for(var target in allRings){
		var rx : int = mapSize * target.transform.position.x / terrainSize;	//project to x axis
		var ry : int = mapSize * target.transform.position.z / terrainSize;	//project z axis to y axis
		draw(rx,ry,ringSize,Color.yellow);
	}
	
/*----------------------------------------------------------------------------*/
}



// Collision with non-trigger objects -- for us, this is the terrain
function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag =="OuterRing")
	{
		isRingCollision= true;
	}
	else
	{
		if (!invincibleMode){
			DecreaseLives(10);
	 		StartCoroutine(Blink(2.0));
		}	
	}
}
 
 
// Collisions with trigger objects
 function OnTriggerEnter (other : Collider) {
 	print("Collision with " + other.name);
 	
 	
 	// Collision with Obstacle Sphere
 	if(other.tag == "Sphere"){
 		if (!invincibleMode){
	 		DecreaseLives(10);
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
	

	if (other.name == "Circle") {
		//print("Root is " + other.transform.root.name);
		isCircleCollision= true;
		
		var ring : Transform = other.transform.parent;
		if(!isRingCollision)
		{
			print("Passed through ring");
 								
			if(ring.renderer.enabled == true)
			{				
				ring.renderer.material.color = Color.red;
/*-------------------------------------------------------------------------*/
/*added by Jing for mini map*/
/*diasble the ring in the mini map*/
				var rx : int = mapSize * other.transform.position.x / terrainSize;
				var ry : int = mapSize * other.transform.position.z / terrainSize;
				draw(rx,ry,ringSize*2,backgroundColor);
/*-------------------------------------------------------------------------*/
				var PS = ring.Find("ParticleSystem");
				PS.particleEmitter.Emit();
				
				/*
				if (ring.name != "ring0"){
					ring.renderer.enabled=false;
					
				}
				*/
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
		Destroy(other.gameObject);
		IncreaseLives(10);
		//LevelDisplay.ShowPlusText("+ Health");
		LevelControls.healthIncFlag= true;
		yield WaitForSeconds(0.2);
		LevelControls.healthIncFlag= false;
		
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

function OnTriggerExit (other : Collider) {
		isRingCollision= false;
}
 
// Update function called every frame
function Update() {

	counter++;
	if (!LevelControls.isGamePaused && !LevelControls.inCountdown) {
	    // Move the plane forward at a constant speed
	    if (speedBoost) {
	    	transform.Translate(3.8, 0, 0);
	    } else {
	    	if (LevelControls.inCountdown) {
	    		transform.Translate(0, 0, 0);
	    	} else{
	    		transform.Translate(2.2, 0, 0); //1.8
	    	}
	    }
	    
	    // Give a speedboost
	    if (Time.time >= endspeedBoostTime){
	    	speedBoost = false;
	    	ChangePlaneColor(Color.white);
	    	speedBoostTime = 10000;
	    }       
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
/*-------------------------------------------------------------------------*/
/*added by Jing for mini map*/
/*track position of the plane in the mini map*/
	if (counter % 15 == 0) {
		drawPlane(oldX,oldY,oldForward,oldRight,backgroundColor);
		var plane : GameObject = GameObject.Find("Plane");
		var px : int = plane.transform.position.x;	//project to x axis
		var py : int = plane.transform.position.z;	//project to y axis
		var forward : Vector3 = plane.transform.right;
		var right : Vector3 = plane.transform.forward;
		//print("x:" + px);
		drawPlane(px,py,forward,right,Color.white);
		oldX = px;
		oldY = py;
		oldForward = forward;
		oldRight = right;
	}
		
/*------------------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/*added by Jing for mini map*/
function draw(x : int, y : int, psize : int, color: Color){
		for(var i = -psize; i <= psize; i++)
			for(var j = -psize; j <= psize; j++){
				tex2d.SetPixel(x + i,y + j, color);
			}
        tex2d.Apply();
}

function drawPlane(x : int, y : int, forward : Vector3, right : Vector3,color: Color){
		var position = Vector3(x,0,y);
		for(var i : int = 0; i < 80; i++){
			var coor : Vector3 = position + forward * i;
			for(var j : int = -1 * (80-i) / 3; j <= (80-i) / 3; j++){
				var coorIn : Vector3 = coor + right * j;
				var px : int = mapSize * coorIn.x / terrainSize;	//project to x axis
				var py : int = mapSize * coorIn.z / terrainSize;	//project to y axis
				if(tex2d.GetPixel(px, py) != Color.yellow)
					tex2d.SetPixel(px, py, color);
			}
		}
	
        tex2d.Apply();
}

/*--------------------------------------------------------------------------*/

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
	
	if (LevelDisplay.pauseButton.HitTest(Input.mousePosition)) {
            LevelControls.PauseGame();
    }
	if (LevelDisplay.boost.HitTest(Input.mousePosition)) {
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
 


// Change the plane color
function ChangePlaneColor( c : Color) {
	paperPlane.renderer.material.color = c;
}

 
// Descreases the number of lives by newLifeValue, updates hearts, and checks for game over
function DecreaseLives (newLifeValue : float) {

	//if (!invincibleMode) {
	var newHealth: float = LevelControls.curHealth- newLifeValue; 
	LevelControls.curHealth=  Mathf.Max(0.0, newHealth);

	LevelControls.healthDecFlag= true;
	yield WaitForSeconds(0.2);
	LevelControls.healthDecFlag= false;
		
	if(LevelControls.curHealth <=0)
			LevelControls.GameOver();	
	//}

}
// Increases the number of lives by newLifeValue, updates hearts
function IncreaseLives (newLifeValue : float) {

	//don't let increased health value be greater than maxHealth
	var newHealth: float = LevelControls.curHealth+ newLifeValue; 
	LevelControls.curHealth = Mathf.Min(LevelControls.maxHealth, newHealth);	
		
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