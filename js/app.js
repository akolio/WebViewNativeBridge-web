function insertText(str) {
    var div = document.getElementById('example');
    var node = document.createElement('P');
    var textnode = document.createTextNode(str);
    node.appendChild(textnode);
    div.appendChild(node);
}

function insertImage(pngDataBase64) {
    var div = document.getElementById('example');
    var node = document.createElement('img');
    node.setAttribute('style', 'width: 100%;');
    node.setAttribute('src', 'data:image/png;base64,'+ pngDataBase64);
    div.appendChild(node);
}


function onCallNativeClick() {
    console.log('js: onCallNativeClick()');
    NativeBridge.callNativeApp('yesno', 'Hello from JS!', function(content){
      console.log('callback to handle response to question: ', content);
      insertText('Answer: '+content.answer);

    });
}

function onImagesClick() {
      console.log('js: onImagesClick()');
      NativeBridge.callNativeApp('images', '', function(content){
      // console.log('callback: '+content);
      insertImage(content.pngDataBase64);
    });
}
