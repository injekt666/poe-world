import Service from '@ember/service';

// Constants
const CHAOS_LOW_LEVEL = 60;
const REGAL_LOW_LEVEL = 75;
const REGAL_HIGH_LEVEL = 100;
const RARE_RARITY = 'rare';
const ONE_HANDED_REGEXP = /(one|claw|shield|wand|dagger)/i;
const TWO_HANDED_REGEXP = /(two|staff)/i;

export default Service.extend({
  initializeDataStructure() {
    return {
      helmet: {
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0
      },
      boots: {
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0
      },
      gloves: {
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0
      },
      belt: {
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0
      },
      chest: {
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0
      },
      ring: {
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0
      },
      amulet: {
        itemChaosCount: 0,
        itemRegalCount: 0,
        recipeCount: 0
      },
      hands: {
        oneHanded: {
          itemChaosCount: 0,
          itemRegalCount: 0
        },
        twoHanded: {
          itemChaosCount: 0,
          itemRegalCount: 0
        },
        recipeCount: 0
      },
      summary: {
        recipeCount: 0
      }
    };
  },

  build(stashItems) {
    const dataStructure = this.initializeDataStructure();

    /* eslint-disable complexity */
    stashItems.forEach((stashItem) => {
      if (stashItem.identified) return;
      if (stashItem.rarity !== RARE_RARITY) return;
      if (stashItem.itemLevel < CHAOS_LOW_LEVEL || stashItem.itemLevel > REGAL_HIGH_LEVEL) return;

      let itemCounts = null;

      // Non-hand items
      if (dataStructure[stashItem.defaultCategory]) itemCounts = dataStructure[stashItem.defaultCategory];

      // Two-handed items
      if (!itemCounts && stashItem.subCategories.some((subCategory) => TWO_HANDED_REGEXP.test(subCategory))) itemCounts = dataStructure.hands.twoHanded;

      // One-handed items
      if (!itemCounts && stashItem.subCategories.some((subCategory) => ONE_HANDED_REGEXP.test(subCategory))) itemCounts = dataStructure.hands.oneHanded;

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
    dataStructure.ring.recipeCount = Math.floor((dataStructure.ring.itemChaosCount + dataStructure.ring.itemRegalCount) / 2);
    dataStructure.amulet.recipeCount = dataStructure.amulet.itemChaosCount + dataStructure.amulet.itemRegalCount;

    const twoHandedSets = dataStructure.hands.twoHanded.itemChaosCount + dataStructure.hands.twoHanded.itemRegalCount;
    const oneHandedSets = Math.floor((dataStructure.hands.oneHanded.itemChaosCount + dataStructure.hands.oneHanded.itemRegalCount) / 2);
    dataStructure.hands.recipeCount = twoHandedSets + oneHandedSets;

    dataStructure.summary.recipeCount = Math.min(
      dataStructure.helmet.recipeCount,
      dataStructure.boots.recipeCount,
      dataStructure.gloves.recipeCount,
      dataStructure.belt.recipeCount,
      dataStructure.chest.recipeCount,
      dataStructure.ring.recipeCount,
      dataStructure.amulet.recipeCount,
      dataStructure.hands.recipeCount
    );

    return dataStructure;
  }
});
