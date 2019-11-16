function tryDecodeAllTexts() {

    let strings = document.getElementsByClassName("css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0");
    for(let element of strings) {
        decodeAndReplace(element)
    }
}

console.log(111)
tryDecodeAllTexts()

function decode(source){
    return {
        success: true,
        text: "I am replaced"
    }
}

function decodeAndReplace(element) {
    let decodeResult;
    try {
        decodeResult = decode(element)
        if (decodeResult["success"]) {
            element.textContent = decodeResult["text"]
        }
    }
    catch (err) {
        console.log(err)
    }
}