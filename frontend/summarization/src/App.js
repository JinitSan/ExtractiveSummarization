import React from "react"
import './App.css';
import TextBoxes from './components/TextBoxes';
import { Layout } from './layout/Layout';
import Theme from './styles/theme';
import BackgroundEffect from "./components/BackgroundEffect";

function App() {
  return(
    <>
      <Theme>
        <Layout>
          <div className="app">
            <BackgroundEffect/>
            <TextBoxes/>
          </div>
        </Layout>
      </Theme>
    </>
    
  );
}

export default App;
