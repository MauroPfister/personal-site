const MarkdownIt = require('markdown-it');

// Filter to render markdown
    const markdown = function (content) {
    const md = new MarkdownIt({
        html: true
    });

    return md.render(content);
};

module.exports = {
    markdown
}