var paperPlains : GUIText;

var AvenirNextH : Font;

var startButtonStyle : GUIStyle;

function Start () {
	paperPlains = GameObject.Find("Paper Plains").guiText;	
	paperPlains.fontSize = Mathf.Floor(Screen.dpi/2);	
	
	startButtonStyle = new GUIStyle();
    startButtonStyle.fontSize = Mathf.Floor(Screen.dpi/4);
    startButtonStyle.font = AvenirNextH;
    startButtonStyle.alignment = TextAnchor.MiddleCenter;
    startButtonStyle.normal.textColor = Color.white;

	
}

function OnGUI(){
	if (GUI.Button (Rect (Screen.width/2 - 50, Screen.height/2 - 10, 200, 30), "START", startButtonStyle)) {
		Application.LoadLevel("Levels");
    }
    
    if (GUI.Button (Rect (Screen.width/2 - 50, Screen.height/2 + 130, 200, 30), "ABOUT", startButtonStyle)) {
    }
	
}