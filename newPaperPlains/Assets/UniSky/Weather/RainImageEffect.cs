/* Written for "Dawn of the Tyrant" by SixTimesNothing 
/* Please visit www.sixtimesnothing.com to learn more
*/

using UnityEngine;
using System.Collections;

public class RainImageEffect : MonoBehaviour {

	public RenderTexture rainDropBuffer;
	private GameObject rainEffectGO;
	public Material rainImageMaterial;
	private RainCloudLayer rainEffectScript;
	
	public RenderTexture frameBufferRT;

	public void Start() {
		rainEffectGO = GameObject.Find("Rain Cloud Layer");
		rainEffectScript = (RainCloudLayer)rainEffectGO.GetComponent(typeof(RainCloudLayer));
		
		frameBufferRT = new RenderTexture(Screen.width, Screen.height, 32);
		frameBufferRT.filterMode = FilterMode.Bilinear;
		frameBufferRT.Create();
		
		rainImageMaterial.SetTexture("_DropBuffer", rainEffectScript.accumDropBuffer);
	}
		
	public void Update() {
		rainDropBuffer = rainEffectScript.accumDropBuffer;
	}

	public void OnRenderImage(RenderTexture source, RenderTexture destination) {
		
		// solves some issues with antialiasing enabled
		Graphics.Blit(source, frameBufferRT);
		
		Graphics.Blit(rainDropBuffer, rainDropBuffer, rainImageMaterial, 1);
		
		Graphics.Blit(frameBufferRT, destination, rainImageMaterial, 2);
	}
}
