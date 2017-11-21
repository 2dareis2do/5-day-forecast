import React from 'react';

const footerStyle = {
  clear: 'both'
}

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <a href="/">
            <h1 className="Logo">ACME 5 day Weather Widget</h1>
          </a>
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
