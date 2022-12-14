import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`

*{
    box-sizing: border-box;
}

body{
    background: black;
    color: white;
    padding:0;
    margin:0;
    transition: all 0.25s linear;
}

.canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    padding:1rem;
    width:100vw;
    text-align: center;
    align-items: center;
}

.type-box{
    display:block;
    max-width: 1000px;
    height: 140px;
    margin-left:auto;
    margin-right:auto;
    overflow: hidden;
}

.words{
    font-size: 32px;
    display: flex;
    flex-wrap: wrap;
    align-content:center;
}

.word{
    margin: 5px;
    padding-right:2px;
}

.hidden-input{
    opacity:0;
}


.correct{
    color: green;
}

.incorrect{
    color: red;
}

.current{
    border-left: 1px solid;

    animation: blinkingLeft 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingLeft{
        0% {border-left-color:white}
        25% {border-left-color:black}
        50% {border-left-color:white}
        75% {border-left-color:black}
        100% {border-left-color:white}
    }
}


.right-cursor{
    border-right: 1px solid;

    animation: blinkingRight 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingRight{
        0% {border-Right-color:white}
        25% {border-Right-color:black}
        50% {border-Right-color:white}
        75% {border-Right-color:black}
        100% {border-Right-color:white}
    }
}



`;