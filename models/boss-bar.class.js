/**
 * @class BossBar
 * Status bar for the endboss's health.
 * Starts full, is depleted when taking damage.
 */
class BossBar extends StatusBar {
    constructor() {
      super(400, 15, 200, 50); 
      this.loadImages([
        "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png"
      ]);
    }
  }