import './App.css';
import { useEffect, useRef, useState } from 'react';
import Astroid from './components/Astroid';
import Guleisgoo from './components/Guleisgoo';
import AppContext from './AppContext';

function App() {

  const [astroids, setAstroids] = useState([
    { text: "The Social Line", ref: new useRef(null) },
    { text: "Spotify Space", ref: new useRef(null)}
  ]);

  // Page setup
  useEffect(() => {
    document.title = `Gul3isg00's Portfolio`
  }, []);

  return (
    <AppContext.Provider value = {{astroids}} className="App">
      <header className="App-header">
        <Guleisgoo />
        <p>
          Gul3isg00's Portfiolio is being built!
        </p>
      </header>
      {astroids.map(astroid => <Astroid text={astroid.text} ref = {astroid.ref}/>)}
    </AppContext.Provider>
  );
}

export default App;
