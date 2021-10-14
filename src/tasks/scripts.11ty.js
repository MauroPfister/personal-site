// This file handles the js bundling.
// It will run esbuild and bundle all scripts into one main script

// Main entry point file path
const ENTRY_FILE_PATH = 'src/assets/scripts/main.js'

const isProd = false

module.exports = class {
    data() {
        return {
            layout: '',
            entryPath: `${ENTRY_FILE_PATH}`,
            permalink: 'assets/scripts/main.js',
            eleventyExcludeFromCollections: true,
        };
    }
  
    async render(data) {
        //@See: https://esbuild.github.io/getting-started/#build-scripts */
        let result = (await require('esbuild')
        .build({
            entryPoints: [ data.entryPath ],
            bundle: true,
            minify: isProd ? true : false,
            sourcemap: isProd ? false : true,
            target: isProd ? 'es6' : 'esnext',
            write: false
        })).outputFiles[0].text

        return result
    }
};