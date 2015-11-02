let Link = ReactRouter.Link
let menu = ['Home', 'Archives', 'Lab', 'About'];
class NavBtn extends React.Component {
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
                menu.map(item =>
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
