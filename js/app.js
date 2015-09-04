function insertText(str) {
    var div = document.getElementById('example');
    var node = document.createElement('P');
    var textnode = document.createTextNode(str);
    node.appendChild(textnode);
    div.appendChild(node);
}

function onCallNativeClick() {
    console.log('js: onCallNativeClick()');
    NativeBridge.callNativeApp('yesno', 'Hello from JS!', function(content){
                                console.log('callback to handle response to question: '+content);
                               insertText('Answer: '+content);

                               });
}

function onImagesClick() {
    console.log('js: onImagesClick()');
    NativeBridge.callNativeApp('images', '', function(content){
                                console.log('callback: '+content);

                               });
}
