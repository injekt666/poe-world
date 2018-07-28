/* eslint-disable */
export default {
  components: {
    atlas: {
      popover_content: "Tier {{tier}}<br/>Area Level {{level}}"
    },
    map_trade_list: {
      no_properties: "No props.",
      no_mods: "No mods",
      corrupted: "Corrupted",
      unidentified: "Unidentified",
      item_quantity: "{{itemQuantity}} IIQ",
      item_rarity: "{{itemRarity}} IIR",
      monster_pack_size: "{{monsterPackSize}} MPS",
      sold_by: "Sold by {{account}}",
      afk: "AFK"
    },
    clipboard_button: {
      copy: "Copy to clipboard",
      copied: "Copied"
    },
    navigation: {
      atlas: "Your atlas",
      stash: "Your stash",
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
        missing_stashes_selection: "To use this feature, you need to select which stash tabs you want to track.",
        missing_stashes_button: "Configure",
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
        title: "Vendor recipe stash tabs",
        stash_name: "Stash name",
        stash_type: "Stash type",
        vendor_recipe: "Vendor recipe",
        include: "Include",
        exclude: "Exclude",
        not_supported: "Not supported"
      }
    }
  },
  services: {
    electron: {
      request: {
        unauthenticated_error: "A valid POESESSID is required to perform this action, go set it in your settings."
      }
    },
    toaster: {
      unexpected_error: "An unexpected error occurred. Try again later."
    }
  }
};
/* eslint-enable */
