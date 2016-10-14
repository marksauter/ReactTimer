var React = require('react');
var PropTypes = React.PropTypes;
var Clock = require('Clock');
var Controls = require('Controls');

class Timer extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      count: 0,
      timerStatus: 'stopped'
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.state.timerStatus !== prevState.timerStatus) {
      switch (this.state.timerStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({ count: 0 });
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  }
  componentWillUnmount () {
    clearInterval(this.timer);
    this.timer = undefined;
  }
  startTimer () {
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }
  handleStatusChange = (newStatus) => {
    this.setState({ timerStatus: newStatus });
  }
  render () {
    var {count, timerStatus} = this.state;
    return (
      <div>
        <h1 className="page-title">Timer App</h1>
        <Clock totalSeconds={count}/>
        <Controls status={timerStatus} onStatusChange={this.handleStatusChange}/>;
      </div>
    );
  }

}

module.exports = Timer;
