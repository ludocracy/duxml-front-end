import React, { Component } from 'react';
import '../css/Editor.css';
import Designer from './designer/Designer';
import objects from '../objects.json';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      objects: objects,
      buttonColor: "#FF90B3"
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._extractParams = this._extractParams.bind(this);
    this._updateParams = this._updateParams.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();

    let svg = document.querySelector('.designer-container>svg').outerHTML;
    this.props._handleSubmit(svg);
  }

  _extractParams() {
    let params = {};
    // let macroRegex = /@\(.+\)/g;
    let macroRegex = /@\(.+/g;
    let paramRegex = /(?:(?!true|false))\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
    this.state.objects.forEach(obj => {
      for (let key in obj) {
        let macroMatch;
        do { // iterate through macro string matches
          macroMatch = macroRegex.exec(obj[key]);
          if (macroMatch) {
            let paramMatch;
            do { // iterate through param matches within this macro string
              paramMatch = paramRegex.exec(macroMatch[0]);
              if (paramMatch) {
                params[paramMatch[0]] = null;
              }
            } while (paramMatch)
          }
        } while (macroMatch);
      }
    });

    return params;
  }

  componentDidMount() {
    this._updateParams();
  }

  _handleChange(objects) {
    this.setState({
      objects: objects
    });
    this._updateParams();
  }

  _updateParams() {
    let newParams = this._extractParams();
    this.props._handleParamsChange(newParams);
  }

  render() {
    return (
      <div className="Editor">
        <form onSubmit={this._handleSubmit}>
          <h2>Input SVG. Wrap logical expressions in @(...)</h2>
          <Designer width={350} height={400} objects={this.state.objects}
          onUpdate={this._handleChange} />
          <button type="submit"
            onMouseDown={e => this.setState({buttonColor: '#EF7A85'})}
            onMouseUp={e => this.setState({buttonColor: '#FFC2E2'})}
            onMouseEnter={e => this.setState({buttonColor: '#FFC2E2'})}
            onMouseLeave={e => this.setState({buttonColor: '#FF90B3'})}
            style={{backgroundColor: this.state.buttonColor}}>Render SVG</button>
        </form>
      </div>
    );
  }
}

export default Editor;
