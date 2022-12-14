import React, { createRef, useEffect, useRef, useState } from 'react'

const TypingBox = ({words}) => {

    // in react you get a hook , useRef()
    // react also provides a function, createRef()
    // createRef is used because calling hooks inside a callback function is not allowed

    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [currWordIndex, setCurrWordIndex] = useState(0);

    const inputRef = useRef(null);

    //wordSpanRef array will contain references to the mapped array elements(letters in spans in this case)
    //fill it with zeros to map it through reference and map it through each element and replace by reference variable
    const wordSpanRef = Array(words.length).fill(0).map(i=>createRef(null));

    // console.log(wordSpanRef);

    const handleKeyDown = (e)=>{
        
        //returns a nodeList to represent what index the user is at
        let allChildSpans = wordSpanRef[currWordIndex].current.childNodes;


        //logic for space press -> increase my currWordIndex by 1
        if(e.keyCode === 32){

            //condition to remove cursor. 2 cases middle of the string and @ last char in the string
            if(allChildSpans.length <= currCharIndex){
                //cursor present at the end of the string(right cursor)
                allChildSpans[currCharIndex-1].classList.remove('right-cursor');    //-1 to avoid overflow of characters
            }
            else{
                //cursor present at the middle of the string
                allChildSpans[currCharIndex].className = allChildSpans[currCharIndex].className.replace('current', '');
            }
            wordSpanRef[currWordIndex+1].current.childNodes[0].className = 'char current';
            setCurrWordIndex(currWordIndex+1);
            setCurrCharIndex (0);

            return;
        }


        //logic for backspace
        if (e.keyCode === 8) {
            
            if(currCharIndex!==0){

                if(currCharIndex===allChildSpans.length){

                    // to remove extra typed characters
                    if(allChildSpans[currCharIndex-1].className.includes('extra')){
                        allChildSpans[currCharIndex-1].remove();
                        allChildSpans[currCharIndex-2].className+= ' right-cursor';
                    }
                    else{
                        allChildSpans[currCharIndex-1].className = 'char current';
                    }
                    allChildSpans[currCharIndex-1].className = 'char current';
                    setCurrCharIndex(currCharIndex-1);
                    return;
                    // if backspace is pressed at last character
                }
                allChildSpans[currCharIndex].className = 'char';
                allChildSpans[currCharIndex-1].className = 'char current';
                setCurrCharIndex(currCharIndex-1);
               
            }
            
            return;
        }

        // Implementing additional char if pressed instead of space
        if(currCharIndex === allChildSpans.length){
            // add new characters
            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = 'char incorrect extra right-cursor';
            allChildSpans[currCharIndex-1].classList.remove('right-cursor');
            wordSpanRef[currWordIndex].current.append(newSpan)
            setCurrCharIndex(currCharIndex+1)
            return;
        }

        if(e.key===allChildSpans[currCharIndex].innerText){
            console.log("user pressed the correct key", e.key);
            allChildSpans[currCharIndex].className = 'char correct';
        }
        else{
            console.log("user didn't press the correct key", e.key);
            allChildSpans[currCharIndex].className = 'char incorrect';
        }
        if(currCharIndex+1 === allChildSpans.length){   //case for last character
            allChildSpans[currCharIndex].className += ' char right-cursor'; //+= overwrite existing class name
        }
        else{
            allChildSpans[currCharIndex+1].className = 'char current';
        }
        
        setCurrCharIndex(currCharIndex+1);

    }


    const focusInput = ()=>{
        inputRef.current.focus();
    }

    useEffect(()=>{
        focusInput();
        wordSpanRef[0].current.childNodes[0].className = 'char current';   //childNodes gives all the characters
        // Sets the 0th index with the current class name ⬆️
        

    },[]);



  return (
    <div>
        <div className="type-box" onClick={focusInput}>
            <div className="words">
                {words.map((word,index)=>(
                    <span className='word' ref={wordSpanRef[index]} key={index}>  
                        {word.split('').map((char,ind)=>(
                            <span className='char' key={ind}>{char}</span>
                        ))}
                    </span>
                ))}
            </div>
        </div>
        <input
            type='text'
            className='hidden-input'
            ref={inputRef}
            onKeyDown={(e)=>handleKeyDown(e)}
        />
    </div>
  )
}

export default TypingBox