import Phaser from "phaser";
import PlayerHud from "./playerHud";
import BankHud from "./bankHud";
import ParkingHud from "./parkingHud";
import TimerHud from "./timerHud";
import Parking from "../tiles/parking";

/**
 * @namespace Hud
 */

/**
 * This class represents our game HUD (heads-up-display) 
 * which is used to display all information about current 
 * progression of the game and player status.
 * 
 * @extends Phaser.GameObjects.Container
 * @memberof Hud
 * 
 * @property {PlayerHud[]} players The player HUDs array.
 * @property {BankHud} bankHud The HUD that represents the bank.
 * @property {ParkingHud} parkingHud The HUD that represents the free parking space.
 * @property {TimerHud} timerHud The HUD that represents the timer.
 */
class Hud extends Phaser.GameObjects.Container {
	/**
	 * Creates all components of the HUD
	 * including player, bank, free parking and timer HUDs.
	 * 
	 * @param {Phaser.Scene} scene The scene this Hud belongs to.
	 * @param {GameManager} game The game manager instance associated
	 * with this hud.
	 */
	constructor(scene, game) {
		super(scene);
		this.game = game;

		this.players = [];

		const leftX = 40;
		const rightX = 1160;

		const bankY = 35;
		const timerY = 805;
		const parkingY = 253;

		for(let i = 0; i < game.players.length; i++) {
			const player = game.players[i];
			const playerHud = new PlayerHud(scene, this, player);
			
			const playerY = (playerHud.getBounds().height * i) + (15 * i) + 35;
			playerHud.setPosition(rightX, playerY);

			this.players.push(playerHud);
		}
		
		this.bank = new BankHud(scene, this, game.bank);
		this.bank.setPosition(leftX, bankY);
		
		this.parking = new ParkingHud(scene, this, game.board.getSingletonTileByType(Parking));
		this.parking.setPosition(leftX, parkingY);

		this.timer = new TimerHud(scene, this, game.timer);
		this.timer.setPosition(leftX, timerY);

		if(game.timer.seconds === null) {
			this.timer.setVisible(false);
		}

		this.add([this.bank, this.parking, this.timer, ...this.players]);
	}
}

export default Hud;