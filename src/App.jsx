/* eslint-disable react/jsx-indent */
import * as React from 'react';
import Users from './components/user';
import Home from './components/home';

class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
		return (
			<div className="App">
				<div className="App-header">
					<h2>Welcome to React</h2>
					<Home />
					<Users />
				</div>
			</div>
		);
	}
}

export default App;
