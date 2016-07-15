function onInstall(e) {
  onOpen(e);
}


function onOpen(e){
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createAddonMenu();
  
  if(e.authMode === ScriptApp.AuthMode.LIMITED || e.authMode === ScriptApp.AuthMode.FULL){
    buildAddonMenu(menu)
  }else{ //NONE
    menu.addItem("Enable Add-on", "enableAddOn").addToUi();
    
  }  
}

function enableAddOn(){
  buildAddonMenu();
  SpreadsheetApp.getActive().toast("New menu items added", "Live People API Demo Add-on Enabled", 5)
}

function buildAddonMenu(){ 
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createAddonMenu();
  var menu = ui.createAddonMenu();
  if(getPeopleService().hasAccess()){
    menu.addItem("Show my info", "showUserInfo")
  }else{
    menu.addItem("Authorize access...", "showAuthDialog")
  }
  menu.addToUi();  
}


function showUserInfo(){
  var url = 'https://people.googleapis.com/v1/people/me'
  var params = 
      {
        method:"GET",
        contentType:"application/json",
        muteHttpExceptions:true,
        headers:
        {
          Authorization: "Bearer " + getPeopleService().getAccessToken()
        }
      }
  
  var results = UrlFetchApp.fetch(url, params);
  var userData = JSON.parse(results);
  var html = HtmlService.createTemplateFromFile('showUserDialog')
  html.imgSrc = userData.photos[0].url;
  html.displayName = userData.names[0].displayName;
  SpreadsheetApp.getUi().showModalDialog(html.evaluate(), 'Profile Info')    
}