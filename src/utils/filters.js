const MarkdownIt = require('markdown-it');
const { URL } = require("url");

// Filter to render markdown
const markdown = function (content) {
    const md = new MarkdownIt({
        html: true
    });

    return md.render(content);
};

// Filter to prepend site url to relative urls
// Adapted from eleventy-plugin-rss
// @See: https://github.com/11ty/eleventy-plugin-rss/blob/master/src/absoluteUrl.js
// TODO: Get base url directly from "./src/data/site.json" instead of hard coding.
const absoluteURL = function(url) {
    const base = "https://mauropfister.ch";
    try {
        return (new URL(url, base)).toString()
    } catch(e) {
        debug("Trying to convert %o to be an absolute url with base %o and failed, returning: %o (invalid url)", url, base, url)
        return url;
    }
};

// Filter to replace links in markdown with link text.
const removeLinks = function(content) {
    // Check for links [text](url)
    content = content.replace(/(?:\r\n|\r|\n)/g, ' ');
    const elements = content.match(/\[.*?\)/g);
    if ( elements != null && elements.length > 0) {
        for (el of elements) {
            const txt = el.match(/\[(.*?)\]/)[1]; // Get only text
            content = content.replace(el, txt);
        }
    }
    return content;
};


module.exports = {
    markdown,
    absoluteURL,
    removeLinks
}