class AudioHub {
  static BGM = new Audio("./assets/audio/bgm.mp3");
  static BOSS_ANGRY = new Audio("./assets/audio/boss-angry.wav");
  static BOSS_ATTACK = new Audio("./assets/audio/boss-attack.wav");
  static CHICKENS = new Audio("./assets/audio/chickens.wav");
  static DEFEAT = new Audio("./assets/audio/8bit-game-over.wav");
  static GET_BOTTLE = new Audio("./assets/audio/getbottle.wav");
  static GET_COIN = new Audio("./assets/audio/getcoin.wav");
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

  static playOnce(sound, volume = 0.2) {
    if (!isMuted) {
      sound.volume = volume;
      if (sound.readyState == 4) {
        sound.currentTime = 0;
        sound.play();
      }
    }
  }

  static playLoop(sound, volume = 0.2) {
    if (!isMuted) {
      sound.volume = volume;
      sound.loop = true;
      if (sound.readyState == 4) {
        sound.currentTime = 0;
        sound.play();
      }
    }
  }

  static muteAll(muted) {
    this.allSounds.forEach((sound) => (sound.muted = muted));
  }

  static stopOne(sound) {
    sound.pause();
  }
}

function playBGM() {
  AudioHub.playLoop(AudioHub.BGM, 0.2);
}

function stopBGM() {
  AudioHub.stopOne(AudioHub.BGM);
}

function playGetCoinSound() {
  AudioHub.playOnce(AudioHub.GET_COIN, 0.4);
}

function playGetBottleSound() {
  AudioHub.playOnce(AudioHub.GET_BOTTLE, 0.05);
}

function playBottleHitSound() {
  AudioHub.playOnce(AudioHub.HIT_WITH_BOTTLE, 0.2);
}

function playTakeDamageSound() {
  AudioHub.playOnce(AudioHub.TAKE_DAMAGE, 0.2);
}

function playJumpAttackSound() {
  AudioHub.playOnce(AudioHub.JUMP_ATTACK, 0.4);
}

function playSleepSound() {
  AudioHub.playOnce(AudioHub.SLEEP, 0.2);
}

function stopSleepSound() {
  AudioHub.stopOne(AudioHub.SLEEP);
}

function playVictorySound() {
  AudioHub.playOnce(AudioHub.VICTORY, 0.2);
}

function playDefeatSound() {
  AudioHub.playOnce(AudioHub.DEFEAT, 0.1);
}

function stopDefeatSound() {
  AudioHub.stopOne(AudioHub.DEFEAT);
}

function playBossAngrySound() {
  AudioHub.playOnce(AudioHub.BOSS_ANGRY, 0.2);
}

function playBossAttackSound() {
  AudioHub.playOnce(AudioHub.BOSS_ATTACK, 0.2);
}

function playChickenSound() {
  AudioHub.playOnce(AudioHub.CHICKENS, 0.1);
}

function stopChickenSound() {
  AudioHub.stopOne(AudioHub.CHICKENS);
}

function playErrorSound() {
  AudioHub.playOnce(AudioHub.SHORT_ERROR, 0.2);
}

function playWalkingSound() {
  AudioHub.playLoop(AudioHub.WALKING, 0.1);
}

function stopWalkingSound() {
  AudioHub.stopOne(AudioHub.WALKING);
}
