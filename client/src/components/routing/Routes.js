import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Posts from '../posts/Posts';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/login"/>
        )}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
