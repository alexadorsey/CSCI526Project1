#pragma strict

var pointB : Vector3;
 
function Start () {
    var pointA = transform.position;
    var objectName = transform.name;
    if(objectName == "RandomObstacle1"){
    
    	pointB = pointA + Vector3(0.0f,0.0f,20.0f);
    }else if(objectName == "RandomObstacle2"){
    
    	pointB = pointA + Vector3(0.0f,0.0f,-20.0f);
    }
    
    
    
    
    while (true) {
        yield MoveObject(transform, pointA, pointB, 1.0);
        yield MoveObject(transform, pointB, pointA, 1.0);
    }
}
 
function MoveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) {
	var i = 0.0;
    var rate = 1.0/time;
	while (i < 1.0) {
        i += Time.deltaTime * rate;
        thisTransform.position = Vector3.Lerp(startPos, endPos, i);
        yield; 
    }
 
}

/*
function OnTriggerEnter (hit : Collider) { 
 
    if(hit.gameObject.tag == "Drone") {
 		// decrease one life
        Destroy(this.gameObject);
 
    }
 
}
*/