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
                <HeaderNav />
                <main>
                    <RouteHandler />
                </main>
            </div>
        );
    }
});

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
    <Route path='/' handler={Main}>
        <Route name='home' path="/" handler={ArticleList} />
        <Route name='archives' path="archives" handler={ArticleList} />
        <Route name='lab' path="lab" handler={ArticleList} />
        <Route name='about' path="about" handler={ArticleList} />
        <Route name='article' path="article/:id" handler={SingleArticle} />
        <DefaultRoute handler={ArticleList} />
    </Route>
);

//React.render(<Main />, document.body);
Router.run(routes, Router.HistoryLocation, (Handler) =>{
    React.render(<Handler />, document.body);
});
