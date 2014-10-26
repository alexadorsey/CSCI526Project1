/* Written for "Dawn of the Tyrant" by SixTimesNothing 
/* Please visit www.sixtimesnothing.com to learn more
*/

using UnityEngine;
using System.Collections;
using System;

public class DirectionalSun : MonoBehaviour {

	private Vector3 m_vDirection;
	private Vector3 m_vColor;
	public Vector3 sunDirection = new Vector3();
	public Vector3 sunDirection2 = new Vector3();
	private float SolarAzimuth;
	private float solarAltitude;
	public Vector3 sunPosition;
	private float domeRadius;
	private float m_fTheta;
	private float m_fPhi;
	
	public float rayleighLevel;
	public float TIME;
	public bool useSystemTime;
	public float speedOfTime;

	public void Awake() {
		if (useSystemTime) {
			int hours = int.Parse(DateTime.Now.ToString("HH"));
			int minutes= int.Parse(DateTime.Now.ToString("mm"));
			int seconds = int.Parse(DateTime.Now.ToString("ss"));
			float realTime = hours + (minutes / 60f) + (seconds / 3600f);
			TIME = realTime;
		}

		domeRadius = 46125f;
	}

	public void Update() {
		if (useSystemTime) {
			int hours = int.Parse(DateTime.Now.ToString("HH"));
			int minutes = int.Parse(DateTime.Now.ToString("mm"));
			int seconds = int.Parse(DateTime.Now.ToString("ss"));
			float realTime = hours + (minutes / 60f) + (seconds / 3600f);
			TIME = realTime;
		} 
		
		SetPosition(TIME);
		transform.position = sunPosition;
		
		// Rotate the sun about the y axis to change rise/set direction
	//	transform.eulerAngles += new Vector3(0,100,0);
	}

	public void SetPosition(float fTime) {
		float JULIANDATE = 80;
		float MERIDIAN = 0 * 15;
		float LATITUDE = Mathf.Deg2Rad * 0;
		float LONGITUDE =  0;

		float t = fTime + 0.170f * Mathf.Sin((4.0f * Mathf.PI * (JULIANDATE - 80.0f)) / 373.0f)
					 - 0.129f * Mathf.Sin((2.0f * Mathf.PI * (JULIANDATE - 8.0f)) / 355.0f)
					 + (12 * (MERIDIAN - LONGITUDE)) / Mathf.PI;

		float fDelta = 0.4093f * Mathf.Sin((2.0f * Mathf.PI * (JULIANDATE - 81.0f)) / 368.0f);

		float fSinLat = Mathf.Sin(LATITUDE);
		float fCosLat = Mathf.Cos(LATITUDE);
		float fSinDelta = Mathf.Sin(fDelta);
		float fCosDelta = Mathf.Cos(fDelta);
		float fSinT = Mathf.Sin((Mathf.PI * t) / 12.0f);
		float fCosT = Mathf.Cos((Mathf.PI * t) / 12.0f);

		float fTheta = Mathf.PI / 2.0f - Mathf.Asin(fSinLat * fSinDelta - fCosLat * fCosDelta * fCosT);
		float fPhi = Mathf.Atan((-fCosDelta * fSinT) / (fCosLat * fSinDelta - fSinLat * fCosDelta * fCosT));

		float opp = -fCosDelta * fSinT;
		float adj = -(fCosLat * fSinDelta + fSinLat * fCosDelta * fCosT);
		SolarAzimuth = Mathf.Atan2(opp, adj);
		solarAltitude = Mathf.Asin(fSinLat * fSinDelta - fCosLat * fCosDelta * fCosT);

		SetPosition2(fTheta, fPhi);
	}

	public void SetPosition2(float fTheta, float fPhi ) {
		m_fTheta = fTheta;
		m_fPhi = fPhi;

		float fCosTheta = Mathf.Cos( m_fTheta );
		float fSinTheta = Mathf.Sin(m_fTheta);
		float fCosPhi = Mathf.Cos(m_fPhi);
		float fSinPhi = Mathf.Sin(m_fPhi);

		m_vDirection = new Vector3( fSinTheta * fCosPhi,fCosTheta,fSinTheta * fSinPhi );

		float phiSun = (Mathf.PI * 2.0f) - SolarAzimuth;

		sunDirection.x = domeRadius;
		sunDirection.y = phiSun;
		sunDirection.z = solarAltitude;
		sunPosition = sphericalToCartesian(sunDirection);

		sunDirection2 = calcDirection(m_fTheta, phiSun);
		m_vDirection = Vector3.Normalize(m_vDirection);
		transform.LookAt(sunDirection2);
		ComputeAttenuation();
	}

	public Vector3 calcDirection(float thetaSun, float phiSun) {
		Vector3 dir = new Vector3();
		dir.x = Mathf.Cos(0.5f * Mathf.PI - thetaSun) * Mathf.Cos(phiSun);
		dir.y = Mathf.Sin(0.5f * Mathf.PI - thetaSun);
		dir.z = Mathf.Cos(0.5f * Mathf.PI - thetaSun) * Mathf.Sin(phiSun);
		return dir.normalized;
	}

	public Vector3 sphericalToCartesian(Vector3 sunDir) {
		Vector3 res = new Vector3();
		res.y = sunDir.x * Mathf.Sin(sunDir.z);
		float tmp = sunDir.x * Mathf.Cos(sunDir.z);
		res.x = tmp * Mathf.Cos(sunDir.y);
		res.z = tmp * Mathf.Sin(sunDir.y);
		return res;
	}

	public void ComputeAttenuation() {
		float fBeta = 0.04608365822050f * 15.0f - 0.04586025928522f;
		float fTauR; 
		float fTauA;
		float[] fTau = new float[3];
		float tmp = 93.885f - (m_fTheta / Mathf.PI * 162.0f);
		float m = (1.0f / (Mathf.Cos(m_fTheta) + 0.15f * tmp)); 
		float[] fLambda = new float[3];
		fLambda[0] = 0.65f;	
		fLambda[1] = 0.57f;	
		fLambda[2] = 0.475f;	

		for (int i = 0; i < 3; i++) {
		
			// Rayleigh Scattering
			fTauR = Mathf.Exp(-m * (0.008735f * ((1.0f-m_vDirection.y)*rayleighLevel)) * Mathf.Pow(fLambda[i], -4.08f));

			float fAlpha = 1.3f;
			
			if (m < 0.0f) {
				fTau[i] = 0.0f;
			} else {
				fTauA = Mathf.Exp(-m * fBeta * Mathf.Pow(fLambda[i], -fAlpha));  
				fTau[i] = fTauR * fTauA;
			}
		}

		light.color = new Color(fTau[0] + Mathf.Lerp(0.1f, 0f, Mathf.Clamp(m_vDirection.y * 10, 0, 1)),
		fTau[1] + Mathf.Lerp(0.1f, 0f, Mathf.Clamp(m_vDirection.y * 10, 0, 1)), 
		fTau[2] + Mathf.Lerp(0.1f, 0f, Mathf.Clamp(m_vDirection.y * 10, 0, 1)));

	}
}
