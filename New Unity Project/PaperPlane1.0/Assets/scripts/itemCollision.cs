using UnityEngine;
using System.Collections;

public class itemCollision : MonoBehaviour {

	private bool isTriggered = false;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnTriggerEnter(Collider other){
		Debug.Log("Collide with the item");
		if (!isTriggered) {
			GameObject.Find ("player").GetComponent<piolt>().addScore();
			isTriggered = true;
			Destroy (this.gameObject);

		}

		//GameObject.Find ("player").GetComponent<piolt>().addScore();

	}
}
