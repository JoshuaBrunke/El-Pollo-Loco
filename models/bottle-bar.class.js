/**
 * @class BottleBar
 * Status bar for collectable and throwable bottles.
 * Starts empty, fills up when collecting bottles, is depleted when throwing them.
 */
class BottleBar extends StatusBar {
  constructor() {
    super(15, 60, 200, 50, 0); 
    this.loadImages([
      "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png"
    ]);
  }
}
