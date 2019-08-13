import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";

const classNames = require("classnames");



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

> Block Quotes!

You can also make text **bold**... whoa!

Or _italic_.

Or... wait for it... **_both!_**

And feel free to go crazy ~~crossing stuff out~~.


Here is some inline code: \`<p>Some cooooode!</p> \`

1. Number one in numbered list.
1. Number two.
1. Number three...
- Number four.
* Number five.

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

class Previewer extends React.Component {
  state = {
    markDownInput: defaultValue,
    editorExpanded: false,
    previewerExpanded: false
  };

  inputChanger = e => {
    this.setState({ markDownInput: e.target.value });
  };

  setMarkUp = () => {
    let markUp = marked(this.state.markDownInput, { sanitize: true });
    return { __html: markUp };
  };

  expandEditor = () => {
    this.state.editorExpanded === true
      ? this.setState({ editorExpanded: false })
      : this.setState({ editorExpanded: true });
  };

  expandPrivewer = () => {
    this.state.previewerExpanded === true
      ? this.setState({ previewerExpanded: false })
      : this.setState({ previewerExpanded: true });
  };

  render() {
    const { editorExpanded, previewerExpanded, markDownInput } = this.state;
    return (
      <div id="main">
        <div
          id="editorWrap"
          className={
            "wrapper" +
            classNames({
              " editorUnexpanded": !editorExpanded,
              " expanded": editorExpanded,
              " hidden": previewerExpanded
            })
          }
        >
          <div id="header">
            <p>Editor</p>
            <i
              className={classNames({
                "fa fas fa-expand" : !editorExpanded,
                "fa fas fa-compress" : editorExpanded
              })}
              onClick={this.expandEditor}
            />
          </div>
          <textarea
            id="editor"
            rows="20"
            value={markDownInput}
            onChange={this.inputChanger}
          />
        </div>
        <div
          id="previewWrap"
          className={
            "wrapper" +
            classNames({
              " previewerUnexpanded": !previewerExpanded,
              " expanded": previewerExpanded,
              " hidden": editorExpanded
            })
          }
        >
          <div id="header">
            <p>Previewer</p>
            <i
              className={classNames({
                "fa fas fa-expand": !previewerExpanded,
                "fa fas fa-compress": previewerExpanded
              })}
              onClick={this.expandPrivewer}
            />
          </div>
          <div id="preview" dangerouslySetInnerHTML={this.setMarkUp()} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Previewer />, document.querySelector("#content"));
