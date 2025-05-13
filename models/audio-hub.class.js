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

  static allSounds = [
    AudioHub.BGM,
    AudioHub.BOSS_ANGRY,
    AudioHub.BOSS_ATTACK,
    AudioHub.CHICKENS,
    AudioHub.DEFEAT,
    AudioHub.GET_BOTTLE,
    AudioHub.GET_COIN,
    AudioHub.HIT_WITH_BOTTLE,
    AudioHub.JUMP_ATTACK,
    AudioHub.SHORT_ERROR,
    AudioHub.SLEEP,
    AudioHub.TAKE_DAMAGE,
    AudioHub.VICTORY,
    AudioHub.WALKING,
  ];

  static playOne(sound) {
    setInterval(() => {
      if (sound.readyState == 4) {
        sound.volume = 0.2;
        sound.play();
      }
    }, 200);
  }

  static stopAll() {
    AudioHub.allSounds.forEach((sound) => {
      sound.pause(); 
    });
    document.getElementById("volume").value = 0.2; 
  }

  static stopOne(sound) {
    sound.pause(); 
  }
}
