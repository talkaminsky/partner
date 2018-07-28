import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../Actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.name && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div>
                <main>
                    <form name="form" onSubmit={this.handleSubmit}>
                    <section className="container">
                            <div className="form-divider"></div>

                            <div className="form-row-group with-icons">
                                <div className="form-row no-padding">
                                    <i className="fa fa-user"></i>
                                    <input type="text" placeholder="Full Name" className="form-element" maxLength={50} name="name" value={user.name} onChange={this.handleChange} />
                                    {submitted && !user.name &&
                                    <div className="help-block">Name is required</div>
                                    }
                                </div>
                                <div className="form-row no-padding">
                                    <i className="fa fa-envelope"></i>
                                    <input type="email" placeholder="Email" className="form-element" maxLength={100} name="email" value={user.email} onChange={this.handleChange} />
                                    {submitted && !user.email &&
                                    <div className="help-block">Email is required</div>
                                    }
                                </div>
                                <div className="form-row no-padding">
                                    <i className="fa fa-lock"></i>
                                    <input type="password" placeholder="Password" className="form-element last-element" name="password" value={user.password} onChange={this.handleChange} />
                                    {submitted && !user.password &&
                                    <div className="help-block">Password is required</div>
                                    }
                                </div>
                            </div>

                            <div className="form-divider"></div>

                            <div className="form-row">
                                <button className="button circle block green">Sign Up</button>
                            </div>
                            <div className="form-row txt-center">
                                Already have an account? <Link to="/login" className="btn btn-link">Login</Link>
                            </div>
                        </section>
                    </form>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
