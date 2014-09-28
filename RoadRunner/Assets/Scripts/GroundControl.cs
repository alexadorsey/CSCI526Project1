using UnityEngine;
using System.Collections;

public class GroundControl : MonoBehaviour {

	//Material texture offset rate
	float speed = .3f;
	
	//Offset the material texture at a constant rate
	void Update () {
		float offset = Time.time * speed;                            
		renderer.material.mainTextureOffset = new Vector2(0, -offset);
	}
}
