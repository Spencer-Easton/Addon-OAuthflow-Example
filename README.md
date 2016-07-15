#####This is a demonstration project showing how to initiate an OAuth flow from an Add-on.  
####Setup  
1) Add the library `MswhXl8fVhTFUH_Q3UOJbXvxhMjh3Sh48`  
2) Run the function `logRedirectUri` found in OAuth.gs.  Record the returned value for later.  This is a work around for a current issue with the IDE displaying the incorrect project id.  
3) Open the Developers console project  
4) Enable the people api  
5) Create a set of OAuth Client ID Credentials. Use the `Web application` option. In the `Authorized redirect URIs` add `https://script.google.com/macros/d/{PROJECT KEY}/usercallback` where `{PROJECT KEY}` is the value recorded in step 2.  
6) Add the client id and client secret to script properties `clientId` and `clientSecret` respectivly.  
   
   
####Use
Set up a test environment by use the `Test as Add-on` in the `publish` menu.  
Run the test with the latest version of the code installed for the current user.  This gives the Authmode of "NONE".  This will allow you to fully test how the Add-on will react in all modes of authentication.  
