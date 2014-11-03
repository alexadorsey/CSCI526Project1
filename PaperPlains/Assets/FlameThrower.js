#pragma strict

var flamecollider : GameObject;
var torch : ParticleSystem;
var flag : boolean;

function Start () {
	flamecollider = GameObject.Find("Flamecollider");
	torch.emissionRate = 0.0f;
	flag = false;
	InvokeRepeating("HandleFlame", 0, 2);
}

function FixedUpdate () {
}

function HandleFlame()
{
	if(flag)
	{
		flamecollider.GetComponent(Collider).enabled = false;
		torch.emissionRate = 0.0f;
		flag = false;
	}
	else
	{
		torch.emissionRate = 1500.0f;
		flamecollider.GetComponent(Collider).enabled = true;
		flag = true;
	}
}