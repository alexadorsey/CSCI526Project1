#pragma strict



function Start () {
	var ringgroup = ["ring0","ring1","ring2","ring3","ring4","ring5","ring6","ring7","ring8","ring9"];
	
	var index = ringgroup.IndexOf(ringgroup,"ring0");
	Debug.Log(index);
	
	
	var gos2 : GameObject[]; 
	
	gos2 = GameObject.FindGameObjectsWithTag("ringgroup1");
	

	for (var i in gos2){
		Debug.Log(i.gameObject.name);
		i.GetComponent(MeshRenderer).enabled = false;
		
	}
 
	
}


function OnTriggerEnter (other : Collider) {
	if (other.name == "Ring") {
		print("Collision with Ring");
		other.renderer.material.color = Color.red;
	}
}