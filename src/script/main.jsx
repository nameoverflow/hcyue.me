import React from 'react';
import Router from 'react-router'


import HeaderNav from './components/HeaderNav';
import ArticleSingle from './components/ArticleSingle';

var RouteHandler = Router.RouteHandler;
var Main = React.createClass({
    render() {
        return (
            <div id='container'>
                <HeaderNav />
                <main>
                    {/*<RouteHandler />*/}
                </main>
            </div>
        );
    }
});

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

/*var routes = (
    <Route name='main' path='/' handler={Main}>
        <Route name='article' path="article/:id" handler={ArticleSingle} />
        <DefaultRoute handler={ArticleSingle} />
    </Route>
);*/

React.render(<Main />, document.body);
/*
Router.run(routes, Router.HistoryLocation, (Root) =>{
    React.render(<Root/>, document.body);
});
*/
