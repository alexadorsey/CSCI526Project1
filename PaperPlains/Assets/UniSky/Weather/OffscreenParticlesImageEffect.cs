/* Written for "Dawn of the Tyrant" by SixTimesNothing 
/* Please visit www.sixtimesnothing.com to learn more
*/

using UnityEngine;
using System.Collections;

public class OffscreenParticlesImageEffect : MonoBehaviour {

	public RenderTexture offscreenRainRT;
	public RenderTexture frameBufferRT;

	public Material CompositeMaterial;

	public GameObject particleCameraGO;
	public Camera particleCamera;

	public int offscreenRainWidth;
	public int offscreenRainHeight;

	public void Start() {
		// Here you can change the quality/performance ratio for the heavy rain
		offscreenRainWidth = Screen.width/16;
		offscreenRainHeight = Screen.width/16;
		
		offscreenRainRT = new RenderTexture(offscreenRainWidth, offscreenRainHeight, 24);
		offscreenRainRT.filterMode = FilterMode.Bilinear;
		offscreenRainRT.Create();	
		
		frameBufferRT = new RenderTexture(Screen.width, Screen.height, 32);
		frameBufferRT.filterMode = FilterMode.Bilinear;
		frameBufferRT.Create();
		
		particleCameraGO = GameObject.Find("Offscreen Particle Cam");
		particleCamera = (Camera)particleCameraGO.GetComponent(typeof(Camera));
		
		particleCamera.targetTexture = offscreenRainRT;
		RenderTexture.active = offscreenRainRT;
		CompositeMaterial.SetTexture("_OffscreenRT", offscreenRainRT);
		CompositeMaterial.SetTexture("_Framebuffer", frameBufferRT);
	}

	public void OnRenderImage(RenderTexture source, RenderTexture destination) {

		particleCamera.Render();
		
		// solves some issues with antialiasing enabled
		Graphics.Blit(source, frameBufferRT);

		Graphics.Blit(frameBufferRT, frameBufferRT, CompositeMaterial);
		Graphics.Blit(frameBufferRT, destination);
	}
}
