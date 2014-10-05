var plane : Rigidbody;
var Strength: float;
var Boom : Transform;
var Dead : Transform;
var WholePlane : GameObject;
var minPitch : float = 1.0;
var maxPitch : float = 2.0;
function OnCollisionEnter(collision : Collision) {
if (collision.relativeVelocity.magnitude > Strength){
Instantiate(Boom, plane.position, plane.rotation);
Instantiate(Dead, plane.position, plane.rotation);
Destroy(WholePlane,0);
}
 }
function FixedUpdate(){
var currentSpeed = rigidbody.velocity.magnitude;
    audio.pitch = minPitch + ((currentSpeed)/maxPitch); 

}