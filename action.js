let shrink = document.getElementById('shrink');
let convert = document.getElementById('convert');

shrink.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'EncodeDecode.js'});
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'ShrinkOnClick.js'});
    });
};

convert.onclick = function(element) {
    // TODO auxiliary function which converts shortened tweet back to original
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'EncodeDecode.js'});
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'textHandler.js'});
    });
};

