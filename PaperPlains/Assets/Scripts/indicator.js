#pragma strict
var radius : float;
function Start () {
	radius = 110.0;
}

function Update () {
	var items = Physics.OverlapSphere(transform.position, radius);
	var direction : Vector3;
	var angle : float;
	var distance : float;
	for(var rings in items){
		if(rings.name == "Circle"){
			direction = transform.position - rings.gameObject.transform.position;
			angle = Vector3.Angle(transform.right, direction);
			distance = direction.magnitude;
			
			if(rings.gameObject.transform.parent.renderer.material.color != Color.red){
    			if(distance < 100 && angle > 160)
    				rings.gameObject.transform.parent.renderer.material.color = Color.green;
    			else
    				rings.gameObject.transform.parent.renderer.material.color = Color32(255,216,0,1);
    		}
    	}
	}
}