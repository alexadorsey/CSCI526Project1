var maxX : float;
var minX : float;
var maxZ : float;
var minZ : float;
var maxHeight : int;

function Update () {

	// Keep plane from moving above max height
    if (rigidbody.position.y >= maxHeight) {
		transform.position = Vector3 (rigidbody.position.x, maxHeight, rigidbody.position.z);
	}
	
	if (rigidbody.position.z > maxZ) {
		transform.position = Vector3 (rigidbody.position.x, rigidbody.position.y, maxZ);
	}
	if (rigidbody.position.z < minZ) {
		transform.position = Vector3 (rigidbody.position.x, rigidbody.position.y, minZ);
	}
	if (rigidbody.position.x > maxX) {
		transform.position = Vector3 (maxX, rigidbody.position.y, rigidbody.position.z);
	}
	if (rigidbody.position.x < minX) {
		transform.position = Vector3 (minX, rigidbody.position.y, rigidbody.position.z);
	}

}