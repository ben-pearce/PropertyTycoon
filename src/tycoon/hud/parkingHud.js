import Phaser from "phaser";
import {PlayerNameStyle, BankCashStyle} from "../../styles";
import {TokenSprites, TokenNames, Hud} from "../../constants";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";

/**
 * This class represents the parking HUD object
 * within the HUD layer. It shows the free parking
 * icon a name and a cash value.
 * 
 * @extends Phaser.GameObjects.Container
 * @memberof Hud
 * 
 * @property {Hud} hud The hud layer this belongs to.
 * @property {Parking} parking The parking tile this observes.
 * @property {integer} cash The cash held.
 */
class ParkingHud extends Phaser.GameObjects.Container {
	/**
	 * Creates a hud background, graphic, name text and 
	 * cash text for the hud layer to represent the free 
	 * parking space.
	 * 
	 * @param {Hud} hud The parent hud object.
	 * @param {Parking} parking The parking tile instance.
	 */
	constructor(hud, parking) {
		super(hud.scene);

		this.hud = hud;
		this.parking = parking;
		this.cash = 0;

		let background = new RoundRectangle(hud.scene, 0, 0, 300, 200, 10, 0x000000, 0.75);
		background.setOrigin(0);

		let graphic = new Phaser.GameObjects.Sprite(this.scene, 150, 60, "tokens", TokenSprites.PARKING);
		let nameText = new Phaser.GameObjects.Text(this.scene, 10, 120, TokenNames.PARKING, PlayerNameStyle);
		nameText.setStroke(0x000000, 3);

		this.cashText = new Phaser.GameObjects.Text(this.scene, 13, 155, `Cash $${this.parking.cash}`, BankCashStyle);
		this.add([background, graphic, this.cashText, nameText]);

		this.parking.on("fee", this.updateCash.bind(this));
		this.parking.on("collect", this.updateCash.bind(this));
	}

	/**
	 * Update the cash value for this HUD.
	 * 
	 * Cash text will temporarily change color to
	 * reflect gain/loss. Then color will reset back
	 * to default.
	 * 
	 * Timeout will be set to call this.reset() after
	 * Hud.CASH_UPDATE_TIMEOUT milliseconds.
	 */
	updateCash() {
		let string = `Cash $${this.parking.cash}`;
		
		this.cashText.setStyle({color: (this.parking.cash > this.cash) ? Hud.POSITIVE_COLOR : Hud.NEGATIVE_COLOR});
		this.cashText.setText(string);

		this.cash = this.parking.cash;
		setTimeout(this.reset.bind(this), Hud.CASH_UPDATE_TIMEOUT);
	}

	/**
	 * Resets cash text color back to default.
	 */
	reset() {
		this.cashText.setStyle({color: Hud.TEXT_COLOR});
	}
}

export default ParkingHud;