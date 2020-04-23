import Phaser from "phaser";
import Card from "./card";
import {CardStyle} from "../../styles";
import Button from "../ui/button";

/**
 * Represents a graphical action card which has 
 * single "Continue" button.
 * 
 * @extends Card
 * @memberof Cards
 * 
 * @property {Button} continueButton The button instance that represents "Continue".
 */
class ActionCard extends Card {
	/**
	 * Creates a title, description, and a continue button
	 * and adds them to the card.
	 * 
	 * @param {GameManager} game The game instance this belongs to.
	 * @param {CardConfig} config The card configuration to observe.
	 * @param {Player} player The player instance this card acts upon.
	 */
	constructor(game, config, player) {
		super(game);

		this.player = player;

		let title = new Phaser.GameObjects.Text(this.scene, 0, -250, config.name, CardStyle);
		title.setStyle({
			fixedWidth: this.background.width,
			wordWrap: {width: this.background.width - 50, useAdvancedWrap: true}
		});
		title.setX(title.x - (title.width /2));

		let description = new Phaser.GameObjects.Text(this.scene, 0, 0, config.description, CardStyle);
		description.setStyle({
			fixedWidth: this.background.width,
			wordWrap: {width: this.background.width - 50, useAdvancedWrap: true}
		});
		description.setPosition(description.x - (description.width /2), description.y - (description.height / 2));

		this.continueButton = new Button(this.scene, -190, 240, 380, 50, "Continue", 0xEBA417);

		this.add([title, description, this.continueButton]);
	}
}

export default ActionCard;