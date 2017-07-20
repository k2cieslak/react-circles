require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Circle from './Circle';

class AppComponent extends React.Component {

  constructor() {
    super()
    this.state =
      JSON.parse(localStorage.getItem('app-state'))
        ||
       {
        itemArray: [],
        positionX : '',
        positionY : '',
        radius : ''
      }
  }

  createCircle(event) {
    event.preventDefault()
    if(this.state.positionX !== '' && this.state.positionY !== '' && this.state.radius !== '') {
      if (this.state.itemArray.length < 5) {
        let newSumOfRadius = 2 * this.state.radius
        this.state.itemArray.forEach(function (item) {
          newSumOfRadius += 2 * item.radius
        })
        if (newSumOfRadius < window.innerWidth) {
          this.state.itemArray.push({
            positionX: parseInt(this.state.positionX),
            positionY: parseInt(this.state.positionY),
            radius: parseInt(this.state.radius)
          })

          this.setState({
            itemArray: this.state.itemArray,
            positionX: this.state.positionX,
            positionY: this.state.positionY,
            radius: this.state.radius
          })
        } else {
          alert('Sorry, maximum diameter of all circles should not be greater than window width.')
        }
      } else {
        alert('Sorry, maximum 5 circles allowed.')
      }

      localStorage.setItem('app-state', JSON.stringify(this.state))
    } else {
      alert('Please enter all data.')
    }
  }

  handleXChange(event) {
    this.setState({
      itemArray : this.state.itemArray,
      positionX : event.target.value,
      positionY : this.state.positionY,
      radius : this.state.radius
    })
  }

  handleYChange(event) {
    this.setState({
      itemArray: this.state.itemArray,
      positionX: this.state.positionX,
      positionY: event.target.value,
      radius: this.state.radius
    })
  }

  handleRadiusChange(event) {
    this.setState({
      itemArray : this.state.itemArray,
      positionX : this.state.positionX,
      positionY : this.state.positionY,
      radius : event.target.value
    })
  }

  render() {
    return (
      <div className="app">
       <form onSubmit={this.createCircle.bind(this)}>
          <input type="text" name="positionX" value={this.state.positionX} onChange={this.handleXChange.bind(this)} pattern="[0-9]{1,}" placeholder="X position" />
          <input type="text" name="positionY" value={this.state.positionY} onChange={this.handleYChange.bind(this)} pattern="[0-9]+" placeholder="Y position" />
          <input type="text" name="radius" value={this.state.radius} onChange={this.handleRadiusChange.bind(this)} pattern="[0-9]+" placeholder="radius" />
          <input type="submit" value="New circle" />
        </form>
        <svg className="item-fixed">
          {this.state.itemArray.map((item, index) => {
            return (
              <Circle key={index} positionX={item.positionX} positionY={item.positionY}  radius={item.radius} />
            )
          })}
        </svg>
    </div>

    )
  }
}

AppComponent.defaultProps = {
}

export default AppComponent
