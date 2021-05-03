using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.UI;

public class Clicker : MonoBehaviour
{
    [SerializeField]
    int score = 0;

    List<string> highscores = new List<string>();

    [SerializeField]
    Text scoreText = null;

    [SerializeField]
    Text highscoreListText = null;

    [DllImport("__Internal")]
    private static extern void SaveScoreToDatabase(int score);

    // [DllImport("__Internal")]
    // private static extern void UnityIsReady();

    [DllImport("__Internal")]
    private static extern string[] GetHighscoresFromDatabase();

    void Start()
    {
        // UnityIsReady();
        highscores = new List<string>(GetHighscoresFromDatabase());
        string highscoreText = "";
        for (int i = 0; i < this.highscores.Count; i++)
        {
            highscoreText += this.highscores[i] + "\n";
        }
        highscoreListText.text = highscoreText;
    }

    void OnMouseDown()
    {
        this.score++;
        scoreText.text = this.score.ToString();
    }

    public void SubmitScoreToDatabase()
    {
        SaveScoreToDatabase(this.score);
    }
}
