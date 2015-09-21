// import React from 'react';
// import {Link} from 'react-router';
var Link = ReactRouter.Link
var menu = ['home', 'archives', 'lab', 'about'];
var NavBtn =  React.createClass({
    render() {
        return (
            <Link to={this.props.name} className="NavBtn">
                <div>
                    <img src={"/static/img/" + this.props.name + ".svg"} type="image/svg+xml"/>
                </div>
            </Link>
        )
    }
});

var HeaderNav = React.createClass({
    render() {
        return (
            <header id="HeaderNav">
                <div className="banner">
                    <img />
                </div>
                <ul>
            {
                menu.map(item =>
                    <li>
                        <NavBtn key={item} name={item}/>

                    </li>
                )
            }
                </ul>
            </header>
        )
    }
});

export default HeaderNav;
