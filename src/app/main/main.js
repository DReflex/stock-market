import React from 'react';
import Home from '../home/home';
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component{
  render(){
    return(
      <main>
        <Switch>
          <Route exact path='/' component={Home} />

        </Switch>
      </main>
    )
  }
}
export default Main
