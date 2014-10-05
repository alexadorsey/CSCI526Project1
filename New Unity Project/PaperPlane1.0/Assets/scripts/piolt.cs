using UnityEngine;
using System.Collections;

public class piolt : MonoBehaviour {


	public Vector3 velocity;
	public float timer ;
	public bool speedup;
	float maxHeight = 100.0f;
	float speed = 2.0f;


	private float score;


	public void addScore(){
		score++;
	}
	// Use this for initialization
	void Start () {
		velocity = new Vector3 (0.0f, 0.0f, 0.0f);
		timer = 100;
		speedup = false;

		score = 0.0f;
	}

	void OnMouseDrag() {
		Debug.Log("mouse drag");
	}
	
	void OnGUI(){
		GUIStyle gs = new GUIStyle ();
		gs.fontSize = 30;
		gs.normal.textColor = Color.white;

		string t = "Your Score: " + score;
		GUI.Label (new Rect(10,10,10,10),t,gs);
	}

	void OnCollisionEnter(Collision cc){
		if (cc.gameObject.name == "Terrain") {
			//score += 1;
			Debug.Log ("hit terrain!");
			//Application.Quit();
		} 
	}

	void FixedUpdate(){
		
		if (Input.GetKey ("space")) {
			rigidbody.velocity = new Vector3(0, 1, 0) * 5;
		}

		if(Input.touchCount == 1) {
			//velocity.y += 1.0f;
			speedup = true;
		}
		if (speedup) {
			timer --;
			if(timer > 0){
				//rigidbody.AddForce (new Vector3(0,50.0f,0));
				rigidbody.velocity = new Vector3(0, 1, 0) * 1.1f;
			}
		}
		if (timer == 0) {
			timer = 100;
			speedup = false;
		}
	}

	// Update is called once per frame
	void Update () {
		Vector3 moveCameraTo = transform.position - transform.forward * 7.0f + Vector3.up * 3.0f;
		float bias = 0.96f;
		Camera.main.transform.position = Camera.main.transform.position * bias + 
			                             moveCameraTo * (1.0f - bias);
		Camera.main.transform.LookAt(transform.position + transform.forward * 2.0f);


		transform.position += transform.forward * 0.1f;
		//speed -= transform.forward.y * Time.deltaTime * 2.0f;
	//	if (speed <3.0f) {
	//		speed =3.0f;
	//	}

//		float vertical = Input.acceleration.y;
//		float horizontal = Input.acceleration.x ;
				float vertical = Input.GetAxis ("Vertical");
				float horizontal = Input.GetAxis ("Horizontal") ;
		transform.Rotate (0.0f, horizontal,0.0f);
		/*
		float terrainHeightWhereWeAre = Terrain.activeTerrain.SampleHeight (transform.position);
		if (terrainHeightWhereWeAre > transform.position.y) {
			transform.position = new Vector3(transform.position.x,
			                                 terrainHeightWhereWeAre,
			                                 transform.position.z);
		}
*/
		// Check if plane has reached max height
		// If it has, don't move it above max height
		if (rigidbody.position.y >= maxHeight) {
			transform.position = new Vector3 (rigidbody.position.x, maxHeight, rigidbody.position.z);
		}

//		/*
//		if (Input.GetKeyUp ("space")) {
//			rigidbody.AddRelativeForce (new Vector3(0,-30.0f,0));
//		}
//*/
//
		Physics.gravity = new Vector3(0, -10.0F, 0);
//
////		var xRotationLimit = 20;
////		var yRotationLimit = 20;
////		var zRotationLimit = 20;
//
//		float vertical = Input.GetAxis ("Vertical");
//		float horizontal = Input.GetAxis ("Horizontal") ;
//
//		Debug.Log(horizontal);
//
////		float turnSpeed = 2.0f;
////		if(Input.GetButton("Forward"))
////		{
////			transform.eulerAngles.z += - turnSpeed * Time.deltaTime;
////		}
////		if(Input.GetButton("Backward"))
////		{
////			transform.eulerAngles.z += turnSpeed * Time.deltaTime;
////		}
////		
////		if(Input.GetButton("Left"))
////		{
////			transform.eulerAngles.x +=  turnSpeed * Time.deltaTime;
////		}
////		if(Input.GetButton("Right"))
////		{
////			transform.eulerAngles.x += - turnSpeed * Time.deltaTime;
////		}
////		
////		if(Input.GetButton("Jump")){
////			transform.position += transform.right * moveSpeed * Time.deltaTime;
////		}
////
////		if(transform.rotation.eulerAngles.x > xRotationLimit){
////			transform.rotation = Quaternion.identity;
////		}
////		
////		if(transform.rotation.eulerAngles.y > yRotationLimit){
////			transform.rotation = Quaternion.identity;
////		}
////		
////		if(transform.rotation.eulerAngles.z > zRotationLimit){
////			transform.rotation = Quaternion.identity;
////		}
//
//
//
//		//rigidbody.AddRelativeForce (new Vector3(0,3.0f,0));
//		//Vector3 end = new Vector3(horizontal* speed, DownwardSpeed,vertical );
//		//transform.Rotate(Input.GetAxis("Vertical"), 0.0f, -Input.GetAxis("Horizontal"));
//		//transform.position +=  velocity *Time.deltaTime;
//		//transform.position += new Vector3 (horizontal, 0.0f, vertical);
//		/*
//		transform.Rotate (0.0f,horizontal*2.0f,0.0f);
//		if (horizontal > 0) {
//						transform.Rotate (0.0f, 0.0f,- 1.0f);
//
//				} else if (horizontal < 0) {
//						transform.Rotate (0.0f, 0.0f, 1.0f);
//
//				} else {
//			transform.Rotate (0.0f, 0.0f, 0.0f);
//				}
//*/

	}
}
