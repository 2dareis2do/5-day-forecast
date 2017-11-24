import React from 'react';

const footerStyle = {
  clear: 'both'
}

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer style={footerStyle}>
          <p>
            React Demo.
          </p>
        </footer>
      </div>
    );
  }
}
