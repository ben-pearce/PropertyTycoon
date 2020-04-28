import Phaser from "phaser";
import Tile from "./tile";

/**
 * This class represents the Go tile.
 * 
 * @extends Tile
 * @memberof Tiles
 */
class Go extends Tile {
	/**
	 * Adds the Go graphic to the tile.
	 * 
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(board, options) {
		super(board, options);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2), 
			"tiles", "go");

		this.text.setVisible(false);
		this.add(graphic);
	}

	/**
	 * Deposit 200 to the player for passing go.
	 * 
	 * @param {Player} player The player to pay.
	 * @override
	 */
	onPassed(player) {
		super.onPassed(player);

		player.hasPassedGo = true;
		
		this.game.bank.withdraw(200);
		player.deposit(200);
	}

	/**
	 * No special action for landing on a Go tile.
	 * 
	 * Just continue to next turn.
	 * 
	 * @param {Player} player The player that landed.
	 */
	onLanded(player) {
		if(player.tile !== null) {
			this.game.nextPlayer();
		}
		super.onLanded(player);
	}
}

export default Go;