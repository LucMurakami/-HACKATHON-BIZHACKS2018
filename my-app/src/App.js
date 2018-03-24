import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import './App.css';
import { inputData } from "./inputData";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// Components
import Header from './Components/Header.js';
import BuildPart1 from './Components/BuildPart1.js';
import BuildPart2 from './Components/BuildPart2.js';
import Prebuilt from './Components/Prebuilt';

class App extends Component {
    constructor() {
        super();
        this.state = {
        };
        this.type = this.type.bind(this)
        this.customized = this.customized.bind(this)
        this.purpose = this.purpose.bind(this)
    }

    componentDidMount() {
        fetch(`https://api.bestbuy.com/v1/products((categoryPath.id=abcat0501000))?apiKey=qunSuq0NntN63fGiOKHWaykd&format=json`)
            .then(response => response.json())
            .then(json => {
                console.log('Category data', json);
            });

        inputData.add("type", "desktop");
    }

    type() {
      const type = inputData.filters.type
      if (type === '') {
        return <BuildPart1 />
      } else {
        this.customized()
      }
    }

    customized() {
      const customized = inputData.filters.customized
      if (customized === '') { 
        return <BuildPart2 />
      } else {
        this.purpose()
      }
    }

    purpose() {
      const purpose = inputData.filters.purpose
      if (purpose === '') {
        return <div />
      } else {
        return ''
      }
    }

    render() {
        return (
            <Router>
            <div>
                <Header />
                <div className="App-Window">
                  {this.type()}
                </div>

                <Route exact path="/Prebuilt" component="Prebuilt" />
                
                
            </div>
            </Router>
        );
    }
}

export default App;
