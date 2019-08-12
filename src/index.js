import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";

const styles = {
  unexpanded: {
    editorHeight: "300px",
    editorWidth: "500px",
    previewerHeight: "250px",
    previewerWidth: "1000px",
    icon: "fa fas fa-arrows-alt"
  },

  expanded: {
    editorHeight: "90%",
    editorWidth: "90%",
    previewerHeight: "90%",
    previewerWidth: "90%",
    icon: "fa fas fa-compress"
  }
};

const defaultValue = `
# Hello FreeCodeCamp!
## Hello World!
Some link to [myTwitter]('https://twitter.com/zero_hesitance')
\`\`\`
// this is multi-line code:

if(sd() === true) {
  sad().stop();
  beAwesome();
}
function 
\`\`\`

Here is some inline code: \`<p>Some cooooode!</p> \`

1. Number one in numbered list.
1. Number two.
1. Number three...
- Number four.
* Number five.


`;

class Previewer extends React.Component {
  state = {
    markDownInput: defaultValue,
    style: styles.unexpanded,
    displayEditor: "",
    displayPreviewer: ""
  };

  inputChanger = e => {
    this.setState({ markDownInput: e.target.value });
  };

  setMarkUp = () => {
    let markUp = marked(this.state.markDownInput, { sanitize: true });
    return { __html: markUp };
  };

  expandEditor = () => {
    this.state.style === styles.expanded
      ? this.setState({ style: styles.unexpanded, displayPreviewer: "block" })
      : this.setState({ style: styles.expanded, displayPreviewer: "none" });
  };

  expandPrivewer = () => {
    this.state.style === styles.expanded
      ? this.setState({ style: styles.unexpanded, displayEditor: "block" })
      : this.setState({ style: styles.expanded, displayEditor: "none" });
  };

  render() {
    const {
      editorHeight,
      editorWidth,
      previewerHeight,
      previewerWidth,
      icon
    } = this.state.style;
    return (
      <div id="main">
        <div
          id="editorWrap"
          className="wrapper"
          style={{
            height: editorHeight,
            width: editorWidth,
            display: this.state.displayEditor
          }}
        >
          <div id="header">
            <p>Editor</p>
            <i className={icon} onClick={this.expandEditor} />
          </div>
          <textarea
            id="editor"
            rows="20"
            value={this.state.markDownInput}
            onChange={this.inputChanger}
          />
        </div>
        <div
          id="previewWrap"
          className="wrapper"
          style={{
            minHeight: previewerHeight,
            width: previewerWidth,
            display: this.state.displayPreviewer
          }}
        >
          <div id="header">
            <p>Previewer</p>
            <i className={icon} onClick={this.expandPrivewer} />
          </div>
          <div id="previewer" dangerouslySetInnerHTML={this.setMarkUp()} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Previewer />, document.querySelector("#content"));
