import React from 'react';
import {Link} from 'react-router';

const NavBtn = ({name}) =>
    <Link to={`/${name == 'home' ? '' : name}`} className="NavBtn">
        <div>
            <img src={"/static/img/" + name + ".svg"} type="image/svg+xml"/>
        </div>
    </Link>

const HeaderNav = (props) =>
    <header id="HeaderNav">
        <div className="banner">
            <img src="/static/img/head.png"/>
        </div>
        <ul>
    {
        ['home', 'archives', 'lab', 'about'].map(item =>
            <li key={item}>
                <NavBtn name={item}/>
            </li>
        )
    }
        </ul>
    </header>

export default HeaderNav;
