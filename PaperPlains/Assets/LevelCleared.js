#pragma strict

function Start () {
	var noofstars = PlayerPrefs.GetInt("noofstars");
	var star1 = GameObject.Find("star1").GetComponent(SpriteRenderer);
	var star2 = GameObject.Find("star2").GetComponent(SpriteRenderer);
	var star3 = GameObject.Find("star3").GetComponent(SpriteRenderer);
	if(noofstars == 1){
		star1.enabled = true;
		star2.enabled = false;
		star3.enabled = false;
	}
	if(noofstars == 2){
		star1.enabled = false;
		star2.enabled = true;
		star3.enabled = false;
	}
	if(noofstars == 3){
		star1.enabled = false;
		star2.enabled = false;
		star3.enabled = true;
	}
}

function Update () {

}