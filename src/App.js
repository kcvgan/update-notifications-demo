import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useAppUpdates} from "./useAppUpdates";

function App() {
  // This is just a convenient hook that exposes an API for dealing with the whole app update process
  // We can attach this to some notification component or something else entirely which will live on top of the app
  // and be able to force the user to reload or do it and bust the cache
  const {
    isNewVersionAvailable,
    currentVersion,
    latestVersion,
  } = useAppUpdates({
    interval: 3000,
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {isNewVersionAvailable ?
            (<>
              <p>There's a new version available, please refresh the page</p>
              <p>Current version: {currentVersion}</p>
              <p>Latest version: {latestVersion}</p>
            </>)
            :
            <p>Your app is up to date</p>
        }
      </header>
    </div>
  );
}

export default App;
