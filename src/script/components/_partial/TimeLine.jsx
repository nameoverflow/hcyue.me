import {ajax, heightTrans} from '../../utils'
import ArticleList from './ArticleList'

var TimeLine = React.createClass({
    getInitialState() {
        return {
            state: 'close',
            toggle: 'none',
            data: []
        }
    },
    handleClick(e) {
        let trans_ele = e.currentTarget.parentNode;
        this.componentDidUpdate = () =>
            heightTrans(trans_ele, 500)
        this.setState({
            state: this.state.state === 'loaded' ? 'loaded' : 'loading',
            toggle: this.state.toggle === 'none' ? 'block' : 'none'
        })
        //heightTrans(trans_ele);
        if (this.state.state !== 'loaded') {
            ajax.get('/api/article', {
                'st': new Date(this.props.time, 0, 1).getTime(),
                'et': new Date(this.props.time + 1, 0, 0).getTime()
            }).then(data => {
                this.setState({
                    state: 'loaded',
                    data: data
                });
                //heightTrans(trans_ele, 1500);
            }).catch(e =>
                console.log(e)
            );
        }
    },
    render() {
        return (
            <section className="TimeLine">
                <header onClick={this.handleClick}>
                    <h2>
                        {this.props.time}
                    </h2>
                </header>
                <main style={{'display': this.state.toggle}}>
            {
                this.state.state === 'loaded' ? (
                    <ArticleList display='title'>
                        {this.state.data}
                    </ArticleList>
                ) : 'Loading...'
            }
                </main>
            </section>
        )
    }
})

export default TimeLine;
