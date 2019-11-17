{
    
const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

let outerDivs = document.querySelectorAll('.public-DraftStyleDefault-block');
let encodeText = "";

for (let outerDiv of outerDivs) {
    let textSpan = outerDiv.children[0].children[0];
    let sourceText = textSpan.textContent;
    if(outerDiv.children.length>1){
        let extraSpan = outerDiv.children[1].children[0];
        sourceText += extraSpan.textContent;
    }
    let encodeResult = encode(sourceText);
    console.log(encodeResult);
    if (encodeResult.success) {
        encodeText += encodeResult.text;
    } else {
        window.alert("compression failed")
    }
}

copyToClipboard(encodeText);
window.alert("Your tweet has been compressed, and the results are in your clipboard!")

}

