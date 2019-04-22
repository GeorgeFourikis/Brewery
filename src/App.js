import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import BeersList from "./components/BeersList";
import Beer from "./components/Beer";
import "./App.css";

console.log(process.env.REACT_APP_BREWERY_API_KEY);

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={BeersList} />
          <Route path="/beer" component={Beer} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
