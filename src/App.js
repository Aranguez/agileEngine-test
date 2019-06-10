import React, {Component} from 'react';
import './App.css';

import Editor from "./file-zone/Editor";

class App extends Component {

	render() {
		return (
			<div className="App">
				<header>
					<div className="container">
						<span>Simple Text Editor</span>
					</div>
				</header>
				<main>
					<Editor/>
				</main>
			</div>
		);
	}
}

export default App;
