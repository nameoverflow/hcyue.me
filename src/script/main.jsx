/*
import React from 'react';
import {HeaderNav} from './components/HeaderNav';
*/
//var React = require('react');
//var HeaderNav = require('./components/HeaderNav');
import React from 'react';
import HeaderNav from './components/HeaderNav';
import Router from 'react-router'

//var HeaderNav = require('./components/HeaderNav');
var Main = React.createClass({
    render() {
        return (
            <HeaderNav />
        );
    }
});
React.render(<Main />, document.body);