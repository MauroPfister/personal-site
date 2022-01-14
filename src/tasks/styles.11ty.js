// This file handles the CSS build.
// It will run Sass and compile all styles defined in the main entry file.
// Heavily inspired by Max Boecks eleventastic starter kit.
// @See: https://github.com/maxboeck/eleventastic

// Main entry point file path
const ENTRY_FILE_PATH = 'src/assets/styles/main.scss'

const sass = require('sass')
const CleanCSS = require('clean-css')
const cssesc = require('cssesc')

// Only minify in production
const isProd = process.env.ELEVENTY_ENV === 'production';

module.exports = class {
    // Define meta data (front matter) for this template,
    data() {
        return {
            permalink: '/assets/styles/main.css',
            eleventyExcludeFromCollections: true,
            entryPath: `${ENTRY_FILE_PATH}`
        }
    }

    // Compile Sass to CSS
    // Embed source map in development
    // Return CSS as a string
    compileSass(file) {
        const options = {sourceMap : !isProd};
        const result = sass.compile(file, options);
        let css = result.css.toString();

        if (!isProd) {
            // Transform source map from object to base64 representation and append to css string
            const sm = JSON.stringify(result.sourceMap);
            const smBase64 = (Buffer.from(sm, 'utf8') || "").toString('base64');
            const smComment = '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,' + smBase64 + ' */';
            css += '\n'.repeat(2) + smComment;
        }
        return css
    }

    // Minify and optimize with CleanCSS in production
    minify(css) {
        const minified = new CleanCSS().minify(css)
        if (!minified.styles) {
            return minified.errors
        }
        return minified.styles
    }

    // Display an error overlay when CSS build fails.
    // This brilliant idea is taken from Mike Riethmuller / Supermaya
    // @see https://github.com/MadeByMike/supermaya/blob/master/site/utils/compile-scss.js
    renderError(error) {
        return `
        /* Error compiling stylesheet */
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }
        html,
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            font-family: monospace;
            font-size: 1.25rem;
            line-height:1.5;
        } 
        body::before { 
            content: ''; 
            background: #000;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            opacity: 0.7;
            position: fixed;
        }
        body::after { 
            content: '${cssesc(error)}'; 
            white-space: pre;
            display: block;
            top: 0; 
            padding: 30px;
            margin: 50px;
            width: calc(100% - 100px);
            color:#721c24;
            background: #f8d7da;
            border: solid 2px red;
            position: fixed;
        }`
    }

    // Render the CSS file
    render({ entryPath }) {
        try {
            let css = this.compileSass(entryPath)
            if (isProd) { css = this.minify(css) }
            return css
        } catch (err) {
            // If things go wrong
            if (isProd) {
                // Throw and abort in production
                throw new Error(err)
            } else {
                // Otherwise display the error overlay
                console.error(err)
                const msg = err.formatted || err.message
                return this.renderError(msg)
            }
        }
    }
}