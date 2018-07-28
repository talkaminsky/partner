import React from 'react';
import { connect } from 'react-redux';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <div class="nav-menu">
               <nav className="menu">
                   <div className="nav-header">
                       <a href="home.html"><img src="img/app-logo.png" width="160" /></a>
                   </div>
                   <div className="nav-container">
                       <ul className="main-menu">
                           <li>
                               <a href="home.html"><i className="fa fa-home"></i> Home</a>
                           </li>
                           <li className="active">
                               <a href="javascript:void(0);"><i className="fa fa-sign-in"></i> Entry <span
                                   className="fa fa-angle-down"></span></a>
                               <ul>
                                   <li className="active"><a href="login.html" data-loader="show">Login</a></li>
                                   <li><a href="signup.html" data-loader="show">Register</a></li>
                                   <li><a href="forgot-password.html" data-loader="show">Forgot Password</a></li>
                               </ul>
                           </li>
                       </ul>
                   </div>
               </nav>
           </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedMenu = connect(mapStateToProps)(Menu);
export { connectedMenu as Menu };
