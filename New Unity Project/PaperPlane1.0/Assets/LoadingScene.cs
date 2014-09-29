using UnityEngine;
using System.Collections;

public class LoadingScene : MonoBehaviour {
	public GameObject background;
	public GameObject progress;
	// Use this for initialization
	void Start () {
		background.SetActive (false);
		progress.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
