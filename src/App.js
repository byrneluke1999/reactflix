import React from "react";
import MovieBrowser from "./modules/reactflix/reactflix.container";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends React.Component {
  render() {
    return (
      // Provides the Material UI theme to child components
      <MuiThemeProvider>
        <MovieBrowser />
      </MuiThemeProvider>
    );
  }
}

export default App;
