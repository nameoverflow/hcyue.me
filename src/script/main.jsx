// import React from 'react';
// import Router from 'react-router'

import HeaderNav from './components/HeaderNav';
import SingleArticle from './components/SingleArticle';
import Index from './components/Index';
import Archives from './components/Archives';

var Router = window.ReactRouter
var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
    render() {
        return (
            <div id='container'>
                <HeaderNav/>
                <main id='page-main'>
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
        <Route handler={Index} name='home' path="/"/>
        <Route handler={Archives} name='archives' path="archives"/>
        <Route handler={Index} name='lab' path="lab"/>
        <Route handler={Index} name='about' path="about"/>
        <Route handler={SingleArticle} name='article' path="article/:id"/>
        <DefaultRoute handler={Index}/>
    </Route>
);

//React.render(<Main />, document.body);
Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler/>, document.body);
});
