import {ajax} from '../utils'
import TimeLine from './_partial/TimeLine'

var Archives = React.createClass({
    getInitialState() {
        return {
            years: []
        };
    },
    componentDidMount() {
        this.loadTimeLine();
    },
    loadTimeLine() {
        return ajax.get('/api/time').then(data =>
            this.setState({
                years: data
            })
            // console.log(data);
        ).catch(e =>
            console.log(e)
        );
    },
    render() {
        return (
            <div id="wrapper">
        {
            this.state.years.map(year =>
                <TimeLine time={year} />
            )
        }
            </div>
        )
    }
});

export default Archives;
