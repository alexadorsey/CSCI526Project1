using UnityEngine;
using System.Collections;

public class SpawnScript : MonoBehaviour {

	public GameObject obstacle;
	public GameObject powerup;
	
	float timeElapsed = 0;
	float spawnCycle = 0.8f;  // the higher the value of the spawnCycle, the larger the gap b/t objects
	bool spawnPowerup = true;

	// The current slide we are on
	int currentSlide = 0;

	// Contains object information for each slide
	// {-1, -3, 1} = object 0 placed at x=-3 & y=1
	static int[][,] objectArray = new int[3][,] {
		new int[,] { {0,-3,1}, {1,0,1}, {0,3, 1} },
		new int[,] { {1,-3,1}, {1,0,1}, {1,3, 1} },
		new int[,] { {0,-3,1}, {0,0,1}, {1,3, 1} } 
	};

	// The number of slides
	int numOfSlides = objectArray.Length;
	//print ("numOfSlides: " + numOfSlides);
	
	// Get the object given the object Number
	GameObject getObject(int objectNum){
		switch (objectNum) {
			// PowerUp
			case 0:
				return (GameObject)Instantiate(powerup);
				break;
			// Obstacle
			case 1:
				return (GameObject)Instantiate(obstacle);
				break;
			default:
				return (GameObject)Instantiate(powerup);
			}
	}

	void Start(){
		print ("numOfSlides: " + numOfSlides);
	}

	void Update () {
		timeElapsed += Time.deltaTime;
		if(timeElapsed > spawnCycle) {

			int lengthA = objectArray[currentSlide].Length/3;
			for (int i = 0; i < 3; i++){
				int[,] obj = objectArray[currentSlide];
				GameObject temp = getObject(obj[i, 0]);
				Vector3 pos = temp.transform.position;
				temp.transform.position = new Vector3(obj[i,1], obj[i,2], pos.z);
			}

			// Update/restart current slides
			// TO-DO: End game when currentSlide == numOfSlides

			print ("currentSlide: " + currentSlide);
			if (currentSlide >= numOfSlides - 1){
				currentSlide = 0;
			} else {
				currentSlide += 1;
			}
			timeElapsed -= spawnCycle;
			/*

			GameObject temp;
			GameObject temp2;
			if(spawnPowerup) {
				temp = (GameObject)Instantiate(powerup);
				Vector3 pos = temp.transform.position;
				Vector2 vec = vectorPowerups[0,0];
				temp.transform.position = new Vector3(vec[0], vec[1], pos.z);

				temp2 = (GameObject)Instantiate(powerup);
				Vector3 pos2 = temp2.transform.position;
				//temp.transform.position = new Vector3(-3, pos.y, pos.z);
				temp2.transform.position = new Vector3(4, vec[1], pos2.z);
			} else {
				temp = (GameObject)Instantiate(obstacle);
				Vector3 pos = temp.transform.position;
				temp.transform.position = new Vector3(Random.Range(-3, 4), pos.y, pos.z);
			}
			
			timeElapsed -= spawnCycle;
			spawnPowerup = !spawnPowerup;
			*/
		}
	}
}
