{
console.log(1113);

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

let outerDiv = document.querySelector('.public-DraftStyleDefault-block');
let outerSpan = outerDiv.children[0].children[0];

let sourceText = outerSpan.textContent;

let encodeResult = encode(sourceText);

console.log(encodeResult);

if(encodeResult.success){
    let encodeText = encodeResult.text
    copyToClipboard(encodeText)
    window.alert("Your tweet had been compressed, and the results are in your clipboard!")
}

else{
    window.alert("compression failed")
}

}

