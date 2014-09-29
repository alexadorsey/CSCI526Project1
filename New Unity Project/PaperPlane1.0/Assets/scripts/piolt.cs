using UnityEngine;
using System.Collections;

public class piolt : MonoBehaviour {


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
		GUIStyle gs = new GUIStyle ();
		gs.fontSize = 30;
		gs.normal.textColor = Color.white;

		string t = "Your Score: " + score;
		GUI.Label (new Rect(10,10,10,10),t,gs);
	}

	void OnCollisionEnter(Collision cc){
		if (cc.gameObject.name == "Terrain") {
			score += 1;
			Debug.Log ("hit terrain!");
			Application.Quit();
		} 
	}

	void FixedUpdate(){
		
		float vertical = Input.GetAxis ("Vertical");
		float horizontal = Input.GetAxis ("Horizontal");
		if (horizontal > 0) {
			transform.Rotate (0.0f, 0.0f, 60 * Time.deltaTime);
		} else if (horizontal < 0) {
			transform.Rotate (0.0f, 0.0f, -60 * Time.deltaTime);
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

		float forwardSpeed = 30.0f;

		//float speed = 5.0f;
		transform.position += transform.forward * Time.deltaTime * forwardSpeed;
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

		Vector3 moveCameraTo = transform.position + new Vector3(-70.0f, 30.0f, 0.0f);

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
				rigidbody.AddRelativeForce (new Vector3(0,30.0f,0));
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
		//transform.position +=  velocity *Time.deltaTime;
		//transform.position += new Vector3 (horizontal, 0.0f, vertical);
		/*
		transform.Rotate (0.0f,horizontal*2.0f,0.0f);
		if (horizontal > 0) {
						transform.Rotate (0.0f, 0.0f,- 1.0f);

				} else if (horizontal < 0) {
						transform.Rotate (0.0f, 0.0f, 1.0f);

				} else {
			transform.Rotate (0.0f, 0.0f, 0.0f);
				}
*/

	}
}
