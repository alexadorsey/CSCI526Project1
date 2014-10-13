// UNISKY
// Version 1.2.4 (Release)
// Developed by Six Times Nothing
// Please visit www.sixtimesnothing.com/unisky to learn more

using UnityEngine;
using System.Collections;

public class UniSky : MonoBehaviour {
	
	// Sky parameters
	[HideInInspector]
	public float precipitationLevel;
	[HideInInspector]
	public float cloudCover;
	[HideInInspector]
	public Vector3 colorVariance1;
	[HideInInspector]
	public Vector3 colorVariance2;
	[HideInInspector]
	public float glowVariance;
	[HideInInspector]
	public float viewDistance;
	[HideInInspector]
	public Vector3 speed;
	[HideInInspector]
	public Light Sun;
	[HideInInspector]
	public Camera myCamera;
	[HideInInspector]
	public float rayleighLevel= 40;
	[HideInInspector]
	public float TIME = 8.0f;
	[HideInInspector]
	public bool useSystemTime = false;
	[HideInInspector]
	public float speedOfTime= 0.0f;
	[HideInInspector]
	public Texture2D moonTexture;
	[HideInInspector]
	public float innerRadius;
	[HideInInspector]
	public Texture2D starTexture;
	[HideInInspector]
	public float moonSize;
	
	[HideInInspector]
	public GameObject cloud;
	[HideInInspector]
	public GameObject sky;
	[HideInInspector]
	public GameObject moon;
	[HideInInspector]
	public GameObject sun;
	[HideInInspector]
	public GameObject atmosFollowCloud;
	[HideInInspector]
	public GameObject atmosFollowSky;
	[HideInInspector]
	public GameObject atmosFollowRain;
	[HideInInspector]
	public GameObject rainGO;
	[HideInInspector]
	public GameObject camRainGO;

	[HideInInspector]
	public AudioClip thunderAudio;
	[HideInInspector]
	public AudioClip ambientAudio;
	[HideInInspector]
	public AudioClip rainAudio;
	[HideInInspector]
	public AudioClip stormAudio;

	[HideInInspector]
	public GameObject thunderGO;
	[HideInInspector]
	public AudioSource thunder;
	[HideInInspector]
	public GameObject rainSFXGO;
	[HideInInspector]
	public AudioSource rainSFX;
	[HideInInspector]
	public GameObject stormSFXGO;
	[HideInInspector]
	public AudioSource stormSFX;
	[HideInInspector]
	public GameObject ambientSFXGO;
	[HideInInspector]
	public AudioSource ambientSFX;

	[HideInInspector]
	public Texture2D uniSkyImage;

	[HideInInspector]
	public CloudScript cloudScript;
	[HideInInspector]
	public AtmosphereSettings skyScript;
	[HideInInspector]
	public Moon moonScript;
	[HideInInspector]
	public DirectionalSun sunScript;
	[HideInInspector]
	public AtmosphereFollow atmosFollowScript;
	[HideInInspector]
	public AtmosphereFollow atmosFollowScript2;
	[HideInInspector]
	public AtmosphereFollow atmosFollowScript3;
	[HideInInspector]
	public RainCloudLayer rainScript;
	[HideInInspector]
	public Light moonLight;
	[HideInInspector]
	public Light sunLight;
	
	private bool hasBeenInitiated = false;

	public void InitiateUniSky() {
		hasBeenInitiated = true;
		
		cloud = GameObject.Find("Clouds");
		sky = GameObject.Find("Sky");
		moon = GameObject.Find("Moon");
		moonLight = moon.GetComponent(typeof(Light)) as Light;
		sun = GameObject.Find("Sun");
		sunLight = sun.GetComponent(typeof(Light)) as Light;
		atmosFollowCloud = GameObject.Find("Cloud Handler");
		atmosFollowSky = GameObject.Find("Sky Handler");
		atmosFollowRain = GameObject.Find("Rain Cloud Layer");
		rainGO = GameObject.Find("Rain Cloud Layer");
		camRainGO = GameObject.Find("Rain Droplet Cam");
		
		thunderGO = GameObject.Find("Thunder SoundFX");
		thunder = (AudioSource)thunderGO.GetComponent(typeof(AudioSource));
		rainSFXGO = GameObject.Find("Rain SoundFX");
		rainSFX = (AudioSource)rainSFXGO.GetComponent(typeof(AudioSource));
		ambientSFXGO = GameObject.Find("Ambient SFX");
		ambientSFX = (AudioSource)ambientSFXGO.GetComponent(typeof(AudioSource));
		stormSFXGO = GameObject.Find("Storm SFX");
		stormSFX = (AudioSource)stormSFXGO.GetComponent(typeof(AudioSource));
		
		cloudScript = (CloudScript)cloud.GetComponent(typeof(CloudScript));
		rainScript = (RainCloudLayer)rainGO.GetComponent(typeof(RainCloudLayer));
		skyScript = (AtmosphereSettings)sky.GetComponent(typeof(AtmosphereSettings));
		moonScript = (Moon)moon.GetComponent(typeof(Moon));
		sunScript = (DirectionalSun)sun.GetComponent(typeof(DirectionalSun));
		atmosFollowScript = (AtmosphereFollow)atmosFollowCloud.GetComponent(typeof(AtmosphereFollow));
		atmosFollowScript2 = (AtmosphereFollow)atmosFollowRain.GetComponent(typeof(AtmosphereFollow));
		atmosFollowScript3 = (AtmosphereFollow)atmosFollowSky.GetComponent(typeof(AtmosphereFollow));
		
		// defaults in case left blank
		cloudScript.Sun = GameObject.Find("Sun").light;
		rainScript.sun = GameObject.Find("Sun").light;
		rainScript.myCamera = myCamera;
		cloudScript.myCamera = myCamera;
		moonScript.mainCam = myCamera;
		moonScript.Sun = GameObject.Find("Sun").light;
		skyScript.sunLight = GameObject.Find("Sun").light;
		skyScript.mainCamera = myCamera;
	}
	
	public void Start() {
		if (!hasBeenInitiated) {
			Debug.LogWarning("UniSky must be instantiated in the scene.");
		}
	}

	public void Update() {
		if (hasBeenInitiated) {
			
			cloudScript.precipitationLevel = precipitationLevel;
			cloudScript.cloudCover = cloudCover;
			
			cloudScript.colorVariance1 = colorVariance1;
			cloudScript.colorVariance2 = colorVariance2;
			cloudScript.glowVariance = glowVariance;
			cloudScript.viewDistance = viewDistance;
			cloudScript.speed = speed;
			cloudScript.Sun = Sun;
			cloudScript.myCamera = myCamera;
			
			rainScript.myCamera = myCamera;
			rainScript.sun = Sun;
			
			thunder.clip = thunderAudio;
			rainSFX.clip = rainAudio;
			stormSFX.clip = stormAudio;
			ambientSFX.clip = ambientAudio;
			
			sunScript.rayleighLevel = rayleighLevel;
			
			if(!sunScript.useSystemTime)
				TIME += sunScript.speedOfTime;
			else
				TIME = sunScript.TIME;
			
			if(TIME >= 24)
				TIME = 0;
			
			sunScript.TIME = TIME;
			
			if(TIME < 19 && TIME > 6) {
				moonLight.enabled = false;
				sunLight.enabled = true;
			}
				
			else {
				moonLight.enabled = true;
				sunLight.enabled = false;
			}
				
			sunScript.useSystemTime = useSystemTime;
			sunScript.speedOfTime = speedOfTime;
			
			moonScript.moonTexture = moonTexture;
			moonScript.mainCam = myCamera;
			moonScript.Sun = Sun;
			moonScript.moonSize = moonSize * 100;
			
			skyScript.innerRadius = innerRadius;
			skyScript.starTexture = starTexture;
			skyScript.sunLight = Sun;
			skyScript.mainCamera = myCamera;
			
			atmosFollowScript.followCamera = myCamera;
			atmosFollowScript2.followCamera = myCamera;
			atmosFollowScript3.followCamera = myCamera;
		}
	}

}
