using UnityEngine;
using System.Collections;

public class play : MonoBehaviour {
	public Texture2D b1;

	// Use this for initialization
	void Start () {
		guiTexture.texture = b1;
		Debug.Log ("start");
	}
	
	// Update is called once per frame
	void Update () {
		foreach (Touch touch in Input.touches) {

			if(guiTexture.HitTest(touch.position)){
				Debug.Log("touched");

				//StartCoroutine(LoadingScene())
				Application.LoadLevel("PaperPlain1.0.1");
			}
		}



	
	}
}
