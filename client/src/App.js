import React from 'react';
import './App.css';
import SignInSide from './components/login/login';
import {Route, Switch} from 'react-router-dom';
import Profile from './containers/Profile/profile';
import Private from './routes/private';
import StudyMaterial from './components/StudyMaterial/studyMaterial';
import PDFViewer from './components/PdfViewer/pdfViewer';
import Register from './components/register/register';


function App() {

  return (
    
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignInSide}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Private exact path="/profile" component ={Profile}></Private>
        <Private exact path="/studyMaterial" component ={StudyMaterial}></Private>
        <Private exact path="/pdf/:pdfId" component={PDFViewer}></Private>
        </Switch>
    </div>
  );
}

export default App;
