/* Written for "Dawn of the Tyrant" by SixTimesNothing 
/* Please visit www.sixtimesnothing.com to learn more
*/

using UnityEngine;
using System.Collections;

public class FollowMainCam : MonoBehaviour {

	public Camera mainCam;
	public GameObject uniskyMain;
	public UniSky uniskyMainScript;

	public void Start() {
		uniskyMain = GameObject.Find("UniSky");
		uniskyMainScript = (UniSky)uniskyMain.GetComponent(typeof(UniSky));
		mainCam = uniskyMainScript.myCamera;
	}

	public void Update () {
		this.gameObject.transform.position = mainCam.gameObject.transform.position;
		this.gameObject.transform.rotation = mainCam.gameObject.transform.rotation;
	}
}
