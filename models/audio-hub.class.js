class AudioHub {
  static BGM = new Audio("./assets/audio/bgm.mp3");
  static BOSS_ANGRY = new Audio("./assets/audio/boss-angry.wav");
  static BOSS_ATTACK = new Audio("./assets/audio/boss-attack.wav");
  static CHICKENS = new Audio("./assets/audio/chickens.wav");
  static DEFEAT = new Audio("./assets/audio/defeat.mp3");
  static GET_BOTTLE = new Audio("./assets/audio/get-bottle.wav");
  static GET_COIN = new Audio("./assets/audio/get-coin.wav");
  static HIT_WITH_BOTTLE = new Audio("./assets/audio/hit-with-bottle.wav");
  static JUMP_ATTACK = new Audio("./assets/audio/jump-attack.wav");
  static SHORT_ERROR = new Audio("./assets/audio/short_error.wav");
  static SLEEP = new Audio("./assets/audio/sleep.wav");
  static TAKE_DAMAGE = new Audio("./assets/audio/take-damage.wav");
  static VICTORY = new Audio("./assets/audio/victory.wav");
  static WALKING = new Audio("./assets/audio/walking.wav");

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

  static muteAll(muted) {
    this.allSounds.forEach((sound) => sound.muted = muted);
  }

  static stopOne(sound) {
    sound.pause(); 
  }
}
