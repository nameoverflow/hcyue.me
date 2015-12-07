import React from 'react';
import {Link} from 'react-router';

class NavBtn extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Link to={`/${this.props.name == 'home' ? '' : this.props.name}`} className="NavBtn">
                <div>
                    <img src={"/static/img/" + this.props.name + ".svg"} type="image/svg+xml"/>
                </div>
            </Link>
        )
    }
}

export default class HeaderNav extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <header id="HeaderNav">
                <div className="banner">
                    <img src="/static/img/head.png"/>
                </div>
                <ul>
            {
                ['home', 'archives', 'lab', 'about'].map(item =>
                    <li>
                        <NavBtn key={item} name={item}/>

                    </li>
                )
            }
                </ul>
            </header>
        )
    }
}
