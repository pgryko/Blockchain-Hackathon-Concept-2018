import React from 'react';
import { Route, IndexRoute} from 'react-router';
import About from '../container/About';
import Header from '../container/Header'
import Home from '../container/Home';
import Features from '../container/Features';
import Help from '../container/Help';
import HelpTopic from '../container/HelpTopic';
import Contacts from '../container/Contacts';
import Login from '../components/Account/LoginOrRegister';
import Dashboard from '../container/DashBoard';
import NoMatch from '../container/NoMatch'
import App from '../container/App';
import Meeting from '../container/Meeting';
/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    // The Header contains the main menu links and will always show on each page
    <Route path="/" component={App}  >
      <Route path="/meeting/:roomID" component={Meeting} />
      <Route path="/meeting/viewer/:roomID" component={Meeting} />
      <Route component={Header} >
        <IndexRoute component={Home}/>
        {/*<Route path="/features" component={Features}/>*/}
        {/*<Route path="/help" component={Help} />*/}
        {/*<Route path="/help/:topicID" component={HelpTopic}/>*/}
        {/*<Route path="/about" component={About}/>*/}
        {/*<Route path="/contacts" component={Contacts}/>*/}
        {/*<Route path="/login" component={Login} />*/}
        {/*<Route path="dashboard" component={Dashboard} onEnter={requireAuth} /> */}
        <Route path="/dashboard" component={Dashboard}  />
        <Route path="*" component={NoMatch}/>
      </Route>
    </Route>
  );
};
