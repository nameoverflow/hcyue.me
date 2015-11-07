export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wrapper" style={
                this.props.show ? {
                    transform: 'translateX(0)',
                    opacity: '1'
                } : {
                    transform: 'translateX(100px)',
                    opacity: '0'
                }
            }>
        {
            this.props.children
        }
            </div>
        );
    }
}
