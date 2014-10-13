/* Written for "Dawn of the Tyrant" by SixTimesNothing 
/* Please visit www.sixtimesnothing.com to learn more
*/

using UnityEngine;
using System.Collections;

public class CloudScript : MonoBehaviour {

	private Texture2D permTexture;
	private Texture2D noiseTexture;

	private float sunAngle;

	public float precipitationLevel;
	public float cloudCover;
	public Vector3 colorVariance1;
	public Vector3 colorVariance2;
	public float glowVariance;
	public float viewDistance;
	public Vector3 speed;
	public Light Sun;
	public Camera myCamera;
	 
	public void Awake () {
		GenerateNoiseTexture();
		renderer.sharedMaterial.SetTexture("_NoiseTexture", noiseTexture);
	}

	public void Update () {
		if (!myCamera) {
			return;
		}

		renderer.sharedMaterial.SetVector("_SunColor", Sun.color);
		renderer.sharedMaterial.SetFloat("Time", Time.time/12.0f);
		renderer.sharedMaterial.SetFloat("_CloudCover", cloudCover);
		renderer.sharedMaterial.SetFloat("_PrecipLevel", precipitationLevel);
		renderer.sharedMaterial.SetFloat("_SunAngle", Sun.gameObject.transform.TransformDirection(-Vector3.forward).y);
		renderer.sharedMaterial.SetVector("_ColorVar1", colorVariance1);
		renderer.sharedMaterial.SetVector("_ColorVar2", colorVariance2);
		renderer.sharedMaterial.SetFloat("_GlowVar", glowVariance);
		renderer.sharedMaterial.SetFloat("_ViewDistance", viewDistance);
		renderer.sharedMaterial.SetVector("_Speed", speed);
	}

	public void GenerateNoiseTexture() {
		noiseTexture = new Texture2D(128, 128, TextureFormat.ARGB32, false);
		noiseTexture.filterMode = FilterMode.Point;
		
		Color[] pixels;
		pixels = new Color[128*128];
			
		for(int i = 0; i<128; i++) {
			for(int j = 0; j<128; j++)  {
			  int offset = (i*128+j);
		
			  pixels[offset].r = Random.Range(0f, 1f);
			  pixels[offset].g = Random.Range(0f, 1f);
			  pixels[offset].b = Random.Range(0f, 1f);
			  pixels[offset].a = Random.Range(0f, 1f);
			}
		}
		
		noiseTexture.SetPixels(pixels);
		noiseTexture.Apply();
	}
}
