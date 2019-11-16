// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// import {tryDecodeAllTexts} from './textHandler.js'


let shrink = document.getElementById('shrink');
let convert = document.getElementById('convert');

shrink.onclick = function(element) {
    // TODO auxiliary function which outputs the shortened tweet

    let shortTweet = "lol"; // TODO replace lol by the shortened tweet
    copyToClipboard(shortTweet);
    window.alert("Now, break the limit by directly pasting into the text box!")
};

convert.onclick = function(element) {
    // TODO auxiliary function which converts shortened tweet back to original
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'textHandler.js'});
    });
};

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};