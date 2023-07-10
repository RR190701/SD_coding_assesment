import React from 'react';
import './App.css';
import SignInSide from './components/login/login';
import {Route, Switch} from 'react-router-dom';
import Profile from './containers/Profile/profile';
import Private from './routes/private';
import StudyMaterial from './components/StudyMaterial/studyMaterial';


function App() {

  return (
    
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignInSide}></Route>
        <Private exact path="/profile" component ={Profile}></Private>
        <Private exact path="/studyMaterial" component ={StudyMaterial}></Private>
        </Switch>
    </div>
  );
}

export default App;
