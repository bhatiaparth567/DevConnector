import { Fragment ,useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Alert from './components/layout/alert';
import {Provider} from 'react-redux';
import store from './store';
import Dashboard from './components/Dashboard/dashboard';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/addExperience';
import AddEducation from './components/profile-form/addEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if(localStorage.token){

  setAuthToken(localStorage.token);

}


function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  
  return (
    <Provider store={store}>
    <Router>

    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing}/>
      <section className="container">
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />

        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
        <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
        <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
        <PrivateRoute exact path='/add-experience' component={AddExperience}/>
        <PrivateRoute exact path='/add-education' component={AddEducation}/>
        <PrivateRoute exact path='/posts' component={Posts}/>
        <PrivateRoute exact path='/posts/:id' component={Post}/>
        
      </Switch>

      </section>
    </Fragment>


    </Router>
    </Provider>
    
  );
}

export default App;
