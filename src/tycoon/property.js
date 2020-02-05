import Phaser from "phaser";

class Property extends Phaser.GameObjects.Rectangle {
	/**
	 * This class represents a property. 
	 * 
	 * Properties have several ranks:
	 * 	- unimproved
	 * 	- 1 house
	 * 	- 2 houses
	 * 	- 3 houses
	 * 	- 4 houses
	 * 	- hotel
	 * @param {Position} position The position this property belongs to
	 * @param {string} color The background color hex code
	 */
	constructor(position, color) {
		super(position.scene, 
			position.background.x, 
			position.background.y, 
			position.background.width, 
			20, color);
		this.position = position;

		this.setStrokeStyle(3, 0x00000);
		this.setOrigin(0);
	}
}

export default Property;