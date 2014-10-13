/* Written for "Dawn of the Tyrant" by SixTimesNothing 
/* Please visit www.sixtimesnothing.com to learn more
*/
using UnityEngine;

public class AtmosphereFollow : MonoBehaviour {
	
	public GameObject me;
	public Camera followCamera;
	
	public void Awake () {
		me = this.gameObject;
	}

	public void Update () {
		me = this.gameObject;
		if(followCamera != null)
			me.transform.position = new Vector3(followCamera.gameObject.transform.position.x, me.gameObject.transform.position.y, followCamera.gameObject.transform.position.z);
	}
}

