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
    async data() {
        return {
            permalink: '/assets/styles/main.css',
            eleventyExcludeFromCollections: true,
            entryPath: `${ENTRY_FILE_PATH}`
        }
    }

    // Compile Sass to CSS
    // Embed source map in development
    // Return CSS as a string
    async compileSass(options) {
        return new Promise((resolve, reject) => {
            if (!isProd) {
                options.sourceMap = "out.map",
                options.sourceMapEmbed = true
            }
            const callback = (error, result) => {
                if (error) reject(error)
                else resolve(result.css.toString())
            }
            return sass.render(options, callback)
        })
    }

    // Minify and optimize with CleanCSS in production
    async minify(css) {
        return new Promise((resolve, reject) => {
            if (!isProd) {
                resolve(css)
            }
            const minified = new CleanCSS().minify(css)
            if (!minified.styles) {
                return reject(minified.error)
            }
            resolve(minified.styles)
        })
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
    async render({ entryPath }) {
        try {
            const css = await this.compileSass({ file: entryPath })
            const result = await this.minify(css)
            return result
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