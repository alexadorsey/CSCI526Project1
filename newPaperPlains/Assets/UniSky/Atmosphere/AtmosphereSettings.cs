/* Written for "Dawn of the Tyrant" by SixTimesNothing 
/* Please visit www.sixtimesnothing.com to learn more
*/

using UnityEngine;
using System.Collections;

public class AtmosphereSettings : MonoBehaviour {

	public Camera mainCamera;
	public Light sunLight;
	public Material cloudMaterial; 
	public float innerRadius;
	public Texture2D starTexture;

	private Vector3 sunLightDirection;
	private Color waveLength;
	private Color invWaveLength;
	private float cameraHeight;
	private float cameraHeight2;
	private float outerRadius;
	private float outerRadius2;
	private float innerRadius2;
	private float ESun;
	private float Kr;
	private float Km;
	private float KrESun;
	private float KmESun;
	private float Kr4PI;
	private float Km4PI;
	private float scale;
	private float scaleDepth;
	private float scaleOverScaleDepth;
	private float samples;
	private float g;
	private float g2;
	private float exposure;
	private Vector3  offsetTransform;
	private float skyBloomThreshold;

	public void Awake() 
	{
	  waveLength = new Color(0.650f, 0.570f, 0.475f, 0.5f);
	  invWaveLength = new Color (1f/Mathf.Pow(waveLength[0],4),1f/Mathf.Pow(waveLength[1],4),1f/Mathf.Pow(waveLength[2],4),1.0f);
	  outerRadius = 46125f;
	  outerRadius2 = outerRadius * outerRadius;
	  innerRadius = 45000;
	  innerRadius2 = innerRadius * innerRadius;
	  ESun = 12;
	  Kr = 0.0025f;
	  Km = 0.0010f;
	  KrESun = Kr * ESun;
	  KmESun = Km * ESun;
	  Kr4PI = Kr * 4.0f * Mathf.PI;
	  Km4PI	= Km * 4.0f * Mathf.PI;
	  scale = 1 / (outerRadius - innerRadius);
	  scaleDepth = 0.25f;
	  scaleOverScaleDepth = scale / scaleDepth;
	  samples = 3;
	  g = -0.945f;
	  g2 = g*g;
	  exposure = 4f;
	  
	  offsetTransform = transform.position;
	  skyBloomThreshold = 0f;
	  
	  renderer.material.SetFloat("_fOuterRadius", outerRadius);
	  renderer.material.SetFloat("_fOuterRadius2", outerRadius2);
	  renderer.material.SetFloat("_fInnerRadius", innerRadius);
	  renderer.material.SetFloat("_fInnerRadius2", innerRadius2);
	  renderer.material.SetFloat("_fKrESun",KrESun);
	  renderer.material.SetFloat("_fKmESun",KmESun);
	  renderer.material.SetFloat("_fKr4PI",Kr4PI);
	  renderer.material.SetFloat("_fKm4PI",Km4PI);
	  renderer.material.SetFloat("_fScale",scale);
	  renderer.material.SetFloat("_fScaleDepth",scaleDepth);
	  renderer.material.SetFloat("_fScaleOverScaleDepth",scaleOverScaleDepth);
	  renderer.material.SetFloat("_Samples",samples);
	  renderer.material.SetFloat("_G",g);
	  renderer.material.SetFloat("_G2",g2);
	  renderer.material.SetFloat("_Exposure",exposure);
	  renderer.material.SetColor("_cInvWaveLength", invWaveLength);
	  renderer.material.SetColor("_cInvWaveLength", invWaveLength);
	  renderer.material.SetFloat("_SkyBloomThreshold", skyBloomThreshold);
	}

	public void LateUpdate () 
	{
	  sunLightDirection = sunLight.gameObject.transform.TransformDirection (-Vector3.forward);
	  cameraHeight = mainCamera.transform.position.y + 44931.74f;
	  cameraHeight2 = cameraHeight * cameraHeight;
	  offsetTransform = transform.position;
	  
	  // Pass in variables to the Shader
	  renderer.material.SetFloat("_fInnerRadius", innerRadius);
	  renderer.material.SetVector("_v4CameraPos",new Vector4(mainCamera.transform.position.x,mainCamera.transform.position.y + 44931.74f, mainCamera.transform.position.z));
	  renderer.material.SetVector("_v4LightDir", new Vector4(sunLightDirection[0],sunLightDirection[1],sunLightDirection[2],0));
	  renderer.material.SetFloat("_fCameraHeight", cameraHeight);
	  renderer.material.SetFloat("_fCameraHeight2", cameraHeight2);
	  renderer.material.SetVector("_OffsetTransform", offsetTransform);
	  renderer.material.SetVector("_SunColor", sunLight.color * new Color(0.6f, 0.6f, 0.6f));
	  renderer.material.SetTexture("_StarTex", starTexture);
	   
	  cloudMaterial.SetVector("_v3CameraPos",new Vector4(mainCamera.transform.position.x,mainCamera.transform.position.y + 46125f, mainCamera.transform.position.z));
	}
}
