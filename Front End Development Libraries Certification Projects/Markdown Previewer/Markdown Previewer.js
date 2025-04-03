/* global React, ReactDOM, marked, Prism, document */
function initMarkdownPreviewer () {
  'use strict'

  // Configure the marked library with GitHub-flavoured options
  marked.setOptions({
    breaks: true,
    highlight: function (code) {
      return Prism.highlight(code, Prism.languages.javascript, 'javascript')
    }
  })

  // Create a custom renderer to force links to open in a new tab
  const renderer = new marked.Renderer()
  renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`
  }

  // Default markdown content used to initialise the editor
  const DEFAULT_MARKDOWN = `# Welcome to the HTML Markdown Previewer!

## Sub-heading: HTML Basics

### Inline HTML Example:
Here's some inline HTML: \`<p>This is a paragraph.</p>\`.

### Code Block Example:
\`\`\`html
<!-- This is a multi-line HTML code block -->
<!DOCTYPE html>
<html>
  <head>
    <title>HTML Example</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
\`\`\`

### Styling Text:
You can make text **bold**, _italic_, or **_both!_**.
You can also ~~strike through~~ text.

### Links and Blockquotes:
There's also [links](https://developer.mozilla.org/en-US/docs/Web/HTML), and
> Block Quotes are great for emphasising text.

### Tables:
| Tag         | Description               | Example                  |
| ----------- | ------------------------- | ------------------------ |
| \`<h1>\`    | Defines a heading         | \`<h1>Hello</h1>\`       |
| \`<p>\`     | Defines a paragraph       | \`<p>Text</p>\`          |
| \`<a>\`     | Defines a hyperlink       | \`<a href="#">Link</a>\` |

### Lists:
- Unordered lists are easy to create.
  - You can nest them.
    - Like this.

1. Ordered lists are also supported.
1. Just use numbers.

### Images:
Finally, here's an image:
![HTML Logo](https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg)
`

  class MarkdownPreviewer extends React.Component {
    constructor (props) {
      super(props)
      // Initialise state with default markdown and layout settings
      this.state = {
        markdown: DEFAULT_MARKDOWN,
        editorMaximized: false,
        previewMaximized: false
      }
      // Bind event handlers
      this.handleEditorChange = this.handleEditorChange.bind(this)
      this.toggleEditorMaximize = this.toggleEditorMaximize.bind(this)
      this.togglePreviewMaximize = this.togglePreviewMaximize.bind(this)
    }

    // Update state when the editor content changes
    handleEditorChange (e) {
      this.setState({ markdown: e.target.value })
    }

    // Toggle maximised state for the editor
    toggleEditorMaximize () {
      this.setState({ editorMaximized: !this.state.editorMaximized })
    }

    // Toggle maximised state for the previewer
    togglePreviewMaximize () {
      this.setState({ previewMaximized: !this.state.previewMaximized })
    }

    render () {
      // Determine layout classes based on maximised states
      let layoutClasses
      if (this.state.editorMaximized) {
        layoutClasses = [
          'editorWrap maximized',
          'previewWrap hide',
          'fa fa-compress'
        ]
      } else if (this.state.previewMaximized) {
        layoutClasses = [
          'editorWrap hide',
          'previewWrap maximized',
          'fa fa-compress'
        ]
      } else {
        layoutClasses = ['editorWrap', 'previewWrap', 'fa fa-arrows-alt']
      }

      return React.createElement(
        'div',
        null,
        // Editor Section
        React.createElement(
          'div',
          { className: layoutClasses[0] },
          React.createElement(Toolbar, {
            icon: layoutClasses[2],
            onClick: this.toggleEditorMaximize,
            text: 'Editor'
          }),
          React.createElement('textarea', {
            id: 'editor',
            value: this.state.markdown,
            onChange: this.handleEditorChange
          })
        ),
        // Preview Section
        React.createElement(
          'div',
          { className: layoutClasses[1] },
          React.createElement(Toolbar, {
            icon: layoutClasses[2],
            onClick: this.togglePreviewMaximize,
            text: 'Previewer'
          }),
          React.createElement('div', {
            id: 'preview',
            dangerouslySetInnerHTML: {
              __html: marked(this.state.markdown, { renderer: renderer })
            }
          })
        )
      )
    }
  }

  // Toolbar component for both Editor and Previewer
  const Toolbar = function (props) {
    return React.createElement(
      'div',
      { className: 'toolbar' },
      props.text,
      React.createElement('i', { className: props.icon, onClick: props.onClick })
    )
  }

  // Render the MarkdownPreviewer component into the DOM
  ReactDOM.render(
    React.createElement(MarkdownPreviewer, null),
    document.getElementById('app')
  )
}

initMarkdownPreviewer()
