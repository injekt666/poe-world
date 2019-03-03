// Vendor
import Service from '@ember/service';

// Constants
const CHAOS_LOW_LEVEL = 60;
const REGAL_LOW_LEVEL = 75;
const RARE_RARITY = 'rare';
const ONE_HANDED_REGEXP = /(one|claw|shield|wand|dagger)/i;
const TWO_HANDED_REGEXP = /(two|staff)/i;
const WARNING_QUANTITY_TRESHOLD = 5;

export default class ChaosBuilder extends Service {
  build(stashItems) {
    const dataStructure = this._initializeDataStructure();

    /* eslint-disable complexity */
    stashItems.forEach(stashItem => {
      if (stashItem.identified) return;
      if (stashItem.rarity !== RARE_RARITY) return;
      if (stashItem.itemLevel < CHAOS_LOW_LEVEL) return;

      let itemCounts = null;

      // Non-hand items
      if (dataStructure[stashItem.defaultCategory]) itemCounts = dataStructure[stashItem.defaultCategory];

      // Two-handed items
      if (!itemCounts && stashItem.subCategories.some(subCategory => TWO_HANDED_REGEXP.test(subCategory))) {
        itemCounts = dataStructure.hands.twoHanded;
      }

      // One-handed items
      if (!itemCounts && stashItem.subCategories.some(subCategory => ONE_HANDED_REGEXP.test(subCategory))) {
        itemCounts = dataStructure.hands.oneHanded;
      }

      // Non compatible item
      if (!itemCounts) return;

      if (stashItem.itemLevel < REGAL_LOW_LEVEL) {
        itemCounts.itemChaosCount++;
      } else {
        itemCounts.itemRegalCount++;
      }
    });
    /* eslint-enable complexity */

    dataStructure.helmet.recipeCount = dataStructure.helmet.itemChaosCount + dataStructure.helmet.itemRegalCount;
    dataStructure.boots.recipeCount = dataStructure.boots.itemChaosCount + dataStructure.boots.itemRegalCount;
    dataStructure.gloves.recipeCount = dataStructure.gloves.itemChaosCount + dataStructure.gloves.itemRegalCount;
    dataStructure.belt.recipeCount = dataStructure.belt.itemChaosCount + dataStructure.belt.itemRegalCount;
    dataStructure.chest.recipeCount = dataStructure.chest.itemChaosCount + dataStructure.chest.itemRegalCount;
    dataStructure.ring.recipeCount = Math.floor(
      (dataStructure.ring.itemChaosCount + dataStructure.ring.itemRegalCount) / 2
    );
    dataStructure.amulet.recipeCount = dataStructure.amulet.itemChaosCount + dataStructure.amulet.itemRegalCount;

    const twoHandedSets = dataStructure.hands.twoHanded.itemChaosCount + dataStructure.hands.twoHanded.itemRegalCount;
    const oneHandedSets = Math.floor(
      (dataStructure.hands.oneHanded.itemChaosCount + dataStructure.hands.oneHanded.itemRegalCount) / 2
    );
    dataStructure.hands.recipeCount = twoHandedSets + oneHandedSets;
    dataStructure.hands.itemChaosCount =
      dataStructure.hands.twoHanded.itemChaosCount + dataStructure.hands.oneHanded.itemChaosCount;
    dataStructure.hands.itemRegalCount =
      dataStructure.hands.twoHanded.itemRegalCount + dataStructure.hands.oneHanded.itemRegalCount;

    const recipeTotal = (dataStructure.summary.recipeCount = Math.min(
      dataStructure.helmet.recipeCount,
      dataStructure.boots.recipeCount,
      dataStructure.gloves.recipeCount,
      dataStructure.belt.recipeCount,
      dataStructure.chest.recipeCount,
      dataStructure.ring.recipeCount,
      dataStructure.amulet.recipeCount,
      dataStructure.hands.recipeCount
    ));

    dataStructure.helmet.isDanger = dataStructure.helmet.recipeCount === recipeTotal;
    dataStructure.boots.isDanger = dataStructure.boots.recipeCount === recipeTotal;
    dataStructure.gloves.isDanger = dataStructure.gloves.recipeCount === recipeTotal;
    dataStructure.belt.isDanger = dataStructure.belt.recipeCount === recipeTotal;
    dataStructure.chest.isDanger = dataStructure.chest.recipeCount === recipeTotal;
    dataStructure.ring.isDanger = dataStructure.ring.recipeCount === recipeTotal;
    dataStructure.amulet.isDanger = dataStructure.amulet.recipeCount === recipeTotal;
    dataStructure.hands.isDanger = dataStructure.hands.recipeCount === recipeTotal;

    dataStructure.helmet.isWarning = dataStructure.helmet.recipeCount - WARNING_QUANTITY_TRESHOLD <= recipeTotal;
    dataStructure.boots.isWarning = dataStructure.boots.recipeCount - WARNING_QUANTITY_TRESHOLD <= recipeTotal;
    dataStructure.gloves.isWarning = dataStructure.gloves.recipeCount - WARNING_QUANTITY_TRESHOLD <= recipeTotal;
    dataStructure.belt.isWarning = dataStructure.belt.recipeCount - WARNING_QUANTITY_TRESHOLD <= recipeTotal;
    dataStructure.chest.isWarning = dataStructure.chest.recipeCount - WARNING_QUANTITY_TRESHOLD <= recipeTotal;
    dataStructure.ring.isWarning = dataStructure.ring.recipeCount - WARNING_QUANTITY_TRESHOLD <= recipeTotal;
    dataStructure.amulet.isWarning = dataStructure.amulet.recipeCount - WARNING_QUANTITY_TRESHOLD <= recipeTotal;
    dataStructure.hands.isWarning = dataStructure.hands.recipeCount - WARNING_QUANTITY_TRESHOLD <= recipeTotal;

    return dataStructure;
  }

  _initializeDataStructure() {
    return {
      helmet: {
        slot: 'helmet',
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0,
        isDanger: false,
        isWarning: false
      },
      boots: {
        slot: 'boots',
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0,
        isDanger: false,
        isWarning: false
      },
      gloves: {
        slot: 'gloves',
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0,
        isDanger: false,
        isWarning: false
      },
      belt: {
        slot: 'belt',
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0,
        isDanger: false,
        isWarning: false
      },
      chest: {
        slot: 'chest',
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0,
        isDanger: false,
        isWarning: false
      },
      ring: {
        slot: 'ring',
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0,
        isDanger: false,
        isWarning: false
      },
      amulet: {
        slot: 'amulet',
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0,
        isDanger: false,
        isWarning: false
      },
      hands: {
        slot: 'hands',
        oneHanded: {
          itemChaosCount: 0,
          itemRegalCount: 0
        },
        twoHanded: {
          itemChaosCount: 0,
          itemRegalCount: 0
        },
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0,
        isDanger: false,
        isWarning: false
      },
      summary: {
        recipeCount: 0
      }
    };
  }
}
