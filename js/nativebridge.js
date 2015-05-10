

var NativeBridge = {
};

NativeBridge.callNativeLog = (function() {
                              function callNativeLog(logMessage){
                              var message = {
                              logMessage: logMessage
                              };
                              window.webkit.messageHandlers.nativelog.postMessage(JSON.stringify(message));
                              }
                              return callNativeLog;
                              })();


(function() {
 var oldConsoleLog = console.log;
 console.log = function() {
 oldConsoleLog.apply(console, arguments);
 NativeBridge.callNativeLog(arguments[0]);
 }
 })();




NativeBridge.callbacks = {}; // live callbacks

NativeBridge.callNativeApp = (function() {
    var callbackId = 1;
    function callNativeApp(command, arguments, callback){
        var message = {
            callbackId: callbackId,
            command: command,
            arguments: arguments
        };
        
                              
        if(typeof callback !== 'undefined') {
            NativeBridge.callbacks[callbackId] = callback;
        }
                              
        callbackId++;
        window.webkit.messageHandlers.nativeapp.postMessage(JSON.stringify(message));
    }
    return callNativeApp;
})();




NativeBridge.handleCallback = function(message){
//    console.log(message);
//    console.log('native callback:');
//    console.log(NativeBridge.callbacks);
    
    var msgObj = JSON.parse(message);
    
    //insertText('callbackId was '+msgObj.callbackId+' and content: '+msgObj.content);
    
    if (NativeBridge.callbacks[msgObj.callbackId]) {
        NativeBridge.callbacks[msgObj.callbackId](msgObj.content);
    }
    delete NativeBridge.callbacks[msgObj.callbackId];
}


