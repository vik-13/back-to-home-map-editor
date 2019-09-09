const playerWalk1Ref = new Image(36, 45);
playerWalk1Ref.src = require('../../assets/images/player/playerGrey_walk1.png');

const playerWalk2Ref = new Image(37, 43);
playerWalk2Ref.src = require('../../assets/images/player/playerGrey_walk2.png');

const playerWalk3Ref = new Image(37, 42);
playerWalk3Ref.src = require('../../assets/images/player/playerGrey_walk3.png');

const playerWalk4Ref = new Image(48, 36);
playerWalk4Ref.src = require('../../assets/images/player/playerGrey_walk4.png');

const playerWalk5Ref = new Image(64, 36);
playerWalk5Ref.src = require('../../assets/images/player/playerGrey_walk5.png');

const playerUp1Ref = new Image(36, 45);
playerUp1Ref.src = require('../../assets/images/player/playerGrey_up1.png');

const playerUp2Ref = new Image(37, 40);
playerUp2Ref.src = require('../../assets/images/player/playerGrey_up2.png');

const playerUp3Ref = new Image(44, 36);
playerUp3Ref.src = require('../../assets/images/player/playerGrey_up3.png');

const playerFallRef = new Image(36, 45);
playerFallRef.src = require('../../assets/images/player/playerGrey_fall.png');

const playerSideRef = new Image(43, 41);
playerSideRef.src = require('../../assets/images/player/playerGrey_swim1.png');

const playerDeadRef = new Image(36, 39);
playerDeadRef.src = require('../../assets/images/player/playerGrey_dead.png');

export const PlayerSources = {
  playerWalk: [
    {
      image: playerWalk1Ref,
      width: 36,
      height: 45
    },
    {
      image: playerWalk2Ref,
      width: 37,
      height: 43
    },
    {
      image: playerWalk3Ref,
      width: 37,
      height: 42
    }
  ],
  playerUp1: {
    image: playerUp1Ref,
    width: 36,
    height: 45
  },
  playerUp2: {
    image: playerUp2Ref,
    width: 37,
    height: 40
  },
  playerUp3: {
    image: playerUp3Ref,
    width: 44,
    height: 36
  },

  playerFall: {
    image: playerFallRef,
    width: 36,
    height: 45
  },

  playerSide: {
    image: playerSideRef,
    width: 43,
    height: 41
  },

  playerDead: {
    image: playerDeadRef,
    width: 36,
    height: 39
  },
};
