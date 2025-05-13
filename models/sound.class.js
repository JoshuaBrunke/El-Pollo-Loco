class AudioHub {
    static BGM = new Audio("./assets/sounds/bgm.mp3");
    static BOSS_ANGRY = new Audio("./assets/sounds/boss-angry.wav");
    static BOSS_ATTACK = new Audio("./assets/sounds/boss-attack.wav");
    static CHICKENS = new Audio("./assets/sounds/chickens.wav");
    static DEFEAT = new Audio("./assets/sounds/defeat.mp3");
    static GET_BOTTLE = new Audio("./assets/sounds/get-bottle.wav");
    static GET_COIN = new Audio("./assets/sounds/get-coin.wav");
    static HIT_WITH_BOTTLE = new Audio("./assets/sounds/hit-with-bottle.wav");
    static JUMP_ATTACK = new Audio("./assets/sounds/jump-attack.wav");
    static SHORT_ERROR = new Audio("./assets/sounds/short_error.wav");
    static SLEEP = new Audio("./assets/sounds/sleep.wav");
    static TAKE_DAMAGE = new Audio("./assets/sounds/take-damage.wav");
    static VICTORY = new Audio("./assets/sounds/victory.wav");
    static WALKING = new Audio("./assets/sounds/walking.wav");

    static allSounds = [AudioHub.BGM, AudioHub.BOSS_ANGRY, AudioHub.BOSS_ATTACK, AudioHub.CHICKENS,
        AudioHub.DEFEAT, AudioHub.GET_BOTTLE, AudioHub.GET_COIN, AudioHub.HIT_WITH_BOTTLE, AudioHub.JUMP_ATTACK,
        AudioHub.SHORT_ERROR, AudioHub.SLEEP, AudioHub.TAKE_DAMAGE, AudioHub.VICTORY, AudioHub.WALKING];


    // Spielt eine einzelne Audiodatei ab
    static playOne(sound, instrumentId) {  // instrumentId nur wichtig für die Visualisierung
        sound.volume = 0.2;  // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
        sound.currentTime = 0;  // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
        sound.play();  // Spielt das übergebene Sound-Objekt ab
        const instrumentImg = document.getElementById(instrumentId);  // nur wichtig für die Visualisierung
        instrumentImg.classList.add('active');  // nur wichtig für die Visualisierung
    }


    // Stoppt das Abspielen aller Audiodateien
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.pause();  // Pausiert jedes Audio in der Liste
        });
        document.getElementById('volume').value = 0.2;  // Setzt den Sound-Slider wieder auf 0.2
        const instrumentImages = document.querySelectorAll('.sound_img'); // nur wichtig für die Visualisierung
        instrumentImages.forEach(img => img.classList.remove('active')); // nur wichtig für die Visualisierung
    }


    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound, instrumentId) {
        sound.pause();  // Pausiert das übergebene Audio
        const instrumentImg = document.getElementById(instrumentId); // nur wichtig für die Visualisierung
        instrumentImg.classList.remove('active'); // nur wichtig für die Visualisierung
    }


    // ##########################################################################################################################
    // ################################################  Sound Slider - BONUS !  ################################################
    // Setzt die Lautstärke für alle Audiodateien
    static objSetVolume(volumeSlider) {
        let volumeValue = document.getElementById('volume').value;  // Holt den aktuellen Lautstärkewert aus dem Inputfeld
        volumeSlider.forEach(sound => {
            sound.volume = volumeValue;  // Setzt die Lautstärke für jedes Audio wie im Slider angegeben
        });
    }
}