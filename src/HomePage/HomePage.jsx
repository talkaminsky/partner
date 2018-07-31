import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../Actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getById(1));
    }

    render() {
        const { user, users } = this.props;
        debugger;
        return (
            <main>
                <section className="container">
                    <div className="post-item">
                        <div className="post-asset image">
                            <img src="../Template/img/assets/post-img-2.jpg" />
                        </div>
                        <div className="post-header">
                            <h3 className="post-title"><a href="#" data-loader="show">Art Of Coffee</a></h3>
                            <span className="post-category"><i className="fa fa-th-large" /> Travel</span>
                            <span className="post-date"><i className="fa fa-clock-o" /> 7 hours ago</span>
                            <span className="post-comments"><i className="fa fa-comments" /> 13 comments</span>
                        </div>
                        <div className="post-footer">
                            <a href="#" className="post-author">
                                <span className="author-img"><img src="../Template/img/avatar.png" /></span>
                                <span className="author-name">post by<b>Jessica Jones</b></span>
                            </a>
                            <div className="post-extra">
                                <div className="add-favorite"><i className="fa fa-heart-o" /></div>
                                <div className="post-share"><i className="fa fa-share-alt" />
                                    <div className="social-links">
                                        <a href="#" className="share-facebook"><i className="fa fa-facebook" /></a>
                                        <a href="#" className="share-twitter"><i className="fa fa-twitter" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="post-asset image">
                            <img src="../Template/img/assets/post-img-2.jpg" />
                        </div>
                        <div className="post-header">
                            <h3 className="post-title"><a href="#" data-loader="show">Art Of Coffee</a></h3>
                            <span className="post-category"><i className="fa fa-th-large" /> Travel</span>
                            <span className="post-date"><i className="fa fa-clock-o" /> 7 hours ago</span>
                            <span className="post-comments"><i className="fa fa-comments" /> 13 comments</span>
                        </div>
                        <div className="post-footer">
                            <a href="#" className="post-author">
                                <span className="author-img"><img src="../Template/img/avatar.png" /></span>
                                <span className="author-name">post by<b>Jessica Jones</b></span>
                            </a>
                            <div className="post-extra">
                                <div className="add-favorite"><i className="fa fa-heart-o" /></div>
                                <div className="post-share"><i className="fa fa-share-alt" />
                                    <div className="social-links">
                                        <a href="#" className="share-facebook"><i className="fa fa-facebook" /></a>
                                        <a href="#" className="share-twitter"><i className="fa fa-twitter" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-mini-divider" />

                    <div className="form-divider" />

                    <button className="button circle block green">Load more</button>

                    <div className="form-divider" />
                </section>
            </main>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
