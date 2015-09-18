'use strict';

import React from 'react';

export default React.createClass({

  displayName: __filename,

  initialState: { col: 4 },

  // DOM events

  onClickFoo () {
    this.setState({ col: (this.state.col + 1) % 5 });
    this.forceUpdate();
  },

  // render

  render () {
    return (
      <div className={'mdl-cell mdl-cell--' + (this.state.col + 1) + '-col block'} onClick={this.onClickFoo}>
        <h4>Articles: {this.props.text}</h4>
      </div>
    );
  }
});
