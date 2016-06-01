import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from '../actions/users';

class LoginOrRegister extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (isLogin) {
      manualLogin({ email, password });
    } else {
      signUp({ email, password });
    }
  }

  renderHeader() {
    const { user: { isLogin } , toggleLoginMode } = this.props;
    if (isLogin) {
      return (
        <div className='header'>
          <h1 className='heading'>Login with Email</h1>
          <div className='alternative'>
            Not what you want?
            <a className='alternative-link'
               onClick={toggleLoginMode}> Register an Account</a>
          </div>
        </div>
      );
    }

    return (
      <div className='header'>
        <h1 className='heading'>Register with Email</h1>
        <div className='alternative'>
          Already have an account?
          <a className='alternative-link'
             onClick={toggleLoginMode}> Login</a>
        </div>
      </div>
    );
  }

  render() {
    const { isWaiting, message, isLogin } = this.props.user;

    return (
      <div className={classNames('login', {
        waiting: isWaiting
      })}>
        <div className='container'>
          { this.renderHeader() }
          <img className='loading' src="/img/hourglass.svg" />
          <div className='email-container'>
            <form onSubmit={this.handleOnSubmit}>
              <input className='input'
                     type="email"
                     ref="email"
                     placeholder="email" />
              <input className='input'
                     type="password"
                     ref="password"
                     placeholder="password" />
              <div className='hint'>
                <div>Hint</div>
                <div>email: example@ninja.com password: ninja</div>
              </div>
              <p className={classNames('message', {
                'message-show': message && message.length > 0
              })}>{message}</p>
              <input className='button'
                     type="submit"
                     value={isLogin ? 'Login' : 'Register'} />
            </form>
          </div>
          <div className='google-container'>
            <h1 className='heading'>Google Login Demo</h1>
            <a className='button'
               href="/auth/google">Login with Google</a>
          </div>
        </div>
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({user}) {
  return {
    user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, { manualLogin, signUp, toggleLoginMode })(LoginOrRegister);

