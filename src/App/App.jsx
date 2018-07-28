import React from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import { history } from '../Helpers';
import { alertActions } from '../Actions';
import { PrivateRoute, Header, Menu} from '../Components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;

        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });

    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <Menu />
                <Header />
                {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <div className="wrapper-inline">
                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
