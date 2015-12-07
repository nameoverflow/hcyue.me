import React from 'react';
import {Link} from 'react-router';

class NavBtn extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Link to={`/${this.props.name == 'Home' ? '' : this.props.name.toLowerCase()}`} className="NavBtn">
                <div>
                    {this.props.name}
                </div>
            </Link>
        )
    }
}

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
                    <li onClick={this.clickHandler.bind(this)}>
                        <NavBtn key={item} name={item}/>
                    </li>
                )
            }
                </ul>
            </header>
        );
    }
}
