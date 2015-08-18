import React from 'react';
import {Link} from 'react-router';

var menu = ['home', 'archives', 'lab', 'about'];
var NavBtn =  React.createClass({

    render() {
        return (
            <div className="nav-btn">
                <Link to={this.props.item}>
                    <img src={"/static/img/" + this.props.item + ".svg"} />
                </Link>
            </div>
        )
    }
});

var HeaderNav = React.createClass({
    render() {
        return (
            <header className="header-nav">
                <div className="banner">
                    <img />
                </div>
                <ul>
            {/*
                menu.map(item => 
                    <li>
                        <NavBtn key={item} name={item}/>

                    </li>
                )
            */}
                </ul>
            </header>
        )
    }
});

export default HeaderNav;
