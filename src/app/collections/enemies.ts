const monster1Ref = new Image(40, 40);
monster1Ref.src = require('../../assets/images/enemies/enemyFloating_1.png');

const monster1_1Ref = new Image(40, 40);
monster1_1Ref.src = require('../../assets/images/enemies/enemyFloating_2.png');

const monster1_2Ref = new Image(40, 40);
monster1_2Ref.src = require('../../assets/images/enemies/enemyFloating_3.png');

const monster2Ref = new Image(40, 40);
monster2Ref.src = require('../../assets/images/enemies/plantTop_red.png');

export const EnemiesSources = [
  [
    {
      image: monster1Ref,
      width: 40,
      height: 40
    },
    {
      image: monster1_1Ref,
      width: 40,
      height: 40
    },
    {
      image: monster1_2Ref,
      width: 40,
      height: 40
    }
  ],
  [
    {
      image: monster2Ref,
      width: 40,
      height: 40
    },
  ]
];
