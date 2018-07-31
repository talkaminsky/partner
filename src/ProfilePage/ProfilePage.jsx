import React from 'react';
import { connect } from 'react-redux';

class ProfilePage extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <main>
                    <section className="container">
                        <div className="form-divider"></div>

                        <div className="form-row txt-center">
                            <div className="profile-image">
                                <img className="avatar-img" alt="User Avatar" src="../Template/img/avatar.png" width="100" height="100" />
                                    <a href="javascript:void(0);" className="update-btn">
                                        <i className="fa fa-camera" />
                                    </a>
                            </div>
                        </div>
                        <div className="form-divider" />
                        <div className="form-label-divider"><span>ACCOUNT INFO</span></div>
                        <div className="form-divider" />

                        <div className="form-row-group with-icons">
                            <div className="form-row no-padding">
                                <i className="fa fa-user"></i>
                                <input type="text" name="name" className="form-element" placeholder="Username"
                                       value="skywalker" />
                            </div>
                            <div className="form-row no-padding">
                                <i className="fa fa-envelope"></i>
                                <input type="email" name="email" className="form-element" placeholder="Email"
                                       value="luke@skywalker.com" />
                            </div>
                            <div className="form-row no-padding">
                                <i className="fa fa-lock"></i>
                                <input type="password" name="password" className="form-element last-element" placeholder="Password"
                                       value="123456" />
                            </div>
                        </div>
                        <div className="form-divider" />
                        <div className="form-row">
                            <a href="#" className="button circle block green">Update</a>
                        </div>
                        <div className="form-divider" />
                    </section>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
