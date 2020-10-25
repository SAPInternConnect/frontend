import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import login from './pages/login';
import Navigation from './header'
import * as ROUTES from '../constants/routes'
import home from './pages/home'
import friends from '../component/friends'
import profile from '../component/profile'
import signUp from './pages/signup'

class App extends Component {

  constructor(props) {
    super()
    this.state = {
      authUser: null
    }
  }

  updateAuthUser = (val) => {
    this.setState({authUser: val});
    console.log("updated successfully")
 }
  
  render() {
  return (
    <Router>
      <div className="App">
       <Navigation/>
       <Switch>
           <Route exact path= {ROUTES.HOME}  component = {home}/>
           <Route exact path={ROUTES.LOGIN} component={login}/>
           <Route exact path={ROUTES.SIGNUP} component={signUp}/>
           <Route exact path = {ROUTES.MYFRIENDS} component={friends}/>
           <Route exact path = {ROUTES.MYPROFILE} component ={profile}/>
       </Switch>
      </div>
    </Router>
  )};
  }
export default App;