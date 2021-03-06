import Bullet from '../Bullet';

export default class TankBullet extends Bullet {
    tankBullets: Phaser.Group;
    game: Phaser.Game;

    constructor(game: Phaser.Game) {
        super(game, 0, 0);
        this.game = game;
        this.create();
    }

    create() {
        this.tankBullets = this.game.add.group();
        this.tankBullets.enableBody = true;
        this.game.physics.arcade.enable(this.tankBullets);
        this.tankBullets.createMultiple(30, 'bullet');
        this.tankBullets.setAll('anchor.x', 0.5);
        this.tankBullets.setAll('anchor.y', 0.5);
        this.tankBullets.setAll('outOfBoundsKill', true);
        this.tankBullets.setAll('checkWorldBounds', true);
    }

    createBullet(xCoord: number, yCoord: number, id: number): void {
        this.bullet = this.tankBullets.create(xCoord, yCoord, 'bullet');
        // this.bullet.anchor.setTo(0.5, 0.5);
        this.bullet.name = id.toString();
        this.bullet.body.immovable = true;
    }


    bulletHitEnemy(enemyTank, bullet ) {
        bullet.kill();
        let explosionAnimation = this.explosions.getFirstExists(false);
        explosionAnimation.reset(enemyTank.x, enemyTank.y);
        // explosionAnimation.reset(800, 500);
        explosionAnimation.play('kaboom', 30, false, true);
    }
}