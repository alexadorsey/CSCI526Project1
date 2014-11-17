#pragma strict
var radius : float;
var indicator : GameObject;
public var indicatorSet : boolean;
function Start () {
	radius =800.0;
	indicator = GameObject.Find("indicator");
	indicator.active = false;	//set gameobject invisible
	indicatorSet = true;
}

function Update () {
	var items = Physics.OverlapSphere(transform.position, radius);
	//var items = GameObject.FindGameObjectsWithTag("Circle");
	var direction : Vector3;
	var angle : float;
	var distance : float;
	
	for(var rings in items){
		if(rings.name == "Circle"){
			direction = transform.position - rings.gameObject.transform.position;
			angle = Vector3.Angle(transform.right, direction);
			distance = direction.magnitude;
			
			if(rings.gameObject.transform.parent.renderer.material.color != Color.red){
				if(angle > 145 && indicatorSet){
					indicator.transform.position = rings.gameObject.transform.position + Vector3(0,30,0); //set indicator position
					indicator.active = true;	//set gameobject visible
					//indicatorSet = false;
				}
    			if(distance < 150 && angle > 160)
    				rings.gameObject.transform.parent.renderer.material.color = Color.green;
    			else
    				rings.gameObject.transform.parent.renderer.material.color = Color32(255,216,0,1);
    		}
    	}
	}
}