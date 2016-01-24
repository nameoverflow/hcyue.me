import React from 'react'

import {ajax, heightTrans} from '../../utils'
import ArticleList from './ArticleList'

export default class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 0,
            toggle: 0,
            animate: 0,
            data: []
        }
    }
    /*componentDidUpdate() {
        heightTrans(this.refs.transEle, 500);
    }*/
    handleClick(e) {
        //let trans_ele = e.currentTarget.parentNode;
        //this.componentDidUpdate = () => heightTrans(trans_ele, 500);
        this.setState({
            state: this.state.state || 1,
            toggle: +!this.state.toggle,
            animate: +!this.state.toggle
        }, () => {
            heightTrans(this.refs.transEle, this.state.toggle ? 500 : 0);
            this.setState({animate: this.state.toggle ? 2 : 0});
        });
        // 
        if (this.state.state !== 2) {
            ajax.get('/api/article', {
                'st': new Date(this.props.time, 0, 1).getTime(),
                'et': new Date(this.props.time + 1, 0, 0).getTime()
            }).then(data => {
                this.setState({
                    state: 2,
                    data: data
                });
                // console.log(this.refs.transEle);
                return heightTrans(this.refs.transEle, 500);
            }).catch(e =>
                console.log(e)
            );
        }
    }
    render() {
        const content = this.state.state === 2 ? 
                        <ArticleList display='title'>
                            {this.state.data}
                        </ArticleList>
                        :
                        <article id="end-list">
                            Loading....
                        </article>

        return (
            <section className="TimeLine" ref="transEle">
                <header onClick={e => this.handleClick(e)}>
                    <span className={this.state.toggle ? "mark mark-active" : "mark"}>+</span>
                    <h2>
                        {this.props.time}
                    </h2>
                </header>
                <main className={['hidden', 'active', 'show'][this.state.animate]}>
                    {content}
                </main>
            </section>
        )
    }
}
