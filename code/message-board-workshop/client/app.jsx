// Browser Code

const React = require('react')
const ReactDOM = require('react-dom')

const Header = require('../components/header.jsx')
const Footer = require('../components/footer.jsx')
const MessageBoard = require('../components/board.jsx')

ReactDOM.render(<Header />, document.getElementById('header'))
ReactDOM.render(<Footer />, document.getElementById('footer'))
// TODO: Pass data to MessageBoard
ReactDOM.render(<MessageBoard messages={[]}/>, document.getElementById('message-board'))
