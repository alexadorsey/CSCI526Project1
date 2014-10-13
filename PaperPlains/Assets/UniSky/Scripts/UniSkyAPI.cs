// Developed by Six Times Nothing
// Please visit www.sixtimesnothing.com/unisky to learn more

using UnityEngine;
using System.Collections;

/****************************************

------------UniSky API Functions and Suggested Parameter Ranges-------------

// The time of day (0-24 hour cycle)
SetTime(float time);
LerpTime(float time, float milliseconds);
GetTime();

// This returns the sun's Color
GetSunColor(); 

// These enable or disable the sun and moon's shadows. Types are: "LightShadows.None" "LightShadows.Hard" and "LightShadows.Soft"
public void SetSunShadows(LightShadows sunShadows) 
public void SetMoonShadows(LightShadows moonShadows) 

// Sets the coordinates that the storm cloud layer will center over
SetStormCenter(Vector3 stormCenter); 

// The scattering radius, which effects the colors of the sky (45000 is default, and typical for a realistic sky)
SetScatteringRadius(float scatteringRadius); 
LerpScatteringRadius(float scatteringRadius, float milliseconds); 

// The level of cover that the main cloud layer has (-5 to 5)
void SetCloudCover(float cloudCover);
LerpCloudCover(float cloudCover, float milliseconds); 

// The darkness of the main cloud layer, not the storm cloud layer. (2 to 0 - the lower, the darker the clouds)
SetPrecipitationLevel(float precipitationLevel);
LerpPrecipitationLevel(float precipitationLevel, float milliseconds); 

// The level of cover that the storm cloud layer has (I recommend -3.5 to -1.0)
SetStormCloudCover(float cloudCover);
LerpStormCloudCover(float cloudCover, float milliseconds);

// The amount of rain. Not heavy storm sheets of rain, but light rain. (Anywhere from 0 to 1000)
SetRainLevel(float rainLevel, float sfxLevel);
LerpRainLevel(float rainLevel, float sfxLevel, float milliseconds);

// The amount of HEAVY storm rain. The sheets of rain. (Anywhere from 0 to 200)
SetStormLevel(float stormLevel, float sfxLevel);
LerpStormLevel(float stormLevel, float sfxLevel, float milliseconds); 

// The brightness or intensity of the sun. Fade this down to get it dark during a cloudy or stormy day. (0 to 0.5)
SetSunIntensity(float intensity);
LerpSunIntensity(float intensity, float milliseconds);

// Sets the built-in RenderSettings fog (0 to 0.03)
SetFogLevel(float fogLevel);
LerpFogLevel(float fogLevel, float milliseconds);

// Sets the rate at which droplets fall on the screen for the image effect (0 to 5)
SetDropletLevel(float dropletLevel);
LerpDropletLevel(float dropletLevel, float milliseconds);

// Sets the direction, speed, and evolution speed of the clouds. X = x direction and speed, Y= y direction and speed, Z = evolution speed. (0 to 1)
SetCloudSpeedDirection(Vector3 speedDirection);
LerpCloudSpeedDirection(Vector3 speedDirection, float milliseconds);

// The glow variance. Sets the intensity of the lighting near the edges of the clouds (0 to 10) Tip: Setting this around 0 will give a nice cirrus cloud effects
SetGlowVariance(float glowVariance);
LerpGlowVariance(float glowVariance, float milliseconds);

// This sets the distance at which the clouds fade into the atmosphere (0 to 20)
SetViewDistance(float viewDistance);
LerpViewDistance(float viewDistance, float milliseconds);

// Modulates the default colors. Default is RGB(1.5, 1.5, 1.5), which is recommended. This is your parameter if you want pink or green clouds :D
SetColorVariance(Vector3 colorVariance);
LerpColorVariance(Vector3 colorVariance, milliseconds);

// If you want the time cycle automated, this is the speed at which time passes. (0 to 0.1)
SetSpeedOfTime(float speedOfTime);

// This changes the scattering of light to the clouds, effecting only the cloud color. Best to keep at default, 40. (-20 to 100)
SetRayleighLevel(float rayleighLevel);

// If this is enabled, the time of day is synced with the system clock of the player
SetUseSystemTime(bool enabled);

// This changes the ambient light color. I'd recommend interpolating this with the time of day, or cloudiness
SetAmbientLighting(Color ambientLevel);
LerpAmbientLighting(Color ambientLevel, float milliseconds);

// Sets the moon's size
SetMoonSize(float moonSize);

// Clears the droplet buffer 
ClearDropletBuffer();

// Sets the frequency of lightning + thunder. Higher the more frequent (0-100)
SetLightningFrequency(float frequency);

*////////////////////////////////////////


// This class holds all of the API behaviors for an instantiated UniSky
public class UniSkyAPI : MonoBehaviour {

	private GameObject uniSkyClone;
	private UniSky uniSkyScript;
	private RainCloudLayer rainScript;
	private Moon moonScript;
	private GameObject lightningClone;
	public Camera mainCamera;
	private RainImageEffect rainImageEffect;
	private OffscreenParticlesImageEffect offscreenParticleImageEffect;
	private Material rainImageMaterial;
	private Material offscreenMaterial;
	private bool exists;
	public Texture2D moonTexture;
	public float moonSize;
	public Texture2D starTexture;
	public AtmosphereSettings atmosphereScript;
	public AudioClip rainAudio;
	public AudioClip stormAudio;
	public AudioClip thunderAudio;
	public int layer1;
	public int layer2;
	public LightShadows sunShadowType;
	public LightShadows moonShadowType;
	private Camera dropletCam;
	private Camera offscreenParticleCam;
	private GameObject dropletGO;
	private GameObject offscreenGO;
	
	// GUI stuff
	public int tabInt;
	public float innerRadius;
	public float precipitationLevel;
	public float cloudCover;
	public Vector3 colorVariance1;
	public Vector3 colorVariance2;
	public float glowVariance;
	public float viewDistance;
	public Vector3 speed;
	public float rayleighLevel;
	public float TIME;
	public bool useSystemTime;
	public bool controlTimeFromAPI;
	public float speedOfTime;
	
	// Scattering Radius
	private bool isScatteringRadiusLerping;
	private float lerpScatteringRadiusTo;
	private float lerpScatteringRadiusFrom;
	private float  lerpScatteringRadiusTime;
	private float lerpScatteringRadiusOver;
	
	// Precipitation Level
	private bool isPrecipitationLevelLerping;
	private float lerpPrecipitationLevelTo;
	private float lerpPrecipitationLevelFrom;
	private float lerpPrecipitationLevelTime;
	private float lerpPrecipitationLevelOver;
	
	// Cloud Cover
	private bool isCloudCoverLerping;
	private float lerpCloudCoverTo;
	private float lerpCloudCoverFrom;
	private float lerpCloudCoverTime;
	private float lerpCloudCoverOver;
	
	// Glow Variance
	private bool isGlowVarianceLerping;
	private float lerpGlowVarianceTo;
	private float lerpGlowVarianceFrom;
	private float lerpGlowVarianceTime;
	private float lerpGlowVarianceOver;
	
	// Time
	private bool isTimeLerping;
	private float lerpTimeTo;
	private float lerpTimeFrom;
	private float lerpTimeTime;
	private float lerpTimeOver;
	
	// Ambient Lighting
	private bool isAmbientLightingLerping;
	private Color lerpAmbientLightingTo;
	private Color lerpAmbientLightingFrom;
	private float lerpAmbientLightingTime;
	private float lerpAmbientLightingOver;
	
	// Storm Cloud Cover
	private bool isStormCloudCoverLerping;
	private float lerpStormCloudCoverTo;
	private float lerpStormCloudCoverFrom;
	private float lerpStormCloudCoverTime;
	private float lerpStormCloudCoverOver;
	
	// Sun Intensity
	private bool isSunIntensityLerping;
	private float lerpSunIntensityTo;
	private float lerpSunIntensityFrom;
	private float lerpSunIntensityTime;
	private float lerpSunIntensityOver;
	
	// View Distance
	private bool isViewDistanceLerping;
	private float lerpViewDistanceTo;
	private float lerpViewDistanceFrom;
	private float lerpViewDistanceTime;
	private float lerpViewDistanceOver;
	
	// Fog Level
	private bool isFogLevelLerping;
	private float lerpFogLevelTo;
	private float lerpFogLevelFrom;
	private float lerpFogLevelTime;
	private float lerpFogLevelOver;
	
	// Cloud Speed/Direction
	private bool isCloudSpeedDirectionLerping;
	private Vector3 lerpCloudSpeedDirectionTo;
	private Vector3 lerpCloudSpeedDirectionFrom;
	private float lerpCloudSpeedDirectionTime;
	private float lerpCloudSpeedDirectionOver;
	
	// Color Variance 1
	private bool isColorVarianceLerping;
	private Vector3 lerpColorVarianceTo;
	private Vector3 lerpColorVarianceFrom;
	private float lerpColorVarianceTime;
	private float lerpColorVarianceOver;
	
	// Droplet Level (drops on camera image effect)
	private bool isDropletLevelLerping;
	private float lerpDropletLevelTo;
	private float lerpDropletLevelFrom;
	private float lerpDropletLevelTime;
	private float lerpDropletLevelOver;
	
	// Rain Level
	private bool isRainLevelLerping;
	private float lerpRainLevelTo;
	private float lerpRainLevelFrom;
	private float lerpRainSFXLevelTo;
	private float lerpRainSFXLevelFrom;
	private float lerpRainLevelTime;
	private float lerpRainLevelOver;
	
	// Storm Level
	private bool isStormLevelLerping;
	private float lerpStormLevelTo;
	private float lerpStormLevelFrom;
	private float lerpStormSFXLevelTo;
	private float lerpStormSFXLevelFrom;
	private float lerpStormLevelTime;
	private float lerpStormLevelOver;
	
	public void InstantiateUniSky() {
		
		uniSkyClone = Instantiate(Resources.Load("UniSky")) as GameObject;
		uniSkyClone.name = "UniSky";
		uniSkyScript = uniSkyClone.GetComponent("UniSky") as UniSky;
		uniSkyScript.myCamera = mainCamera;
		rainScript = GameObject.Find("Rain Cloud Layer").GetComponent("RainCloudLayer") as RainCloudLayer;
		moonScript = GameObject.Find("Moon").GetComponent("Moon") as Moon;
		atmosphereScript = GameObject.Find("Sky").GetComponent("AtmosphereSettings") as AtmosphereSettings;
		lightningClone = Instantiate(Resources.Load("Lightning")) as GameObject;
		lightningClone.name = "Lightning";
		lightningClone.transform.parent = uniSkyScript.myCamera.transform;
		lightningClone.transform.position = uniSkyScript.myCamera.transform.position + new Vector3(0, 0, 1.345703f);
		uniSkyScript.InitiateUniSky();
		
		offscreenParticleCam = GameObject.Find("Offscreen Particle Cam").GetComponent(typeof(Camera)) as Camera;
	    dropletCam = GameObject.Find("Rain Droplet Cam").GetComponent(typeof(Camera)) as Camera;
	    
	    dropletGO = GameObject.Find("Rain Droplet Particle");
	    offscreenGO = GameObject.Find("Heavy Rain Particle");
				
		rainImageEffect = mainCamera.gameObject.AddComponent("RainImageEffect") as RainImageEffect;
		offscreenParticleImageEffect = mainCamera.gameObject.AddComponent("OffscreenParticlesImageEffect") as OffscreenParticlesImageEffect;

		mainCamera.cullingMask &= ~(1 << layer1);
		mainCamera.cullingMask &= ~(1 << layer2);

		offscreenParticleCam.cullingMask = 1<<layer2;
		dropletCam.cullingMask = 1<<layer1;
		
		dropletGO.layer = layer1;
		offscreenGO.layer = layer2;
		
		dropletCam.clearFlags = CameraClearFlags.SolidColor;
		dropletCam.backgroundColor = new Color(0.5f, 0.5f, 1.0f, 1.0f);
		
		rainImageMaterial = Resources.Load("RainImageEffect") as Material;
		offscreenMaterial = Resources.Load("OffscreenCompositeMaterial") as Material;
		
		rainImageEffect.rainImageMaterial = rainImageMaterial;
		offscreenParticleImageEffect.CompositeMaterial = offscreenMaterial;
		
		moonScript.moonTexture = moonTexture;
		
		// Initiate some default parameters	
		rainScript.InitRain();
		
		exists = true;
	}
	
	public Color GetSunColor() {
		
		return uniSkyScript.Sun.light.color;
	}
	
	public void SetStormCenter(Vector3 stormCenter) {
		
		rainScript.activeRainPosition = stormCenter;
	}
	
	public void SetSpeedOfTime(float SspeedOfTime) {
		
		speedOfTime = SspeedOfTime;
	}
	
	public void SetScatteringRadius(float scatteringRadius) {
		
		innerRadius = scatteringRadius;
	}
	
	public void SetUseSystemTime(bool SuseSystemTime) {
		
		useSystemTime = SuseSystemTime;
	}
	
	public void LerpScatteringRadius(float SscatteringRadius, float milliseconds) {
		
		isScatteringRadiusLerping = true;
		lerpScatteringRadiusFrom = innerRadius;
		lerpScatteringRadiusTo = SscatteringRadius;
		lerpScatteringRadiusOver = milliseconds/1000;
		lerpScatteringRadiusTime = 0;
	}
	
	public void SetAmbientLighting(Color ambientLevel) {
		
		RenderSettings.ambientLight = ambientLevel;
	}
	
	public void LerpAmbientLighting(Color ambientLevel, float milliseconds) {
		
		isAmbientLightingLerping = true;
		lerpAmbientLightingFrom = RenderSettings.ambientLight;
		lerpAmbientLightingTo = ambientLevel;
		lerpAmbientLightingOver = milliseconds/1000;
		lerpAmbientLightingTime = 0;
	}
	
	public void SetViewDistance(float SviewDistance) {
		
		viewDistance = SviewDistance;
	}
	
	public void LerpViewDistance(float SviewDistance, float milliseconds) {
		
		isViewDistanceLerping = true;
		lerpViewDistanceFrom = viewDistance;
		lerpViewDistanceTo = SviewDistance;
		lerpViewDistanceOver = milliseconds/1000;
		lerpViewDistanceTime = 0;
	}
	
	public void SetPrecipitationLevel(float SprecipitationLevel) {
		
		precipitationLevel = SprecipitationLevel;
	}
	
	public void LerpPrecipitationLevel(float SprecipitationLevel, float milliseconds) {
		
		isPrecipitationLevelLerping = true;
		lerpPrecipitationLevelFrom = precipitationLevel;
		lerpPrecipitationLevelTo = SprecipitationLevel;
		lerpPrecipitationLevelOver = milliseconds/1000;
		lerpPrecipitationLevelTime = 0;
	}
	
	public void SetCloudCover(float ScloudCover) {
		
		cloudCover = ScloudCover;
	}
	
	public void LerpCloudCover(float ScloudCover, float milliseconds) {
		
		isCloudCoverLerping = true;
		lerpCloudCoverFrom = cloudCover;
		lerpCloudCoverTo = ScloudCover;
		lerpCloudCoverOver = milliseconds/1000;
		lerpCloudCoverTime = 0;
	}
	
	public void SetLightningFrequency(float frequency) {
		
		rainScript.thunderFrequency = frequency;
	}
	
	public void SetGlowVariance(float SglowVariance) {
		
		glowVariance = SglowVariance;
	}
	
	public void LerpGlowVariance(float SglowVariance, float milliseconds) {
		
		isGlowVarianceLerping = true;
		lerpGlowVarianceFrom = glowVariance;
		lerpGlowVarianceTo = SglowVariance;
		lerpGlowVarianceOver = milliseconds/1000;
		lerpGlowVarianceTime = 0;
	}
	
	public void SetTime(float time) {
		if (time > 24) {
	        time -= 24;
	    }
		TIME = time;
	}
	
	public void SetRayleighLevel(float SrayleighLevel) {
		
		rayleighLevel = SrayleighLevel;
	}
	
	public void LerpTime(float time, float milliseconds) {
		
		isTimeLerping = true;
		lerpTimeFrom = TIME;
		lerpTimeTo = time;
		lerpTimeOver = milliseconds/1000;
		lerpTimeTime = 0;
	}
	
	public float GetTime() {
		
		return uniSkyScript.TIME;
	}
	
	public void SetStormCloudCover(float ScloudCover) {
		
		rainScript.rainCover = ScloudCover;
	}
	
	public void LerpStormCloudCover(float ScloudCover, float milliseconds) {
		
		isStormCloudCoverLerping = true;
		lerpStormCloudCoverFrom = rainScript.rainCover;
		lerpStormCloudCoverTo = ScloudCover;
		lerpStormCloudCoverOver = milliseconds/1000;
		lerpStormCloudCoverTime = 0;
	}
	
	public void SetRainLevel(float rainLevel, float sfxLevel) {
		
		rainScript.rainEmitter.minEmission =  rainLevel;
		rainScript.rainEmitter.maxEmission = rainLevel;
	}
	
	public void LerpRainLevel(float rainLevel, float sfxLevel, float milliseconds) {
		
		isRainLevelLerping = true;
		lerpRainLevelFrom = rainScript.rainEmitter.minEmission;
		lerpRainSFXLevelFrom = rainScript.rainSFX.volume;
		lerpRainSFXLevelTo = sfxLevel;
		lerpRainLevelTo = rainLevel;
		lerpRainLevelOver = milliseconds/1000;
		lerpRainLevelTime = 0;
	}
	
	public void SetStormLevel(float stormLevel, float sfxLevel) {
		
		rainScript.heavyRainEmitter.minEmission =  stormLevel;
		rainScript.heavyRainEmitter.maxEmission = stormLevel;
	}
	
	public void LerpStormLevel(float stormLevel, float sfxLevel, float milliseconds) {
		
		isStormLevelLerping = true;
		lerpStormLevelFrom = rainScript.heavyRainEmitter.minEmission;
		lerpStormSFXLevelFrom = rainScript.stormSFX.volume;
		lerpStormSFXLevelTo = sfxLevel;
		lerpStormLevelTo = stormLevel;
		lerpStormLevelOver = milliseconds/1000;
		lerpStormLevelTime = 0;
	}
	
	public void SetSunIntensity(float intensity) {
		
		rainScript.sun.intensity = intensity;
	}
	
	public void LerpSunIntensity(float intensity, float milliseconds) {
		
		isSunIntensityLerping = true;
		lerpSunIntensityFrom = rainScript.sun.intensity;
		lerpSunIntensityTo = intensity;
		lerpSunIntensityOver = milliseconds/1000;
		lerpSunIntensityTime = 0;
	}
	
	public void SetFogLevel(float fogLevel) {
		
		RenderSettings.fogDensity = fogLevel;
	}
	
	public void LerpFogLevel(float fogLevel, float milliseconds) {
		
		isFogLevelLerping = true;
		lerpFogLevelFrom = RenderSettings.fogDensity;
		lerpFogLevelTo = fogLevel;
		lerpFogLevelOver = milliseconds/1000;
		lerpFogLevelTime = 0;
	}
	
	public void SetDropletLevel(float dropletLevel) {
		
		rainScript.dropEmitter.minEmission = dropletLevel;
		rainScript.dropEmitter.maxEmission = dropletLevel;
	}
	
	public void LerpDropletLevel(float dropletLevel, float milliseconds) {
		
		isDropletLevelLerping = true;
		lerpDropletLevelFrom = rainScript.dropEmitter.minEmission;
		lerpDropletLevelTo = dropletLevel;
		lerpDropletLevelOver = milliseconds/1000;
		lerpDropletLevelTime = 0;
	}
	
	public void SetCloudSpeedDirection(Vector3 speedDirection) {
		
		speed = speedDirection;
	}
	
	public void LerpCloudSpeedDirection(Vector3 speedDirection, float milliseconds) {
		
		isCloudSpeedDirectionLerping = true;
		lerpCloudSpeedDirectionFrom = speed;
		lerpCloudSpeedDirectionTo = speedDirection;
		lerpCloudSpeedDirectionOver = milliseconds/1000;
		lerpCloudSpeedDirectionTime = 0;
	}
	
	public void SetColorVariance(Vector3 colorVariance) {
		
		uniSkyScript.colorVariance1 = colorVariance;
	}
	
	public void LerpColorVariance(Vector3 colorVariance, float milliseconds) {
		
		isColorVarianceLerping = true;
		lerpColorVarianceFrom = colorVariance1;
		lerpColorVarianceTo = colorVariance;
		lerpColorVarianceOver = milliseconds/1000;
		lerpColorVarianceTime = 0;
	}
	
	public void SetMoonSize(float SmoonSize) {
		moonSize = SmoonSize;
	}
	
	public void ClearDropletBuffer() {
		
		dropletCam.clearFlags = CameraClearFlags.SolidColor;
		dropletCam.backgroundColor = new Color(0.5f, 0.5f, 1.0f, 1.0f);
	}
	
	public void SetSunShadows(LightShadows sunShadows) {
	
		Light sunLight = (Light)GameObject.Find("Sun").GetComponent(typeof(Light));
		sunLight.shadows = sunShadows;
	}
	
	public void SetMoonShadows(LightShadows moonShadows) {
	
		Light moonLight = (Light)GameObject.Find("Moon").GetComponent(typeof(Light));
		moonLight.shadows = moonShadows;
	}
	
	public void Awake() {
		if (!mainCamera) {
			mainCamera = Camera.main;
			Debug.LogWarning("No camera was set. Setting camera to Camera.main");
		}
	}
	
	public void Start() {
		if (!exists) {
			Debug.LogWarning("UniSky was not instantiated. UniSky has been disabled.");
		}
	}
	
	void Update () {
	
		if (exists) {
			// resets the camera if switched at runtime
			if (uniSkyScript.myCamera != mainCamera) {
				GameObject.Destroy(lightningClone);
				Component.Destroy(rainImageEffect);
				Component.Destroy(offscreenParticleImageEffect);
				
				uniSkyScript.myCamera = mainCamera;
				rainImageEffect = mainCamera.gameObject.AddComponent("RainImageEffect") as RainImageEffect;
				offscreenParticleImageEffect = mainCamera.gameObject.AddComponent("OffscreenParticlesImageEffect") as OffscreenParticlesImageEffect;
				uniSkyScript.myCamera = mainCamera;
				lightningClone = Instantiate(Resources.Load("Lightning")) as GameObject;
				lightningClone.name = "Lightning";
				lightningClone.transform.parent = uniSkyScript.myCamera.transform;
				
				rainImageMaterial = Resources.Load("RainImageEffect") as Material;
				offscreenMaterial = Resources.Load("OffscreenCompositeMaterial") as Material;
				
				rainImageEffect.rainImageMaterial = rainImageMaterial;
				offscreenParticleImageEffect.CompositeMaterial = offscreenMaterial;
				
				// leave rest as is, but disable layers 8 and 9 (where the offscreen rain and droplets are)
				mainCamera.cullingMask &= ~(1 << layer1);
				mainCamera.cullingMask &= ~(1 << layer2);
			}
			
			// Update all parameters that are lerping
			if(isScatteringRadiusLerping && uniSkyScript.innerRadius != lerpScatteringRadiusTo) {
				lerpScatteringRadiusTime += Time.deltaTime;
				innerRadius = Mathf.Lerp(lerpScatteringRadiusFrom, lerpScatteringRadiusTo, lerpScatteringRadiusTime/lerpScatteringRadiusOver);
			}
			
			else {
				lerpScatteringRadiusTime = 0;
				isScatteringRadiusLerping = false;
			}
			
			if(isPrecipitationLevelLerping && uniSkyScript.precipitationLevel != lerpPrecipitationLevelTo) {
				lerpPrecipitationLevelTime += Time.deltaTime;
				precipitationLevel = Mathf.Lerp(lerpPrecipitationLevelFrom, lerpPrecipitationLevelTo, lerpPrecipitationLevelTime/lerpPrecipitationLevelOver);
			}
			
			else {
				lerpPrecipitationLevelTime = 0;
				isPrecipitationLevelLerping = false;
			}
			
			if(isSunIntensityLerping && rainScript.sun.intensity != lerpSunIntensityTo) {
				lerpSunIntensityTime += Time.deltaTime;
				rainScript.sun.intensity = Mathf.Lerp(lerpSunIntensityFrom, lerpSunIntensityTo, lerpSunIntensityTime/lerpSunIntensityOver);
			}
			
			else {
				lerpSunIntensityTime = 0;
				isSunIntensityLerping = false;
			}
			
			if(isCloudCoverLerping && uniSkyScript.cloudCover != lerpCloudCoverTo) {
				lerpCloudCoverTime += Time.deltaTime;
				cloudCover = Mathf.Lerp(lerpCloudCoverFrom, lerpCloudCoverTo, lerpCloudCoverTime/lerpCloudCoverOver);
			}
			
			else {
				lerpCloudCoverTime = 0;
				isCloudCoverLerping = false;
			}
			
			if(isTimeLerping && uniSkyScript.TIME != lerpTimeTo) {
				lerpTimeTime += Time.deltaTime;
				TIME = Mathf.Lerp(lerpTimeFrom, lerpTimeTo, lerpTimeTime/lerpTimeOver);
			}
			
			else {
				lerpTimeTime = 0;
				isTimeLerping = false;
			}
			
			if(isStormCloudCoverLerping && rainScript.rainCover != lerpStormCloudCoverTo) {
				lerpStormCloudCoverTime += Time.deltaTime;
				rainScript.rainCover = Mathf.Lerp(lerpStormCloudCoverFrom, lerpStormCloudCoverTo, lerpStormCloudCoverTime/lerpStormCloudCoverOver);
			}
			
			else {
				lerpStormCloudCoverTime = 0;
				isStormCloudCoverLerping = false;
			}
			
			if(isDropletLevelLerping && rainScript.dropEmitter.minEmission != lerpDropletLevelTo) {
				lerpDropletLevelTime += Time.deltaTime;
				rainScript.dropEmitter.minEmission = Mathf.Lerp(lerpDropletLevelFrom, lerpDropletLevelTo, lerpDropletLevelTime/lerpDropletLevelOver);
				rainScript.dropEmitter.maxEmission = rainScript.dropEmitter.minEmission;
			}
			
			else {
				lerpDropletLevelTime = 0;
				isDropletLevelLerping = false;
			}
			
			if(isFogLevelLerping && RenderSettings.fogDensity != lerpFogLevelTo) {
				lerpFogLevelTime += Time.deltaTime;
				RenderSettings.fogDensity = Mathf.Lerp(lerpFogLevelFrom, lerpFogLevelTo, lerpFogLevelTime/lerpFogLevelOver);
			}
			
			else {
				lerpFogLevelTime = 0;
				isFogLevelLerping = false;
			}
			
			if(isViewDistanceLerping && uniSkyScript.viewDistance != lerpViewDistanceTo) {
				lerpViewDistanceTime += Time.deltaTime;
				viewDistance = Mathf.Lerp(lerpViewDistanceFrom, lerpViewDistanceTo, lerpViewDistanceTime/lerpViewDistanceOver);
			}
			
			else {
				lerpViewDistanceTime = 0;
				isViewDistanceLerping = false;
			}
			
			if(isRainLevelLerping && rainScript.rainEmitter.minEmission != lerpRainLevelTo) {
				lerpRainLevelTime += Time.deltaTime;
				rainScript.rainEmitter.minEmission = Mathf.Lerp(lerpRainLevelFrom, lerpRainLevelTo, lerpRainLevelTime/lerpRainLevelOver);
				rainScript.rainEmitter.maxEmission = rainScript.rainEmitter.minEmission;
				rainScript.rainSFX.volume = Mathf.Lerp(lerpRainSFXLevelFrom, lerpRainSFXLevelTo, lerpRainLevelTime/lerpRainLevelOver);
				
				if(!rainScript.rainSFX.isPlaying) {
					rainScript.rainSFX.Play();
					rainScript.rainSFX.loop = true;
				}
			}
			
			else {
				lerpRainLevelTime = 0;
				isRainLevelLerping = false;
			}
			
			if(isStormLevelLerping && rainScript.heavyRainEmitter.minEmission != lerpStormLevelTo) {
				lerpStormLevelTime += Time.deltaTime;
				rainScript.heavyRainEmitter.minEmission = Mathf.Lerp(lerpStormLevelFrom, lerpStormLevelTo, lerpStormLevelTime/lerpStormLevelOver);
				rainScript.heavyRainEmitter.maxEmission = rainScript.heavyRainEmitter.minEmission;
				rainScript.stormSFX.volume = Mathf.Lerp(lerpStormSFXLevelFrom, lerpStormSFXLevelTo, lerpStormLevelTime/lerpStormLevelOver);
				
				if(!rainScript.stormSFX.isPlaying) {
					rainScript.stormSFX.Play();
					rainScript.stormSFX.loop = true;
				}
			}
			
			else {
				lerpStormLevelTime = 0;
				isStormLevelLerping = false;
			}
			
			if(isCloudSpeedDirectionLerping && uniSkyScript.speed != lerpCloudSpeedDirectionTo) {
				lerpCloudSpeedDirectionTime += Time.deltaTime;
				speed = Vector3.Lerp(lerpCloudSpeedDirectionFrom, lerpCloudSpeedDirectionTo, lerpCloudSpeedDirectionTime/lerpCloudSpeedDirectionOver);
			}
			
			else {
				lerpCloudSpeedDirectionTime = 0;
				isCloudSpeedDirectionLerping = false;
			}
			
			if(isAmbientLightingLerping && RenderSettings.ambientLight != lerpAmbientLightingTo) {
				lerpAmbientLightingTime += Time.deltaTime;
				RenderSettings.ambientLight = Vector4.Lerp(lerpAmbientLightingFrom, lerpAmbientLightingTo, lerpAmbientLightingTime/lerpAmbientLightingOver);
			}
			
			else {
				lerpAmbientLightingTime = 0;
				isAmbientLightingLerping = false;
			}
			
			if(isColorVarianceLerping && uniSkyScript.colorVariance1 != lerpColorVarianceTo) {
				lerpColorVarianceTime += Time.deltaTime;
				colorVariance1 = Vector3.Lerp(lerpColorVarianceFrom, lerpColorVarianceTo, lerpColorVarianceTime/lerpColorVarianceOver);
			}
			
			else {
				lerpColorVarianceTime = 0;
				isColorVarianceLerping = false;
			}
			
			if(isGlowVarianceLerping && uniSkyScript.glowVariance != lerpGlowVarianceTo) {
				lerpGlowVarianceTime += Time.deltaTime;
				glowVariance = Mathf.Lerp(lerpGlowVarianceFrom, lerpGlowVarianceTo, lerpGlowVarianceTime/lerpGlowVarianceOver);
			}
			
			else {
				lerpGlowVarianceTime = 0;
				isGlowVarianceLerping = false;
			}
			
			// Time
			if (!controlTimeFromAPI) {
				TIME += speedOfTime;
				if (TIME > 24) {
					TIME -= 24;
				}
			}
			
			// Update UI things
			uniSkyScript.precipitationLevel = precipitationLevel;
			uniSkyScript.moonTexture = moonTexture;
			uniSkyScript.moonSize = moonSize;
			uniSkyScript.starTexture = starTexture;
			uniSkyScript.rainAudio = rainAudio;
			uniSkyScript.stormAudio = stormAudio;
			uniSkyScript.thunderAudio = thunderAudio;
			uniSkyScript.innerRadius = innerRadius;
			uniSkyScript.cloudCover = cloudCover;
			uniSkyScript.colorVariance1 = colorVariance1;
			uniSkyScript.colorVariance2 = colorVariance2;
			uniSkyScript.glowVariance = glowVariance;
			uniSkyScript.viewDistance = viewDistance;
			uniSkyScript.speed = speed;
			uniSkyScript.rayleighLevel = rayleighLevel;
			uniSkyScript.TIME = TIME;
			uniSkyScript.useSystemTime = useSystemTime;
			uniSkyScript.speedOfTime = speedOfTime;
		}
	}
}
