{
const doDecode = ()=>{
    function tryDecodeAllTexts() {
        let tweets = document.getElementsByClassName("css-1dbjc4n r-1loqt21 r-1udh08x r-o7ynqc r-1j63xyz");
        //console.log(tweets);
        let strings = [];
        for (let i = tweets.length - 1; i >= 0; i--) {
            let textbox = tweets[i].querySelector(".css-901oao.r-hkyrab.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-bnwqim.r-qvutc0");
            //console.log(textbox)
            let text = textbox.querySelector(".css-901oao.css-16my406.r-1qd0xha.r-ad9z0x.r-bcqeeo.r-qvutc0");
            //console.log(text)
            decodeAndReplace(text)
        }

    }

    tryDecodeAllTexts()

    function decodeAndReplace(element) {
        let decodeResult;
        try {
            decodeResult = decode(element.textContent)
            if (decodeResult["success"]) {
                element.textContent = decodeResult["text"]
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    //css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0
    //css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0
    //article: css-1dbjc4n r-1loqt21 r-1udh08x r-o7ynqc r-1j63xyz
    //chines:  css-1dbjc4n r-vqp9x9 r-1loqt21 r-1udh08x r-o7ynqc r-1j63xyz
    //thing called tweet datablock: css-1dbjc4n r-18u37iz r-thb0q2
    //tweet block: css-1dbjc4n r-my5ep6 r-qklmqi r-1adg3ll
    //tweet text 
    //tweet text : css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0
    //css-901oao r-hkyrab r-gwet1z r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0
    //css-901oao.r-hkyrab.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-bnwqim.r-qvutc0
}
doDecode();
setInterval(() => {
    doDecode();
}, 1000);
}