import {ajax} from '../utils'
import TimeLine from './_partial/TimeLine'
import Wrapper from './_partial/Wrapper'

var Archives = React.createClass({
    getInitialState() {
        return {
            years: [],
            show: false
        };
    },
    componentDidMount() {
        this.loadTimeLine()
        .then(() =>
            this.setState({show: true})
        );
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
            <Wrapper show={this.state.show}>
        {
            this.state.years.map(year =>
                <TimeLine time={year} />
            )
        }
            </Wrapper>
        )
    }
});

export default Archives;
