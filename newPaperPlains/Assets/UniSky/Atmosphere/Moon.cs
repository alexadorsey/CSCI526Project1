/* Written for "Dawn of the Tyrant" by SixTimesNothing 
/* Please visit www.sixtimesnothing.com to learn more
*/

using UnityEngine;
using System.Collections;

public class Moon : MonoBehaviour {

	public Light Sun;
	public Texture2D moonTexture;
	public Material moonMaterial;
	public Camera mainCam;
	public float moonSize;
		
	private DirectionalSun sunScript;	
	private GameObject moonMeshGO;
	private MeshRenderer moonMeshRenderer;
	private MeshFilter moonMeshFilter;
	private Mesh moonMesh;

	public void Awake() {

		sunScript = (DirectionalSun)GameObject.Find("Sun").GetComponent(typeof(DirectionalSun));
		
		// create the billboard mesh for the moon
		moonMeshGO = GameObject.CreatePrimitive(PrimitiveType.Plane);
		moonMeshGO.name = "Moon Entity";
		moonMeshRenderer = (MeshRenderer)moonMeshGO.GetComponent(typeof(MeshRenderer));
		
		moonMeshGO.transform.position = new Vector3(-sunScript.sunPosition.x, -sunScript.sunPosition.y, -sunScript.sunPosition.z);
		moonMeshRenderer.material = moonMaterial;
		moonMeshGO.transform.localScale = new Vector3(moonSize, moonSize, moonSize);
		
		moonMeshRenderer.material.SetTexture("_MainTexture", moonTexture);
	}

	public void Update () {
		if (!mainCam) {
			return;
		}
		
		moonMeshGO.transform.localScale = new Vector3(moonSize, moonSize, moonSize);
		
		this.gameObject.transform.position = new Vector3(-sunScript.sunPosition.x, -sunScript.sunPosition.y, -sunScript.sunPosition.z);
		moonMeshGO.gameObject.transform.position = new Vector3(-sunScript.sunPosition.x, -sunScript.sunPosition.y, -sunScript.sunPosition.z);
		
		this.gameObject.transform.LookAt(mainCam.transform.position);
		moonMeshGO.gameObject.transform.LookAt(mainCam.transform.position, Vector3.right);
		
		moonMeshGO.gameObject.transform.Rotate(new Vector3(90f, 0f, 0f));
		
		moonMeshRenderer.material.SetTexture("_MainTexture", moonTexture);
		moonMeshRenderer.material.SetVector("_v4LightDir", Sun.light.transform.TransformDirection (-Vector3.forward));
	}
}
