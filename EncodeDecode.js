{
 /**
  * Encoding N*3 English lower case + digits characers into N unicode characters,
  * Target characters are from plane0 and plane2
  * 
  */


class TransformResult{
    success;
    text;
}

const targetCodePointBegin = 1000;
const plane0Limit = 40000;
const plane2Limit = 40000;
const plane2Begin = 65536*2;

let sourceCharIndices = new Map();  // char -> Int
let indicesToSourceChar = new Map();

let charsInGroup = 3;

function buildTable(){
    let sourceIndex = 0;
    for(let char = 'a'.codePointAt(0) ; char <= 'z'.codePointAt(0); ++char){
        sourceCharIndices.set(String.fromCodePoint(char),sourceIndex);
        ++sourceIndex;
    }
    for(let char = '0'.codePointAt(0) ; char <= '9'.codePointAt(0); ++char){
        sourceCharIndices.set(String.fromCodePoint(char),sourceIndex);
        ++sourceIndex;
    }
    for(let char of ['.',',',' ','#','!','?','/']){
        sourceCharIndices.set(char,sourceIndex);
        ++sourceIndex;
    } 
    sourceCharIndices.forEach((v,k,m)=>{
        indicesToSourceChar.set(v,k);
    }) ;  
}

buildTable();



function codeToTarget(code){
    if (code<=plane0Limit){
        return String.fromCodePoint(code)
    }
    else{
        let leftover = code - plane0Limit
        let newCode = plane2Begin + leftover
        console.log(newCode)
        return String.fromCodePoint(newCode);
    }
}


function targetToCode(target){
    let code = target.codePointAt(0);
    if(code <= plane0Limit){
        return code;
    }
    else{
        leftover = code - plane2Begin;
        let newCode = leftover + plane0Limit;
        return newCode;
    }
}


function encode(source){
    while (source.length % charsInGroup != 0){
        source = source + " ";
    }
    if (source.length > 140 * charsInGroup){
        return {
            success : false
        }
    }
    let result = "";
    for(let i = 0;i<source.length;i+=charsInGroup){
        let targetCodePoint = targetCodePointBegin
        for(let j = 0;j<charsInGroup;++j){
            let char = source[i+j];
            if(!sourceCharIndices.has(char)){
                return {
                    success : false
                }
            }
            let index = sourceCharIndices.get(char);
            targetCodePoint += sourceCharIndices.size**j*index
        }
        //console.log(targetCodePoint)
        let targetChar = codeToTarget(targetCodePoint);
        result += targetChar;
    }

    return {
        success:true,
        text:result
    };
    
}

function decode(source){
    
    let result = "";
    for(let i = 0;i<[...source].length;++i){
        let char = [...source][i];
        let code = targetToCode(char);
        
        code = code - targetCodePointBegin;

        if (code < 0 || code >= sourceCharIndices**charsInGroup ){
            return {
                success:false,
            }
        }

        for(let j = 0;j<charsInGroup;++j){
            let index = code % sourceCharIndices.size;
            code = (code - index) / sourceCharIndices.size;
            let char = indicesToSourceChar.get(index)
            result = result + char
        }
        
    }
    return {
        success:true,
        text:result
    };
}

if(window){
    console.log("haswindow")
    console.log(window)
    window.encode = encode;
    window.decode = decode;
}
if(document){
    console.log("has doc")
    console.log(document)
    document.encode = encode;
    document.decode = decode;
}



}