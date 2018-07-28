import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../Helpers';
import {alertActions, userActions} from '../Actions';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: location.pathname.substring(1)
        };

        history.listen((location, action) => {
            this.setState({title: location.pathname.substring(1)});
        });
    }

    render() {
        return (
            <header>
                <a className="go-back-link" onClick={history.goBack}><i className="fa fa-arrow-left"></i></a>
                <h1 className="page-title">{this.state.title}</h1>
                <div className="navi-menu-button">
                    <em></em>
                    <em></em>
                    <em></em>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };
