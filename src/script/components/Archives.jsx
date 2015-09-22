import {ajax} from '../utils'
import Timeline from './_partial/TimeLine'

var Archives = React.createClass({
    getInitialState() {
        return {
            years: []
        };
    },
    componentDidMount() {
        loadTimeLine();
    },
    loadTimeLine() {
        return ajax.get('/api/time').then(data =>
            this.setState({
                years: data
            })
        );
    },
    render() {
        <div id="wrapper">
    {
        this.state.years.map((year) =>
            <TimeLine time={`year`} />
        )
    }
        </div>
    }
});

export default Archives;
