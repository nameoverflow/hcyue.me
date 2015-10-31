export default class Comment extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        try {
            DUOSHUO.EmbedThread(React.findDOMNode(this));
        } catch (e) {
            console.log(e);
            DUOSHUO.EmbedThread(React.findDOMNode(this));
        }
    }
    render() {
        return (
            <div
                data-thread-key={this.props.thread}
                data-url={this.props.url}
            />
        );
    }
}
