import Service from '@ember/service';

// Constants
const DIVINATION_CARD_TOP_CATEGORY = 'cards';

export default Service.extend({
  build(stashItems) {
    const divinationStashItemsMap = stashItems.reduce((divinationStashItemsMap, stashItem) => {
      if (stashItem.topCategory !== DIVINATION_CARD_TOP_CATEGORY) return divinationStashItemsMap;

      if (!divinationStashItemsMap[stashItem.slug]) {
        divinationStashItemsMap[stashItem.slug] = {
          cardName: stashItem.name,
          quantity: 0
        };
      }

      divinationStashItemsMap[stashItem.slug].quantity += stashItem.quantity;

      return divinationStashItemsMap;
    }, {});

    return Object.values(divinationStashItemsMap);
  }
});
