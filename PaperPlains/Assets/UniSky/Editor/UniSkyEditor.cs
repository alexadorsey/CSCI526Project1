using UnityEngine;
using UnityEditor;
using System.Collections;
using System;

[CustomEditor(typeof(UniSkyAPI))]

public class UniSkyEditor : Editor {

	public Texture2D uniSkyImage;
	public UniSkyAPI castedTarget;
	
	
	// Initialize all components and default values
	public void Awake()
	{
		castedTarget = (UniSkyAPI) target;
	}
	
	public override void OnInspectorGUI() {
		
		EditorGUIUtility.LookLikeControls(200, 50);
		
		if (!uniSkyImage) {
			uniSkyImage = (Texture2D)UnityEngine.Resources.Load("UniSkyLogo", typeof(Texture2D));
		}
		
		EditorGUILayout.Separator();
		
		Rect imageRect = EditorGUILayout.BeginHorizontal();
		imageRect.x = imageRect.width / 2 - 160;
		if (imageRect.x < 0) {
			imageRect.x = 0;
		}
		imageRect.width = 320;
		imageRect.height = 140;
		GUI.DrawTexture(imageRect, uniSkyImage);
		EditorGUILayout.EndHorizontal();
		
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		EditorGUILayout.Separator();
		
		EditorGUILayout.BeginHorizontal();
		// Tabs for different components
		String[] tabOptions = new String[6];
		tabOptions[0] = "General";
		tabOptions[1] = "Sky";
		tabOptions[2] = "Clouds";
		tabOptions[3] = "Sun";
		tabOptions[4] = "Moon";
		tabOptions[5] = "Weather";
		castedTarget.tabInt = GUILayout.Toolbar(castedTarget.tabInt, tabOptions);
		EditorGUILayout.EndHorizontal();
		EditorGUILayout.Separator();
		
		switch (castedTarget.tabInt) {
			case 0:
				castedTarget.mainCamera = (Camera)EditorGUILayout.ObjectField("Scene Camera", castedTarget.mainCamera, typeof(Camera), true);
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				EditorGUILayout.PrefixLabel("Weather Layer 1");
				castedTarget.layer1 = EditorGUILayout.IntSlider(castedTarget.layer1, 8, 31);
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				EditorGUILayout.PrefixLabel("Weather Layer 2");
				castedTarget.layer2 = EditorGUILayout.IntSlider(castedTarget.layer2, 8, 31);
				break;
			case 1:
				EditorGUILayout.PrefixLabel("Scattering Radius (Affects sky color)");
				castedTarget.innerRadius = EditorGUILayout.Slider(castedTarget.innerRadius, 44000f, 46000f);
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				castedTarget.starTexture = (Texture2D)EditorGUILayout.ObjectField("Star Texture", castedTarget.starTexture, typeof(Texture2D), false);
				break;
			case 2:
				EditorGUILayout.PrefixLabel("Precipitation Level");
				castedTarget.precipitationLevel = EditorGUILayout.Slider(castedTarget.precipitationLevel, 0f, 2f);
				EditorGUILayout.PrefixLabel("Cloud Cover");
				castedTarget.cloudCover = EditorGUILayout.Slider(castedTarget.cloudCover, -5f, 5f);
				EditorGUILayout.PrefixLabel("Glow Variance");
				castedTarget.glowVariance = EditorGUILayout.Slider(castedTarget.glowVariance, 0f, 20f);
				EditorGUILayout.PrefixLabel("View Distance");
				castedTarget.viewDistance = EditorGUILayout.Slider(castedTarget.viewDistance, 0f, 20f);
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				EditorGUILayout.PrefixLabel("Cloud Direction/Speed");
				castedTarget.speed = EditorGUILayout.Vector3Field("", castedTarget.speed);
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				castedTarget.colorVariance1 = EditorGUILayout.Vector3Field("Color Variance 1", castedTarget.colorVariance1);
				EditorGUILayout.Separator();
				castedTarget.colorVariance2 = EditorGUILayout.Vector3Field("Color Variance 2", castedTarget.colorVariance2);
				break;
			case 3:
				EditorGUILayout.PrefixLabel("Rayleigh Level (affects sun color)");
				castedTarget.rayleighLevel = EditorGUILayout.Slider(castedTarget.rayleighLevel, -20f, 100f);
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				castedTarget.useSystemTime = EditorGUILayout.Toggle("Use System Time", castedTarget.useSystemTime);
				EditorGUILayout.Separator();
				castedTarget.controlTimeFromAPI = EditorGUILayout.Toggle("Control Time From API", castedTarget.controlTimeFromAPI);
				EditorGUILayout.Separator();
				EditorGUILayout.Separator();
				EditorGUILayout.PrefixLabel("Time (if not synced to system time)");
				castedTarget.TIME = EditorGUILayout.Slider(castedTarget.TIME, 0f, 24f);
				EditorGUILayout.PrefixLabel("Speed of Time");
				castedTarget.speedOfTime = EditorGUILayout.Slider(castedTarget.speedOfTime, 0f, 0.1f);
				break;
			case 4:
				castedTarget.moonTexture = (Texture2D)EditorGUILayout.ObjectField("Moon Texture", castedTarget.moonTexture, typeof(Texture2D), false);
				EditorGUILayout.Separator();
				EditorGUILayout.PrefixLabel("Moon Size");
				castedTarget.moonSize = EditorGUILayout.Slider(castedTarget.moonSize, 0.0f, 50.0f);
				break;
			case 5:
				EditorGUILayout.BeginHorizontal();
				castedTarget.rainAudio = (AudioClip)EditorGUILayout.ObjectField("Rain SFX", castedTarget.rainAudio, typeof(AudioClip), false);
				EditorGUILayout.EndHorizontal();
				EditorGUILayout.BeginHorizontal();
				castedTarget.stormAudio = (AudioClip)EditorGUILayout.ObjectField("Storm SFX", castedTarget.stormAudio, typeof(AudioClip), false);
				EditorGUILayout.EndHorizontal();
				EditorGUILayout.BeginHorizontal();
				castedTarget.thunderAudio = (AudioClip)EditorGUILayout.ObjectField("Thunder SFX", castedTarget.thunderAudio, typeof(AudioClip), false);
				EditorGUILayout.EndHorizontal();
				break;
		}
		
		if(castedTarget.layer1 == castedTarget.layer2) {
			Debug.Log("Weather layers cannot be the same; visual errors may occur");
		}
		
		if (GUI.changed)
		{
			EditorUtility.SetDirty (castedTarget);
		}
	}
}
