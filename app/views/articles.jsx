'use strict';

import React from 'react';

export default React.createClass({

  displayName: __filename,

  initialState: { col: 4 },

  render () {
    console.log(this.state.col);
    return (
      <div className={'mdl-cell mdl-cell--' + (this.state.col + 1) + '-col block'} onClick={this.onClickFoo}>
        <h4>Articles: {this.props.text}</h4>
      </div>
    );
  },

  onClickFoo () {
    this.setState({ col: (this.state.col + 1) % 5 });
    this.forceUpdate();
  }
});
