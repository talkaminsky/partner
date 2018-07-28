import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../Actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <main>
                <form name="form" onSubmit={this.handleSubmit}>
                    <section className="container">
                        <div className="form-divider" />
                        <div className="form-row-group with-icons">
                            <div className="form-row no-padding">
                                <i className="fa fa-envelope" />
                                <input type="email" className="form-element" placeholder="Email"
                                       name="email" value={email} onChange={this.handleChange}/>
                                {submitted && !email &&
                                <div className="help-block">Email is required</div>
                                }
                            </div>
                            <div className="form-row no-padding">
                                <i className="fa fa-lock" />
                                <input type="password" className="form-element last-element" placeholder="Password"
                                       name="password" value={password} onChange={this.handleChange}/>
                                {submitted && !password &&
                                <div className="help-block">Password is required</div>
                                }
                            </div>
                        </div>
                        <div className="form-row txt-center">
                            <a href="" data-loader="show">Forgot password?</a>
                        </div>
                        <div className="form-divider"></div>
                        <div className="form-row">
                            <button className="button circle block green">Login</button>
                        </div>
                        <div className="form-row txt-center">
                            Don't you have an account yet?   <Link to="/register" className="btn btn-link">Sign Up</Link>
                        </div>
                    </section>
                </form>
            </main>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
