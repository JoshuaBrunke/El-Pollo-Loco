/**
 * @fileoverview
 * Central hub for managing all game audio, including sound effects and background music.
 * Provides functions to play sounds once or in a loop, mute all sounds, and stop individual sounds.
 */

class AudioHub {
  static BGM = new Audio("./assets/audio/bgm.mp3");
  static BOSS_ANGRY = new Audio("./assets/audio/boss-angry.wav");
  static BOSS_ATTACK = new Audio("./assets/audio/boss-attack.wav");
  static DEFEAT = new Audio("./assets/audio/8bit-game-over.wav");
  static GET_BOTTLE = new Audio("./assets/audio/getbottle.wav");
  static GET_COIN = new Audio("./assets/audio/getcoin.wav");
  static HIT_WITH_BOTTLE = new Audio("./assets/audio/hit-with-bottle.wav");
  static JUMP_ATTACK = new Audio("./assets/audio/jump-attack.wav");
  static SLEEP = new Audio("./assets/audio/sleep.wav");
  static TAKE_DAMAGE = new Audio("./assets/audio/take-damage.wav");
  static VICTORY = new Audio("./assets/audio/victory.wav");
  static WALKING = new Audio("./assets/audio/walking.wav");

  static allSounds = [
    AudioHub.BGM,
    AudioHub.BOSS_ANGRY,
    AudioHub.BOSS_ATTACK,
    AudioHub.DEFEAT,
    AudioHub.GET_BOTTLE,
    AudioHub.GET_COIN,
    AudioHub.HIT_WITH_BOTTLE,
    AudioHub.JUMP_ATTACK,
    AudioHub.SLEEP,
    AudioHub.TAKE_DAMAGE,
    AudioHub.VICTORY,
    AudioHub.WALKING,
  ];

  /**
   * Plays a sound once at the specified volume.
   * @static
   * @param {HTMLAudioElement} sound - The sound to play.
   * @param {number} [volume=0.2] - Volume level between 0 (silent) and 1 (full volume).
   */
  static playOnce(sound, volume = 0.2) {
    if (!isMuted) {
      sound.volume = volume;
      if (sound.readyState === 4) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }
    }
  }

  /**
   * Plays a sound in a continuous loop at the specified volume.
   * @static
   * @param {HTMLAudioElement} sound - The sound to play in a loop.
   * @param {number} [volume=0.2] - Volume level between 0 and 1.
   */
  static playLoop(sound, volume = 0.2) {
    if (!isMuted) {
      sound.volume = volume;
      sound.loop = true;
      if (sound.readyState === 4) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }
    }
  }

  /**
   * Mutes or unmutes all game sounds.
   * @static
   * @param {boolean} muted - `true` to mute all sounds, `false` to unmute.
   */
  static muteAll(muted) {
    this.allSounds.forEach((sound) => (sound.muted = muted));
  }

  /**
   * Stops a sound that is currently playing.
   * @static
   * @param {HTMLAudioElement} sound - The sound to stop.
   */
  static stopOne(sound) {
    try {
      sound.pause();
    } catch (_) {}
  }
}

/**
 * Plays the background music in a loop.
 */
function playBGM() {
  AudioHub.playLoop(AudioHub.BGM, 0.2);
}

/**
 * Stops the background music.
 */
function stopBGM() {
  AudioHub.stopOne(AudioHub.BGM);
}

/**
 * Plays the coin collection sound.
 */
function playGetCoinSound() {
  AudioHub.playOnce(AudioHub.GET_COIN, 0.4);
}

/**
 * Plays the bottle collection sound.
 */
function playGetBottleSound() {
  AudioHub.playOnce(AudioHub.GET_BOTTLE, 0.05);
}

/**
 * Plays the sound of hitting an enemy with a bottle.
 */
function playBottleHitSound() {
  AudioHub.playOnce(AudioHub.HIT_WITH_BOTTLE, 0.2);
}

/**
 * Plays the sound for when the character takes damage.
 */
function playTakeDamageSound() {
  AudioHub.playOnce(AudioHub.TAKE_DAMAGE, 0.2);
}

/**
 * Plays the sound effect for a jump attack on an enemy.
 */
function playJumpAttackSound() {
  AudioHub.playOnce(AudioHub.JUMP_ATTACK, 0.4);
}

/**
 * Plays the lullaby sound for character sleep.
 */
function playSleepSound() {
  AudioHub.playOnce(AudioHub.SLEEP, 0.2);
}

/**
 * Stops the sleep sound.
 */
function stopSleepSound() {
  AudioHub.stopOne(AudioHub.SLEEP);
}

/**
 * Plays the victory fanfare.
 */
function playVictorySound() {
  AudioHub.playOnce(AudioHub.VICTORY, 0.2);
}

/**
 * Plays the defeat sound.
 */
function playDefeatSound() {
  AudioHub.playOnce(AudioHub.DEFEAT, 0.1);
}

/**
 * Stops the defeat sound.
 */
function stopDefeatSound() {
  AudioHub.stopOne(AudioHub.DEFEAT);
}

/**
 * Plays the sound the boss makes when hurt.
 */
function playBossAngrySound() {
  AudioHub.playOnce(AudioHub.BOSS_ANGRY, 0.1);
}

/**
 * Plays the boss attack sound effect.
 */
function playBossAttackSound() {
  AudioHub.playOnce(AudioHub.BOSS_ATTACK, 0.3);
}

/**
 * Plays the character’s walking sound on a loop.
 */
function playWalkingSound() {
  AudioHub.playLoop(AudioHub.WALKING, 0.7);
}

/**
 * Stops the walking sound.
 */
function stopWalkingSound() {
  AudioHub.stopOne(AudioHub.WALKING);
}
