export default class Comment extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        try {
            DUOSHUO.EmbedThread(".DuoShuoComment");
        } catch (e) {
            console.log(e);
            DUOSHUO.EmbedThread(".DuoShuoComment");
        }
    }
    render() {
        return (
            <div
                data-thread-key={this.props.thread}
                data-url={this.props.url}
                className="DuoShuoComment"
            />
        );
    }
}
