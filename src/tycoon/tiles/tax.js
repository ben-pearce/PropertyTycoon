import Phaser from "phaser";
import Tile from "./tile";
import Parking from "./parking";
import {CashTextStyle} from "../../styles";

/**
 * This represents a Tax or Super Tax tile.
 * 
 * @memberof Tiles
 * @extends Tile
 * 
 * @property {integer} cost The amount of tax to be paid.
 */
class Tax extends Tile {
	/**
	 * Adds tax graphic and price text to the tile.
	 * 
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(board, config) {
		super(board, config);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2), 
			"tiles", config.graphic);

		this.cost = config.cost;
		this.text.setY(this.y + 10);

		let string = `Pay £${this.cost}`;

		let costText = new Phaser.GameObjects.Text(this.board.scene, this.x, this.y + 80, string, CashTextStyle);
		costText.setStyle({
			fixedWidth: this.background.width,
		});

		this.add([graphic, costText]);
	}

	onLanded(player) {
		super.onLanded(player);

		// action: "Pay cost",
	}
}

export default Tax;