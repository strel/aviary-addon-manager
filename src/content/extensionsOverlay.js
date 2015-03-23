/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

gCategories.maybeHideSearch = function() {
  var view = gViewController.parseViewId(this.node.selectedItem.value);
  this._search.disabled = view.type != "search";

  //Addition
  oamObject.updateUI();
  if (typeof(oamObjectStylish) != "undefined"){
    oamObjectStylish.updateStylish();
  }
  if (typeof(oamObjectGM) != "undefined"){
    oamObjectGM.updateGM();
  }
}

var oamObject = {
  updateUI : function oamUpdateUI(){
    var category = gCategories.node.selectedItem.value;
    var search = category == "addons://discover/" || category == "addons://search/";
    var themes = category == "addons://list/theme";
    var plugins = category == "addons://list/plugin";
//    alert(category+' '+search+' '+themes);
    document.getElementById("search-panel").hidden = !search;

    var installFileButton = document.getElementById("installFileButton");
    var checkUpdatesAllButton = document.getElementById("checkUpdatesAllButton");
    var getMore = document.getElementById("getMore");
    installFileButton.hidden = (Services.appinfo.ID != "{3550f703-e582-4d05-9a08-453d09bdfdc6}");
    checkUpdatesAllButton.hidden = search;
    getMore.hidden = !themes;

    var type = themes ? "themes" : "addons";
    var type2 = plugins ? "plugins" : type;
    var type3 = themes ? "themes" : (plugins ? "plugins" : "extensions");

    installFileButton.setAttribute("tooltiptext", installFileButton.getAttribute("tooltiptext" + type));
    checkUpdatesAllButton.setAttribute("tooltiptext", checkUpdatesAllButton.getAttribute("tooltiptext" + type2));
    getMore.setAttribute("value", getMore.getAttribute("value" + type3));
    getMore.setAttribute("type", type3);
  },

  browseAddons : function oamBrowseAddons(){
    openURL(Services.urlFormatter.formatURLPref("extensions.aviary-addon-manager.browseAddons"));
  },

  getMore : function oamGetMore(){
    var getMore = document.getElementById("getMore");
    switch(getMore.getAttribute("type")){
      case "extensions": openURL(Services.urlFormatter.formatURLPref("extensions.aviary-addon-manager.getMoreExtensionsURL")); return;
      case "themes": openURL(Services.urlFormatter.formatURLPref("extensions.aviary-addon-manager.getMoreThemesURL")); return;
      case "plugins": openURL(Services.urlFormatter.formatURLPref("extensions.aviary-addon-manager.getMorePluginsURL")); return;
    }
  }
}

window.addEventListener("load", oamObject.updateUI, false);
