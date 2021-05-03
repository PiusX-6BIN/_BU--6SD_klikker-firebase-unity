var firebaseConfig = {
    apiKey: "AIzaSyCvq9lqmkogyvF9OUGrTezsYcC4CrvwIok",
    authDomain: "voorbeeld-firebase.firebaseapp.com",
    databaseURL: "https://voorbeeld-firebase-default-rtdb.firebaseio.com",
    projectId: "voorbeeld-firebase",
    storageBucket: "voorbeeld-firebase.appspot.com",
    messagingSenderId: "1009007056725",
    appId: "1:1009007056725:web:89eba0cd7120c767d981dc",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
SaveAllHighscores();

function SaveAllHighscores() {
    let database = firebase.database();
    let highsoresRef = database.ref("highscores");

    highsoresRef.on("value", GotData, GotError);
}

function GotError(error) {
    console.log("Error!", error);
}

function GotData(data) {
    let highscoreValues = data.val();
    let highscoreKeys = Object.keys(highscoreValues);
    let sortedHighscores = [];

    for (let i = 0; i < highscoreKeys.length; ++i) {
        let key = highscoreKeys[i];
        sortedHighscores.push(highscoreValues[key]);
    }

    sortedHighscores.sort(CompareHighscores);

    for (let i = 0; i < sortedHighscores.length; ++i) {
        highscores.push(
            sortedHighscores[i].name + ": " + sortedHighscores[i].score
        );
    }
}

function CompareHighscores(a, b) {
    if (a.score > b.score) {
        return -1;
    } else if (b.score > a.score) {
        return 1;
    } else {
        return 0;
    }
}

function SaveScoreToFirebase(newScore) {
    // get a reference to the correct 'table'
    let database = firebase.database();
    let highscoresRef = database.ref("highscores");

    // get the data you want to save
    let data = {
        name: "UNITY",
        score: newScore,
    };

    // save the data into the 'table'
    highscoresRef.push(data);
}
