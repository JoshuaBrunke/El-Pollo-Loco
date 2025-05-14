class CoinBar extends StatusBar {
    constructor() {
      super(15, 105, 200, 50, 0); 
      this.loadImages([
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png"
      ]);
    }
  }