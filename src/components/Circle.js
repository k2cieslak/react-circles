import React from 'react';
import PropTypes from 'prop-types';

class CircleComponent extends React.Component {
  static propTypes = {
    positionX : PropTypes.number.isRequired,
    positionY : PropTypes.number.isRequired,
    radius : PropTypes.number.isRequired
  }

  render() {
    return (
          <circle cx={this.props.positionX} cy={this.props.positionY} r={this.props.radius} />
    )
  }
}

export default CircleComponent
