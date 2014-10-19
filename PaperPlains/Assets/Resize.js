var paperPlains : GUIText;

var AvenirNextH : Font;

var startButtonStyle : GUIStyle;
var aboutButtonStyle : GUIStyle;

function Start () {
	paperPlains = GameObject.Find("Paper Plains").guiText;	
	paperPlains.fontSize = Mathf.Floor(Screen.dpi/2.5);	
	paperPlains.transform.position = new Vector3(0.5,0.7,0);
	
	startButtonStyle = new GUIStyle();
    startButtonStyle.fontSize = Mathf.Floor(Screen.dpi/4);
    startButtonStyle.font = AvenirNextH;
    startButtonStyle.alignment = TextAnchor.MiddleCenter;
    startButtonStyle.normal.textColor = Color.white;
    
    
    aboutButtonStyle = new GUIStyle();
    aboutButtonStyle.fontSize = Mathf.Floor(Screen.dpi/4);
    aboutButtonStyle.font = AvenirNextH;
    aboutButtonStyle.alignment = TextAnchor.MiddleCenter;
    aboutButtonStyle.normal.textColor = Color.white;

	
}

function OnGUI(){
	var startButton = GUI.Button (Rect (Screen.width/2 - 50, (Screen.height/8) * 4, 200, 30), "START", startButtonStyle);
	if (startButton) {
		startButtonStyle.normal.textColor = Color.red;
		Application.LoadLevel("Levels");
    }
    

    if (GUI.Button (Rect (Screen.width/2 - 50, (Screen.height / 4) * 3 , 200, 30), "ABOUT", aboutButtonStyle)) {
    	Application.LoadLevel("Levels");

    }
	
}