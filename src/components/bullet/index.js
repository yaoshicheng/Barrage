import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import './index.css'

class Bullet extends React.Component {
  constructor(props) {
    super(props);
    const { height, lineNumber } = props;
    const splitHeight = isNaN(Number(height/lineNumber))? Number(height/lineNumber):30;
    this.state = {
      word: '',
      index: 0,
      top: 3,
      splitHeight,
    };
    this.bullet_inner_container = {
      position: 'relative',
      height: '100%',
    };
    this.bullet_container = {
      width: '90vw',
      height: '60px',
      background: 'rgba(141,48,3,0.55)',
      overflow: 'hidden',
      borderRadius: '15px',
    };
  }

  componentDidMount() {
    const { lineNumber, height, msg } = this.props;
    const { index, top } = this.state;
    const splitHeight = height/lineNumber;
    if (top <= height-splitHeight) {
      this.setState({ top: top + splitHeight });
    } else if (top > height-splitHeight) {
      this.setState({ top: 3 });
    }
    this.setState({
      splitHeight, top, word: msg, index: index + 1
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { height } = this.props;
    const { msg } = nextProps;
    const { index, top, splitHeight } = this.state;
    this.setState({ word: msg, index: index + 1 });
    if (top <= height-splitHeight) {
      this.setState({ top: top + splitHeight });
    } else if (top > height-splitHeight) {
      this.setState({ top: 3 });
    }
  }

  getSpeedTime = (speed) => {
    let enter = 'bullet-enter-normal';
    switch (speed) {
      case 'normal':
        enter = 'bullet-enter-normal';
        break;
      case 'fast':
        enter = 'bullet-enter-fast';
        break;
      case 'slow':
        enter = 'bullet-enter-slow';
        break;
      default:
        enter = 'bullet-enter-normal';
        break;
    }
    return enter;
  };

  render() {
    const { customStyle, speed, height } = this.props;
    const { word, index, top } = this.state;
    const bullet_container_style =  { ...this.bullet_container, height: `${height}px`, ...customStyle};
    const enter = this.getSpeedTime(speed);
    const item = (
      <div className="bullet" key={index} style={{ top: `${top}px`, color: '#fff' }}>
        {word}
      </div>
    );

    return (
      <div style={bullet_container_style}>
        <div style={this.bullet_inner_container}>
          <ReactCSSTransitionGroup
            transitionName={{enter: enter,}}
            transitionEnterTimeout={6000}
            transitionLeave={false}
          >
            {item}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default Bullet;

Bullet.propTypes = {
  msg: PropTypes.string,
  customStyle: PropTypes.object,
  speed: PropTypes.string,
  lineNumber: PropTypes.number,
  height: PropTypes.number,
};

Bullet.defaultProps = {
  msg: '',
  customStyle: {},
  speed: 'normal',
  lineNumber: 2,
  height: 90,
};

