import Purchasable from "./purchasable";
import Property from "../property";
import RentableCard from "../cards/rentableCard";

/**
 * Represents a Rentable tile.
 * 
 * @memberof Tiles
 * @extends Purchasable
 * 
 * @property {Color} color The color group this property belongs to.
 * @property {integer} rent The price of rent for each upgrade.
 */
class Rentable extends Purchasable {
	/**
	 * Adds a property to the tile.
	 * 
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(board, config) {
		super(board, config);

		this.color = config.color;
		this.upgradeCost = config.upgrade;
		this.rent = config.rent;

		this.property = new Property(this, config.color);
		this.add([this.property, this.property.houseGraphic]);
	}

	/**
	 * Value can change as the game progresses.
	 * 
	 * Calls upon Property.getValue() and adds it to the existing
	 * value (the purchase price) of the property.
	 * 
	 * @returns {integer} The total value of this property plus
	 * any upgrade value.
	 * @override
	 */
	getValue() {
		let value = this.cost + this.property.getValue();
		if(this.isMortgaged) {
			return value / 2;
		}
		return value;
	}

	/**
	 * Returns the mortgage value of this property. 
	 * 
	 * If this property has been upgraded, this will return 0.
	 * 
	 * @returns {integer} The mortgage value of this property.
	 * @override
	 */
	getMortgageValue() {
		if(this.property.isUpgraded) {
			return 0;
		}
		return super.getMortgageValue();
	}

	/**
	 * This returns the cost of rent for a property. If the
	 * property is not owned by anyone this will return 0.
	 * 
	 * Cost will depend on the number of times the property has
	 * been upgraded.
	 * 
	 * @returns {integer} The cost of rent.
	 */
	getRent() {
		if(this.owner !== null) {
			return this.rent[this.property.getUpgradeAsNumber()];
		}
		return 0;
	}

	/**
	 * If the property is owned and player is not the owner,
	 * charge rent.
	 * 
	 * If the property is owned and player is the owner, offer
	 * upgrade, sale or mortgage procedure.
	 * 
	 * @param {Player} player The player to charge or offer sale.
	 * @override
	 */
	onLanded(player) {
		super.onLanded(player);
		if(this.owner !== null && player !== this.owner) {
			let rentCharged = this.getRent();
			let monopolyOwner = this.game.board.getMonopolyOwner(this);
			if(monopolyOwner !== null) {
				let coloredTiles = this.game.board.getRentableTilesByColor(this.color);
				let totalUpgrades = coloredTiles.reduce((upgrades, tile) => upgrades + tile.property.getUpgradeAsNumber());
				if(totalUpgrades == 0) {
					rentCharged *= 2;
				}
			}
			player.withdraw(rentCharged);
			this.owner.deposit(rentCharged);
			this.game.nextPlayer();
		} else if(this.owner == null && player.hasPassedGo) {
			let rentableCard = new RentableCard(this.game, this, player);
			rentableCard.buyButton.setEnabled(player.cash > this.cost);
			rentableCard.buyButton.on("pointerup", () => {
				this.game.prompt.closeWithAnim(() => {
					this.purchase(player);
					this.game.nextPlayer();
				});
			});
			rentableCard.auctionButton.on("pointerup", () => {
				this.game.prompt.closeWithAnim(() => {
					this.auction();
					this.game.nextPlayer();
				});
			});
			this.game.prompt.showWithAnim(rentableCard);
		} else {
			this.game.nextPlayer();
		}
	}
}

export default Rentable;