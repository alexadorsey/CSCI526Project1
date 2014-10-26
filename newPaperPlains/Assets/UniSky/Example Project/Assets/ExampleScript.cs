using UnityEngine;
using System.Collections;

public class ExampleScript : MonoBehaviour {
	// instance of the API
	private UniSkyAPI uniSky;
	private float timeOfDay;
	private float speedOfTime = 0.4f;
	
	public void Awake() {
		
		// Define instance
		GameObject uniSkyObject = GameObject.Find("UniSkyAPI");
		if (!uniSkyObject) {
			Debug.LogWarning("The UniSky API object is not included in the scene or has been renamed.");
		} else {
			uniSky = (UniSkyAPI) uniSkyObject.GetComponent(typeof(UniSkyAPI));
			if (!uniSky) {
				Debug.LogWarning("The UniSky API component is not attached to the UniSky API object.");
			} else {
				// Initiate and create default UniSky 
				uniSky.InstantiateUniSky();
				
				// Set some initial states 
				uniSky.SetTime(12.0f);
				timeOfDay = 12.0f;
				uniSky.SetAmbientLighting(new Color(0.2f, 0.2f, 0.2f, 1f));
				uniSky.SetSunShadows(LightShadows.Soft);
			}
		}
	}
	
	public void Update() {
		if (uniSky) {
			timeOfDay += speedOfTime * Time.deltaTime;
			if (timeOfDay > 24.0f) {
				timeOfDay -= 24.0f;
			}
			UpdateTimeOfDay();
		}
	}
	
	public void UpdateTimeOfDay() {
		uniSky.SetTime(timeOfDay);
		float ambient;
		if (timeOfDay < 5 || timeOfDay > 19) {
			ambient = 0.13f; // Night
		} else if (timeOfDay > 7 && timeOfDay < 17) {
			ambient = 0.3f; // Day
		} else if (timeOfDay <= 7) {
			ambient = Mathf.Lerp(0.13f, 0.3f, (timeOfDay - 7) / 2); // Sunrise
		} else {
			ambient = Mathf.Lerp(0.3f, 0.13f, (timeOfDay - 17) / 2); // Sunset
		}
		uniSky.SetAmbientLighting(new Color(ambient, ambient, ambient, 1));
	}
}