using UnityEngine;
using System.Collections;

public class plane : MonoBehaviour {

	// Use this for initialization
	void Start () {
		Debug.Log("plane script added to " + gameObject.name);
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate (Input.GetAxis("Vertical"),0.0f,Input.GetAxis("Horizontal"));	}
}
