const bottlePositions = [
    220, 290, 360, 430, 500,
    700, 850, 1000, 1170, 1350, 1550,
    1750, 1820, 1890, 1950, 2010, 2070, 2130, 2190
  ];
  
  
  const bottleGroundY = 360; 
  const bottles = bottlePositions.map(x => new Bottle(x, bottleGroundY));
  
  
  const level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new MutantChicken(),
      new MutantChicken(),
      new MutantChicken(),
      new MutantChicken(),
      new Endboss()
    ],
    [new Cloud()],
    [
      new BackgroundObject("./assets/img/5_background/layers/air.png", -719),
      new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", -719),
  
      new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
      new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 0),
  
      new BackgroundObject("./assets/img/5_background/layers/air.png", 719),
      new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 719),
  
      new BackgroundObject("./assets/img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 719 * 2),
  
      new BackgroundObject("./assets/img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 719 * 3),
  
      ...bottles // Spread the bottle objects into the background objects array
    ]
  );
  