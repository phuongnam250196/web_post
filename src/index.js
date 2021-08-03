import React, { Suspense, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import './index.css';
import App from './Shared/Components/App/App';
import Login from './Modules/Login/Login';

const isLogged = true;
const Root = (
  
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Suspense>  
          <Route path="/login" render={() => {
            return (!isLogged) ? (
              <Login></Login>
            ) : (
              <Redirect to="/app/post" ></Redirect>
            )
          }} ></Route>
          <Route path="/app" render={() => {
            return (isLogged) ? (
              <App></App>
            ) : (
              <Redirect to="/login" ></Redirect>
            )
          }} ></Route>
        </Suspense>
      </Switch>
    </Fragment>
  </BrowserRouter>
);

ReactDOM.render(Root, document.getElementById('root'));



export default Root;
