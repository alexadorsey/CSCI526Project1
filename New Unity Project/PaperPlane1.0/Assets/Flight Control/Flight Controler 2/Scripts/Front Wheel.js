var Turn : int;
var Wheel : Transform;
var plane : Rigidbody;
function Update(){
    var v = Input.GetAxis("Horizontal"); 
    transform.localEulerAngles.y =  v*Turn;
    if (Input.GetKey(KeyCode.RightAlt)){
    plane.rigidbody.AddRelativeForce(0,0,2);
    }
}