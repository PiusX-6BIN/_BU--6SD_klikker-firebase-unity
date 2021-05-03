mergeInto(LibraryManager.library, {

    SaveScoreToDatabase: function(score) {
        SaveScoreToFirebase(score);
    },

    GetHighscoresFromDatabase: function() {
        var highscores = GetHighscoresFromFirebase();
        return highscores;
    }
});