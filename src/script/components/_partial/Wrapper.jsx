export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wrapper" style={
                this.props.show ? {
                    left: '0',
                    opacity: '1'
                } : {
                    left: '100px',
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
