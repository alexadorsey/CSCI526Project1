using UnityEngine;
using System.Collections;

public class NewBehaviourScript : MonoBehaviour {

	
	public Vector3 velocity;
	public float timer ;
	public int score = 0;
	public bool speedup;
	
	
	// Use this for initialization
	void Start () {
		velocity = new Vector3 (0.0f, 0.0f, 0.0f);
		timer = 100;
		speedup = false;
	}
	
	void OnMouseDrag() {
		Debug.Log("mouse drag");
	}
	
	void OnGUI(){
		GUILayout.Label ("Your Score: " + score);
	}
	
	void OnCollisionEnter(Collision cc){
		if (cc.gameObject.name == "Terrain") {
			score += 1;
			Debug.Log("hit terrain!");
		}
	}
	
	// Update is called once per frame
	void Update () {
		
		float speed = 3.0f;
		Vector3 dir = Vector3.zero;
		dir.x = -Input.acceleration.y;
		dir.z = Input.acceleration.x;
		if (dir.sqrMagnitude > 1)
			dir.Normalize();
		
		dir *= Time.deltaTime;
		transform.Translate(dir * speed);
		
		
		
		//float speed = 5.0f;
		transform.position += transform.forward * Time.deltaTime * 40;
		//float z = 1.0f;
		//Vector3 start = transform.position;
		/*

		float DownwardSpeed = 0.0f;
		DownwardSpeed--;
		if(DownwardSpeed < 0) {
			DownwardSpeed = -1;
		}
				
		if(Input.GetKey("space")) {
			DownwardSpeed =1;
		}

		if (transform.position.z < 3.0f) {
			DownwardSpeed = 3.0f;
		}
*/
		
		Vector3 moveCameraTo = transform.position + new Vector3 (0.0f, 30.0f, -70.0f);
		
		Camera.main.transform.position = moveCameraTo;
		
		Camera.main.transform.LookAt (transform.position);
		
		//Input.GetTouch(0).phase == TouchPhase.Began
		if(Input.touchCount == 1) {
			//velocity.y += 1.0f;
			speedup = true;
			
		}
		if (speedup) {
			timer --;
			if(timer > 0){
				//Debug.Log(Time.realtimeSinceStartup);
				rigidbody.AddRelativeForce (new Vector3(0,25.0f,0));
			}
		}
		if (timer == 0) {
			timer = 100;
			speedup = false;
			//rigidbody.Sleep();
			//rigidbody.sleepVelocity = 0.0f;
		}
		/*
		if (Input.GetKeyUp ("space")) {
			rigidbody.AddRelativeForce (new Vector3(0,-30.0f,0));
		}
*/
		
		//Physics.gravity = new Vector3(0, -10.0F, 0);
		
		float vertical = Input.GetAxis ("Vertical");
		float horizontal = Input.GetAxis ("Horizontal");
		
		//rigidbody.AddRelativeForce (new Vector3(0,3.0f,0));
		//Vector3 end = new Vector3(horizontal* speed, DownwardSpeed,vertical );
		//transform.Rotate(Input.GetAxis("Vertical"), 0.0f, -Input.GetAxis("Horizontal"));
		transform.position +=  velocity *Time.deltaTime;
		//transform.position += new Vector3 (horizontal, 0.0f, vertical);
		transform.Translate (Input.acceleration.x * 10, 0.0f, 0.0f);
		
	}
}
