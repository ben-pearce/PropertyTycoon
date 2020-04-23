import Phaser from "phaser";
import {Cards} from "../../constants";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";

/**
 * @namespace Cards
 */

/**
 * Represents a graphical card used in game prompts.
 * 
 * Is intended to be inherited by different types of cards
 * that provide extra functionality like buttons and text.
 * 
 * @extends Phaser.GameObjects.Container
 * @property {GameManager} game The game manager instance this card belongs to.
 * @property {RoundRectangle} background The background of the card.
 */
class Card extends Phaser.GameObjects.Container {
	/**
	 * Creates a new card with white background.
	 * 
	 * @param {GameManager} game The game manager instance.
	 */
	constructor(game) {
		super(game.scene);

		this.game = game;

		this.background = new RoundRectangle(this.scene, 0, 0, Cards.WIDTH, Cards.HEIGHT, 15, Cards.COLOR);
		this.add(this.background);
	}
}

export default Card;