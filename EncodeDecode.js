export class TransformResult{
    success;
    text;
}

const targetCharCodeBegin = 30000;

let sourceCharIndices = new Map();  // char -> Int
let indicesToSourceChar = new Map();

function buildTable(){
    let sourceIndex = 0;
    for(let char = 'A'.charCodeAt(0) ; char <= 'Z'.charCodeAt(0); ++char){
        sourceCharIndices.set(String.fromCharCode(char),sourceIndex);
        ++sourceIndex;
    }
    for(let char = 'a'.charCodeAt(0) ; char <= 'z'.charCodeAt(0); ++char){
        sourceCharIndices.set(String.fromCharCode(char),sourceIndex);
        ++sourceIndex;
    }
    for(let char = '0'.charCodeAt(0) ; char <= '9'.charCodeAt(0); ++char){
        sourceCharIndices.set(String.fromCharCode(char),sourceIndex);
        ++sourceIndex;
    }
    for(let char of [',','.',' ','?','!']){
        sourceCharIndices.set(char,sourceIndex);
        ++sourceIndex;
    } 
    sourceCharIndices.forEach((v,k,m)=>{
        indicesToSourceChar.set(v,k);
    }) ;  
}

buildTable();


export function encode(source){
    if (source.length %2 == 1){
        source = source + " ";
    }
    if (source.length > 280 * 2){
        return {
            success : false
        }
    }
    let result = "";
    for(let i = 0;i<source.length;i+=2){
        let char0 = source[i];
        let char1 = source[i+1];
        if(!sourceCharIndices.has(char0)){
            return {
                success : false
            }
        }
        if(!sourceCharIndices.has(char1)){
            return {
                success : false
            }
        }
        let index0 = sourceCharIndices.get(char0);
        let index1 = sourceCharIndices.get(char1);
        let pairIndex = index0 * sourceCharIndices.size + index1;
        let targetCharCode = pairIndex + targetCharCodeBegin;
        let targetChar = String.fromCharCode(targetCharCode);
        result += targetChar;
    }

    return {
        success:true,
        text:result
    };
    
}

export function decode(source){
    let maxCharCode = targetCharCodeBegin + sourceCharIndices.size * sourceCharIndices.size - 1;
    let result = "";
    for(let i = 0;i<source.length;++i){
        let char = source[i];
        let code = char.charCodeAt(0);
        if (code < targetCharCodeBegin || code > maxCharCode){
            return {
                success:false,
            }
        }
        code = code - targetCharCodeBegin;
        let index1 = code % sourceCharIndices.size;
        let index0 = (code- index1) / sourceCharIndices.size
        let char1 = indicesToSourceChar.get(index1);
        let char0 = indicesToSourceChar.get(index0);
        result = result + char0 + char1;
    }
    return {
        success:true,
        text:result
    };
}