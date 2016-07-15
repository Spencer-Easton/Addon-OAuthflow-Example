function getPeopleService() { 
  return OAuth2.createService('people')
  .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
  .setTokenUrl('https://accounts.google.com/o/oauth2/token')
  .setClientId(PropertiesService.getScriptProperties().getProperty('clientId'))
  .setClientSecret(PropertiesService.getScriptProperties().getProperty('clientSecret'))
  .setCallbackFunction('authCallback')
  .setPropertyStore(PropertiesService.getUserProperties())
  .setScope('https://www.googleapis.com/auth/plus.login')
  .setParam('login_hint', Session.getActiveUser().getEmail())
  .setParam('access_type', 'offline')
  .setParam('approval_prompt', 'force');
}



function authCallback(request) {
  var peopleService = getPeopleService();
  var html  = HtmlService.createTemplateFromFile('authCallbackDialog')
  var isAuthorized = peopleService.handleCallback(request);
  if (isAuthorized) {  
    SpreadsheetApp.getUi().createAddonMenu().addItem("Show my info", "showUserInfo").addToUi();
    html.message = "Success! New options have been added to the add-on's menu. You can close this tab."    
  } else {
    html.message = "Hmm. Looks like there was a problem. Try requesting access again from the add-on."
  }
  html.hasButton = true;
  SpreadsheetApp.getUi().showModalDialog(html.evaluate(), "Access status")
  html.hasButton = false;
  return html.evaluate();
}


function showAuthDialog(){
  var peopleService = getPeopleService();
  if (!peopleService.hasAccess()) {
    var authorizationUrl = peopleService.getAuthorizationUrl();
    var template = HtmlService.createTemplateFromFile('authDialog');    
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate();
    SpreadsheetApp.getUi().showModalDialog(page, "Request access")       
  }   
}

function logRedirectUri() {
  var service = getPeopleService();
  Logger.log(service.getRedirectUri());
}

function clearService(){
  OAuth2.createService('people')
  .setPropertyStore(PropertiesService.getUserProperties())
  .reset();
}