/**
 * Status bar for the player character's health.
 * Starts full, is depleted when taking damage.
 */
class HealthBar extends StatusBar {
  constructor() {
    super(15, 15, 200, 50); 
    this.loadImages([
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
    ]);
  }
}
