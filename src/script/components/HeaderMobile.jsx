import React from 'react';
import {Link} from 'react-router';

const NavBtn = ({name}) =>
    <Link to={`/${name == 'Home' ? '' : name.toLowerCase()}`} className="NavBtn">
        <div>
            {name}
        </div>
    </Link>

export default class HeaderMobile extends React.Component {
    constructor() {
        super();
        this.state = {show: false}
    }
    clickHandler(e) {
        this.setState({show: this.state.show ? false : true});
    }
    render() {
        return (
            <header id="HeaderMobile"
                style={{
                    left: this.state.show ? '0' : '-150px'
                }}
            >
                <div
                    className="btn-active"
                    onClick={this.clickHandler.bind(this)}
                >
                    <i className="fa fa-arrow-right fa-lg"
                        style={{
                            transform: this.state.show ? 'rotate(180deg)' : 'rotate(0)'
                        }}
                    />
                </div>
                <ul>
                {
                    ['Home', 'Archives', 'Lab', 'About'].map(item =>
                        <li key={item} onClick={this.clickHandler.bind(this)}>
                            <NavBtn name={item}/>
                        </li>
                    )
                }
                </ul>
            </header>
        );
    }
}
