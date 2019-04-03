import React, { Component } from "react";
import { SignIn } from "aws-amplify-react";

type CustomSignInProps = {
  // handleInputChange?: Function | undefined,
  // changeState?: Function | undefined,
  override: string
};

export default class CustomSignIn extends Component<any> {
// export default class CustomSignIn extends SignIn<CustomSignInProps> {
  _validAuthStates = ['signIn', 'signedOut', 'signedUp'];
  constructor(props: any) {
    super(props);
    // this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <label
              htmlFor='email'
            >
              Email
            </label>
            <input
              id='email'
              key='email'
              name='email'
              onChange={this.props.handleInputChange}
              type='email'
              placeholder='Email'
            />
          </div>
          <div>
            <label
              htmlFor='password'
            >
              Password
            </label>
            <input
              id='password'
              key='password'
              name='password'
              onChange={this.props.handleInputChange}
              type='password'
              placeholder='******************'
            />
            <p>
              Forgot your password?{" "}
              <a
                onClick={() => this.props.onStateChange('forgotPassword',{})}
              >
                Reset Password
              </a>
            </p>
          </div>
          <div>
            <button
              type='button'
              onClick={() => this.props.onStateChange('signIn',{})}
            >
              Login
            </button>
            <p>
              No Account?{" "}
              <a
                onClick={() => this.props.onStateChange('signUp',{})}
              >
                Create Account
              </a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}