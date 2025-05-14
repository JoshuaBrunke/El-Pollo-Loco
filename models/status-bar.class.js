class StatusBar extends DrawableObject {
  IMAGES = [];
  percentage = 100;

  constructor(x = 15, y = 15, width = 200, height = 50, initialPercentage = 100) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.percentage = initialPercentage;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    const imagePath = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    if (this.percentage > 80) return 4;
    if (this.percentage > 60) return 3;
    if (this.percentage > 40) return 2;
    if (this.percentage > 20) return 1;
    return 0;
  }

  loadImages(images) {
    this.IMAGES = images;
    super.loadImages(images);
    this.setPercentage(this.percentage); 
  }
}
