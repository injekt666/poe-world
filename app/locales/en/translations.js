/* eslint-disable */
export default {
  components: {
    atlas: {
      popover: {
        tier: 'Tier',
        area_level: 'Area Level'
      }
    },
    map_trade_list: {
      properties: 'Props.',
      mods: 'Mods',
      listing: 'Listing',
      corrupted: 'Corrupted',
      unidentified: 'Unidentified',
      item_quantity: '{{itemQuantity}} IIQ',
      item_rarity: '{{itemRarity}} IIR',
      monster_pack_size: '{{monsterPackSize}} MPS',
      sold_by: 'Sold by {{account}}'
    },
    page: {
      map_page: {
        tier: 'Tier',
        area_level: 'Area Level {{level}}',
        information: 'Information',
        stash: 'Stash',
        friends: 'Friends',
        trade: 'Trade',
        stats: 'Stats'
      },
      map_information_page: {
        drops_title: 'Notable drops',
        layout_title: 'Layout',
        layout_rating_A: 'The map has a consistent layout that can be reliably fully cleared with no backtracking.',
        layout_rating_B: 'The map has an open layout with few obstacles, or has only short and well-connected side paths.',
        layout_rating_C: 'The map has an open layout with many obstacles, or has long side paths that require backtracking.',
        boss_title: 'Boss'
      },
      map_trade_page: {
        total: {
          zero: 'No map found.',
          one: 'One map found.',
          other: '{{count}} maps found !'
        }
      }
    }
  }
};
/* eslint-enable */
