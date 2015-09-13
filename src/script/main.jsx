// import React from 'react';
// import Router from 'react-router'

import HeaderNav from './components/HeaderNav';
import SingleArticle from './components/SingleArticle';
import ArticleList from './components/ArticleList';

var Router = window.ReactRouter
var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
    render() {
        return (
            <div id='container'>
                <HeaderNav/>
                <main>
                    <RouteHandler/>
                </main>
            </div>
        );
    }
});

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
    <Route handler={Main} path='/'>
        <Route handler={ArticleList} name='home' path="/"/>
        <Route handler={ArticleList} name='archives' path="archives"/>
        <Route handler={ArticleList} name='lab' path="lab"/>
        <Route handler={ArticleList} name='about' path="about"/>
        <Route handler={SingleArticle} name='article' path="article/:id"/>
        <DefaultRoute handler={ArticleList}/>
    </Route>
);

//React.render(<Main />, document.body);
Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler/>, document.body);
});
