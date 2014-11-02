#pragma strict


public var LevelControls : LevelControls;


function OnTriggerEnter (other : Collider) {
 
	
	if (other.name == "Ring") {
		print("Collision with Ring");
		other.renderer.material.color = Color.red;
	}

	var ringgroup:String[] = ["ring1","ring2","ring3","ring4","ring5","ring6","lastring"];
	var objectName = this.transform.parent.name;
	
	
	if (objectName.Substring(0,objectName.length-1) == "ring"){
		Debug.Log("Collision with ring");
		
		var currIndex = ArrayUtility.IndexOf(ringgroup,objectName);
		
		
		if (currIndex + 1< ringgroup.Length){
			var nextIndex = currIndex + 2;
			nextIndex = nextIndex - nextIndex % 2;
			
			
			var currentGameObject = GameObject.Find(ringgroup[nextIndex]);
			if (currentGameObject.name != "lastring"){
			
				
				var currentGameObject2 = GameObject.Find(ringgroup[nextIndex + 1]);
				currentGameObject.GetComponent(MeshRenderer).enabled = true;
				currentGameObject2.GetComponent(MeshRenderer).enabled = true;
				//wait for 4 seconds
				yield WaitForSeconds(4);
				currentGameObject.GetComponent(MeshRenderer).enabled = false;
				currentGameObject2.GetComponent(MeshRenderer).enabled = false;
				
			}else {
				currentGameObject.GetComponent(MeshRenderer).enabled = true;
				//wait for 4 seconds
				yield WaitForSeconds(4);
				currentGameObject.GetComponent(MeshRenderer).enabled = false;
				
			}
		}
		
	
	}
	
}

function Start () {
	gameObject.renderer.material.color.a = 0.0;
	
	
//	ringgroup = GameObject.FindGameObjectsWithTag("ringgroup");
//	
//	Debug.Log(ringgroup);
	//var index = ringgroup.IndexOf(ringgroup,"ring0");
	//Debug.Log(index);
//	
//	
	var gos2 : GameObject[];
	gos2 = GameObject.FindGameObjectsWithTag("ringgroup");
	
	for (var i in gos2){
		Debug.Log(i.gameObject.name);
		i.GetComponent(MeshRenderer).enabled = false;
		
	}
	
	
	
}

function Update () {
	

}