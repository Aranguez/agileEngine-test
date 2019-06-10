import React, { Component } from 'react';

import { TEXT_STYLES, COLORS } from '../constants/changeStyles';
import getMockText from '../text.service';

import ControlPanel from "../control-panel/ControlPanel";
import SynonymsList from '../synonyms-list';
import './Editor.css';

class Editor extends Component {

	richTextField; // store the richTextField iframe element

	constructor() {
		super();
		this.state = {
			synonyms: [],
		}
	}

	componentDidMount() {
		this.richTextField = window.richTextField.contentDocument;
		this.richTextField.designMode = "On";
		this.richTextField.addEventListener('selectionchange', this.onHandleSelectionChange);
		this.getText();
		window.richTextField.focus();
	}

	/**
	 * @param commandName:string
	 * @param showDefaultUI:boolean = false
	 * @param valueArgument:string = null
	 * @description execute a command in the Editor that changes the properties of the text
	 */
	execCmd = (commandName, showDefaultUI=false, valueArgument=null) => {
		this.richTextField.execCommand(commandName, showDefaultUI, valueArgument)
	}

	/**
	 * @description
	 * Each time a text is selected from Editor, get synonyms
	 */
	onHandleSelectionChange = () => {
		const selectedText = this.richTextField.getSelection().toString();
		this.getSynonyms(selectedText);
	}

	/**
	 * @description
	 * Get the mocked text from a service
	 */
	getText() {
		getMockText()
			.then((result) => {
					this.execCmd('insertText', false, result);
			})
			.catch(err => console.error(err));
	}
	/**
	 * @param word:string
	 * @description
	 * After a word is selected from the editor,
	 * returns 10 synonyms of that word
	 */
	getSynonyms = (word) => {
		if (word.length < 20) {
			fetch(`https://api.datamuse.com/words?ml=${word}`)
				.then(res => res.json())
				.then(synonyms => { this.setState({ synonyms }) })
				.catch(err => console.error(err));
		}
	}
	/**
	 * @param word:string selected word from synonyms list
	 * @description replace selected text from the editor
	 * with its synonym keeping the styles of the text
	 */
	insertHTML = (word) => {
		let wordToInsert = word;

		if (this.richTextField.queryCommandState("bold")) {
			wordToInsert = `<b>${wordToInsert}</b>`;
		}
		if (this.richTextField.queryCommandState("italic")) {
			wordToInsert = `<i>${wordToInsert}</i>`;
		}
		if (this.richTextField.queryCommandState("underline")) {
			wordToInsert = `<u>${wordToInsert}</u>`;
		}

		this.execCmd('insertHTML', false, wordToInsert);
	}
    
	render() {
		return (
			<div className="editor container">
				<div className="flex">
					<div>
						<ControlPanel
							textStyles={TEXT_STYLES}
							colors={COLORS}
							execCmd={this.execCmd} />
						<iframe
							id="richTextField"
							title="richTextField">
						</iframe>
					</div>
					<SynonymsList
						synonyms={this.state.synonyms}
						insertHTML={this.insertHTML}/>
				</div>
			</div>
		);
	}
}

export default Editor;