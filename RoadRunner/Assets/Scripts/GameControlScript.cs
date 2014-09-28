using UnityEngine;
using System.Collections;

public class GameControlScript : MonoBehaviour {

	void Start(){
		Time.timeScale = 1;  // set the time scale to 1, to start the game world. This is needed if you restart the game from the game over menu
	}

	void Update () {
		if(isGameOver)     //check if isGameOver is true
			return;      //move out of the function
		
	//	totalTimeElapsed += Time.deltaTime;
	//	score = totalTimeElapsed*100;  //calculate the score based on total time elapsed
	//	timeRemaining -= Time.deltaTime; //decrement the time remaining by 1 sec every update
		if(numLives <= 0){
			isGameOver = true;    // set the isGameOver flag to true if timeRemaining is zero
		}
	} 


	//float timeRemaining = 10;   //Pre-earned time
	//float timeExtension = 3f;   //time to extend by on collecting powerup
	//float timeDeduction = 2f;   //time to reduce, on collecting the snag
	//float totalTimeElapsed = 0;  
	//float score=0f;      //total score
	int score = 0;
	int numLives = 3;
	public bool isGameOver = false; 

	public void PowerupCollected() {
		//timeRemaining += timeExtension;   //add time to the time remaining
		score += 1;
	}
	
	public void AlcoholCollected() {
		//timeRemaining -= timeDeduction;   // deduct time
		numLives = numLives - 1;
	}



	void OnGUI() {
		//check if game is not over, if so, display the score and the time left
		if(!isGameOver)   
		{
			GUI.contentColor = Color.black;
			GUI.Label(new Rect(10, 10, Screen.width/5, Screen.height/6),"LIVES: "+ numLives.ToString());
			GUI.Label(new Rect(Screen.width-(Screen.width/6), 10, Screen.width/6, Screen.height/6), "SCORE: "+ score.ToString());
		}
		//if game over, display game over menu with score
		else
		{
			Time.timeScale = 0; //set the timescale to zero so as to stop the game world
			
			//display the final score
			GUI.Box(new Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "GAME OVER\nYOUR SCORE: "+(int)score);
			
			//restart the game on click
			if (GUI.Button(new Rect(Screen.width/4+10, Screen.height/4+Screen.height/10+10, Screen.width/2-20, Screen.height/10), "RESTART")){
				Application.LoadLevel(Application.loadedLevel);
			}
			
			//load the main menu, which as of now has not been created
			if (GUI.Button(new Rect(Screen.width/4+10, Screen.height/4+2*Screen.height/10+10, Screen.width/2-20, Screen.height/10), "MAIN MENU")){
				Application.LoadLevel(1);
			}
			
			//exit the game
			if (GUI.Button(new Rect(Screen.width/4+10, Screen.height/4+3*Screen.height/10+10, Screen.width/2-20, Screen.height/10), "EXIT GAME")){
				Application.Quit();
			}
		}
	}
}
