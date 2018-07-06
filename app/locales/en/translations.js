/* eslint-disable */
export default {
  components: {
    atlas: {
      popover: {
        tier: "Tier",
        area_level: "Area Level"
      }
    },
    map_trade_list: {
      properties: "Props.",
      mods: "Mods",
      listing: "Listing",
      corrupted: "Corrupted",
      unidentified: "Unidentified",
      item_quantity: "{{itemQuantity}} IIQ",
      item_rarity: "{{itemRarity}} IIR",
      monster_pack_size: "{{monsterPackSize}} MPS",
      sold_by: "Sold by {{account}}"
    },
    clipboard_button: {
      copy: "Copy to clipboard",
      copied: "Copied"
    },
    navigation: {
      atlas: "Atlas",
      vendor_recipe: "Vendor recipe",
      settings: "Settings"
    },
    settings_navigation: {
      global: "Global",
      vendor_recipe: "Vendor recipe"
    },
    electron_container: {
      warning_message: "This feature is only available on the native version of PoeWorld."
    },
    changelog_modal: {
      title: "What's up !",
      download_title: "A new version has been released !",
      download_warning: "Automatic updates cannot be implemented yet. To do so, the application would need to be code-signed, and doing so cost money. Once the project gets more serious, it will happen.",
      download_button: "Download",
      see_on_github: "Open on GitHub"
    },
    page: {
      map_page: {
        tier: "Tier",
        area_level: "Area Level {{level}}",
        information: "Information",
        stash: "Stash",
        friends: "Friends",
        trade: "Trade",
        stats: "Stats"
      },
      map_information_page: {
        drops_title: "Notable drops",
        layout_title: "Layout",
        layout_rating_A: "The map has a consistent layout that can be reliably fully cleared with no backtracking.",
        layout_rating_B: "The map has an open layout with few obstacles, or has only short and well-connected side paths.",
        layout_rating_C: "The map has an open layout with many obstacles, or has long side paths that require backtracking.",
        boss_title: "Boss"
      },
      map_trade_page: {
        total: {
          zero: "No map found.",
          one: "One map found.",
          other: "{{count}} maps found !"
        }
      },
      vendor_recipe_page: {
        chromatic_title: "Chromatic",
        jeweller_title: "Jeweller",
        divine_title: "Divine",
        chaos_title: "Chaos / Regal",
        item_count: {
          zero: "No item",
          one: "1 item",
          other: "{{count}} items"
        },
        hand: "Hand",
        one_handed: "One-Handed",
        two_handed: "Two-Handed",
        helmet: "Helmet",
        chest: "Chest armor",
        belt: "Belt",
        boots: "Boots",
        amulet: "Amulet",
        gloves: "Gloves",
        ring: "Ring",
        summary: "Summary"
      },
      settings_global_page: {
        leagues_title: "Active league",
        authentication_title: "pathofexile.com authentication",
        account_label: "Account name",
        poesessid_label: "Session cookie (POESESSID)",
        authenticated: "Authenticated",
        not_authenticated: "Not authenticated"
      },
      settings_vendor_recipe_page: {
        title: "Vendor recipe stash tabs"
      }
    }
  }
};
/* eslint-enable */
