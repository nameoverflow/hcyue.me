import React from 'react'
import {ajax} from '../utils'
import TimeLine from './_partial/TimeLine'
import Wrapper from './_partial/Wrapper'

import 'Archives.sass'
export default class Archives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            years: [],
            show: false
        };
    }
    componentDidMount() {
        this.loadTimeLine()
        .then(() => this.setState({show: true}));
    }
    loadTimeLine() {
        return ajax.get('/api/time').then(data =>
            this.setState({
                years: data
            })
            // console.log(data);
        ).catch(e => console.log(e));
    }
    render() {
        const line = this.state.years.map(time => <TimeLine time={time} key={time}/>);
        return (
            <Wrapper show={this.state.show}>
                { line }
                Fuck GFW
            </Wrapper>
        )
    }
}
