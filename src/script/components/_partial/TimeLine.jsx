import React from 'react'

import {ajax, heightTrans} from '../../utils'
import ArticleList from './ArticleList'

export default class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 0,
            toggle: 'none',
            data: []
        }
    }
    componentDidUpdate() {
        heightTrans(this.refs.transEle, 500);
    }
    handleClick(e) {
        //let trans_ele = e.currentTarget.parentNode;
        //this.componentDidUpdate = () => heightTrans(trans_ele, 500);
        this.setState({
            state: this.state.state === 2 ? 2 : 1,
            toggle: this.state.toggle === 'none' ? 'block' : 'none'
        })
        // heightTrans(this.refs.transEle, 500);
        if (this.state.state !== 2) {
            ajax.get('/api/article', {
                'st': new Date(this.props.time, 0, 1).getTime(),
                'et': new Date(this.props.time + 1, 0, 0).getTime()
            }).then(data => {
                this.setState({
                    state: 2,
                    data: data
                });
                console.log(this.refs.transEle);
                // return heightTrans(this.refs.transEle, 500);
            }).catch(e =>
                console.log(e)
            );
        } else {
            // heightTrans(this.refs.transEle, 500);
        }
    }
    render() {
        return (
            <section className="TimeLine" ref="transEle">
                <header onClick={e => this.handleClick(e)}>
                    <span className="mark">{this.state.toggle === 'none' ? '+' : '-'}</span>
                    <h2>
                        {this.props.time}
                    </h2>
                </header>
                <main style={{'display': this.state.toggle}}>
            {
                this.state.state === 2 ? (
                    <ArticleList display='title'>
                        {this.state.data}
                    </ArticleList>
                ) : (
                    <article id="end-list">
                        Loading....
                    </article>
                )
            }
                </main>
            </section>
        )
    }
}
