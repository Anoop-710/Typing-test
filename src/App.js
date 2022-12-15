import { useTheme } from "./Context/ThemeContext";
import Footer from "./Components/Footer";
import TypingBox from "./Components/TypingBox";
import { GlobalStyles } from "./Styles/global";
import { ThemeProvider } from "styled-components";

var randomWords =  require('random-words');

function App() {

  const {theme} = useTheme();
  const words = randomWords(100);

  return (
    <div className="canvas">
      <ThemeProvider theme={{theme}}>
        <GlobalStyles/>
        <h1>Typing Test</h1>
        <TypingBox words={words}/>
        <Footer />
      </ThemeProvider>
      
   </div>
  );
}

export default App;