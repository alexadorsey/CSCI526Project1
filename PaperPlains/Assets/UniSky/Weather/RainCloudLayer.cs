/* Written for "Dawn of the Tyrant" by SixTimesNothing 
/* Please visit www.sixtimesnothing.com to learn more
*/

using UnityEngine;
using System.Collections;

public class RainCloudLayer : MonoBehaviour {

	private GameObject dropletParticleGO;
	public ParticleEmitter dropEmitter;
	public Material cameraRainMaterial;
	public RenderTexture accumDropBuffer;
	private Component windScript;
	private GameObject rain;
	public ParticleEmitter rainEmitter;
	private GameObject heavyRain;
	public ParticleEmitter heavyRainEmitter;
	private ParticleRenderer heavyRainRenderer;
	private GameObject offscreenParticleGO;
	private GameObject rainDropCamGO;
	private Camera rainDropCam;
	private GameObject thunderGO;
	private AudioSource thunder;
	private GameObject rainSFXGO;
	public AudioSource rainSFX;
	private GameObject lightningFlashGO;
	private Renderer lightningFlashRenderer;
	
	/* No wind zone access in C# - c'mon Unity! :D
	private GameObject windSFXGO;
	private AudioSource windSFX;
	private GameObject windZone;
	*/
	
	private GameObject ambientSFXGO;
	private AudioSource ambientSFX;
	private GameObject stormSFXGO;
	public AudioSource stormSFX;
	private GameObject sunGO;
	public Light sun;
	public Camera myCamera;
	private Texture2D permTexture;
	private Texture2D noiseTexture;
	public Vector3 activeRainPosition;
	private Vector3 rainSpeed;
	private GameObject cloud;
	private CloudScript cloudScript;
	
	private bool lightningActive;
	public float thunderFrequency;
	public float rainCover;
	private bool lightningSwitch;
	private int lightningCount;
	
	public void InitRain() {	
		GenerateNoiseTexture();
		
		renderer.sharedMaterial.SetTexture("_NoiseTexture", noiseTexture);
		
		RenderSettings.fog = true;
		RenderSettings.fogColor = new Color(0.5f, 0.5f, 0.5f);	
		RenderSettings.fogDensity = 0;
		
		rainSFXGO = GameObject.Find("Rain SoundFX");
		rainSFX = (AudioSource)rainSFXGO.GetComponent(typeof(AudioSource));
		ambientSFXGO = GameObject.Find("Ambient SFX");
		ambientSFX = (AudioSource)ambientSFXGO.GetComponent(typeof(AudioSource));
		thunderGO = GameObject.Find("Thunder SoundFX");
		thunder = (AudioSource)thunderGO.GetComponent(typeof(AudioSource));
		stormSFXGO = GameObject.Find("Storm SFX");
		stormSFX = (AudioSource)stormSFXGO.GetComponent(typeof(AudioSource));
		
		rainDropCamGO = GameObject.Find("Rain Droplet Cam");
		rainDropCam = (Camera)rainDropCamGO.GetComponent(typeof(Camera));
		cloud = GameObject.Find("Clouds");
		cloudScript = (CloudScript)cloud.GetComponent(typeof(CloudScript));
		
		rain = GameObject.Find("Rain Particle");
		rainEmitter = (ParticleEmitter)rain.GetComponent(typeof(ParticleEmitter));
		heavyRain = GameObject.Find("Heavy Rain Particle");
		heavyRainEmitter = (ParticleEmitter)heavyRain.GetComponent(typeof(ParticleEmitter));
		heavyRainRenderer = (ParticleRenderer)heavyRain.GetComponent(typeof(ParticleRenderer));
		sunGO = GameObject.Find("Sun");
		sun =  (Light)sunGO.GetComponent(typeof(Light));
		dropletParticleGO = GameObject.Find("Rain Droplet Particle");
		dropEmitter = (ParticleEmitter)dropletParticleGO.GetComponent(typeof(ParticleEmitter));
		
		lightningFlashGO = GameObject.Find("Lightning");
		lightningFlashRenderer = (Renderer)lightningFlashGO.GetComponent(typeof(Renderer));
		
		thunderFrequency = 0;

		rainCover = -3.0f;
		rainSFX.playOnAwake = false;
		ambientSFX.volume = 0;
		ambientSFX.playOnAwake = false;
		stormSFX.playOnAwake = false;
		thunder.playOnAwake = false;
		stormSFX.volume = 0;
		thunderGO.transform.position = new Vector3(99999, 99999, 99999);
		
		rainSFX.volume = 0;
		ambientSFX.volume = 0;
		
		accumDropBuffer = new RenderTexture(Screen.width/4, Screen.height/4, 24);
		accumDropBuffer.filterMode = FilterMode.Bilinear;
		accumDropBuffer.Create();
		
		Graphics.Blit(accumDropBuffer, accumDropBuffer, cameraRainMaterial, 0);
		
		dropEmitter.minEmission = 0;
		dropEmitter.maxEmission = 0;
		heavyRainEmitter.minSize = 50.0f;
		heavyRainEmitter.maxSize = 50.0f;
		heavyRainEmitter.minEnergy = 2.0f;
		heavyRainEmitter.maxEnergy = 2.0f;
		rainEmitter.minEmission = 0;
		rainEmitter.maxEmission = 0;
		heavyRainEmitter.minEmission = 0;
		heavyRainEmitter.maxEmission = 0;
		heavyRainRenderer.lengthScale = 5;
		
		rainDropCam.targetTexture = accumDropBuffer;
	}

	public void LateUpdate () {

		ambientSFXGO.transform.position = myCamera.transform.position;
		rainSFXGO.transform.position = myCamera.transform.position;
		stormSFXGO.transform.position = myCamera.transform.position;
		rainSFXGO.transform.position = rainSFXGO.transform.position + new Vector3(0f, 5f, 0f);
		stormSFXGO.transform.position = stormSFXGO.transform.position + new Vector3(0f, 5f, 0f);
		ambientSFXGO.transform.position = ambientSFXGO.transform.position + new Vector3(0f, 5f, 0f);
		thunderGO.transform.position = new Vector3(myCamera.gameObject.transform.position.x, myCamera.gameObject.transform.position.y, myCamera.gameObject.transform.position.z) + new Vector3(activeRainPosition.x, 0f, activeRainPosition.y);
		
		renderer.sharedMaterial.SetVector("_sunColor", sun.color);
		renderer.sharedMaterial.SetFloat("_sunAngle", sun.gameObject.transform.TransformDirection(-Vector3.forward).y);
		renderer.sharedMaterial.SetVector("_StormCenter", activeRainPosition);
		renderer.sharedMaterial.SetFloat("_ViewDistance", cloudScript.viewDistance);
		rainSpeed = cloudScript.speed;
		renderer.sharedMaterial.SetVector("_Speed", rainSpeed);
		renderer.sharedMaterial.SetFloat("Time", Time.time/12.0f);
		renderer.sharedMaterial.SetFloat("_CloudCover", rainCover);
		heavyRainRenderer.material.SetColor("_TintColor", new Color(0.4f,0.4f,0.4f, 0.2f) * sun.color);
		RenderSettings.fogColor = sun.color * new Color(0.3f,0.3f,0.3f);
		
		if(Random.Range(0f, 100.0f) < thunderFrequency) {
			if(!thunder.isPlaying) {
				lightningActive = true;
				thunder.volume = 1.0f;
				thunder.pitch = Random.Range(0.3f, 1.8f);
				thunder.Play(88200);
			}
		}
					
		if(lightningActive) {
					
			if(lightningSwitch) {
				lightningFlashRenderer.material.SetColor("_Color", new Color(1.0f, 1.0f, 1.0f, 0.0f));
				lightningSwitch = false;
			}
			
			else {
				lightningFlashRenderer.material.SetColor("_Color", new Color(1.0f, 1.0f, 1.0f, Random.Range(0.0f, 0.15f)));
				lightningSwitch = true;
				lightningCount++;
			}
			
			if(lightningCount == 10) {
				lightningFlashRenderer.material.SetColor("_Color", new Color(1.0f, 1.0f, 1.0f, 0.0f));
				lightningCount = 0;
				lightningActive = false;
			}
		}	
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
