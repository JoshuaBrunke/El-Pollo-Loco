const bottlePositions = [289, 360, 500, 700, 1000, 1350, 1750, 1890, 2010, 2190];
const bottleGroundY = 360;
const bottles = bottlePositions.map((x) => new Bottle(x, bottleGroundY));
const coinPositions = [
  [213, 200], [452, 160], [680, 180], [950, 140], [1103, 170], [1302, 190], [1520, 150], [1710, 180], [1850, 160], [2006, 150]
];
const coins = coinPositions.map(([x, y]) => new Coin(x, y));

/**
 * The first level of the game.
 * Contains enemies, clouds, background objects, bottles, and coins.
 * This constant is passed into the World constructor to initialise the level.
 * 
 * @type {Level}
 */
const level1 = new Level(
  [
    new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
    new MutantChicken(), new MutantChicken(), new MutantChicken(), new MutantChicken(), new Endboss(),
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

    new BackgroundObject("./assets/img/5_background/layers/air.png", 719 * 4),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 719 * 4),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 719 * 4),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 719 * 4),

    ...bottles,
    ...coins, 
  ]
);
