const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const shortcodes = require('./src/utils/shortcodes.js')

const CONTENT_GLOBS = {
    work: "src/content/work/*.njk",
}

module.exports = function (config) {

    // Plugins
    config.addPlugin(eleventyNavigationPlugin);

    // Shortcodes
    config.addShortcode('vimeo', shortcodes.vimeo)
    config.addShortcode('respimg', shortcodes.respimg)

    // Pass-through files
    config.addPassthroughCopy('./src/assets/**/*');

    // Collections: Work items
    config.addCollection('work', collection => {
        return collection
            .getFilteredByGlob(CONTENT_GLOBS.work)
            .sort((a, b) => a.data.displayOrder - b.data.displayOrder)
    });

    // Base config
    return {
        dir: {
            input: "src",
            output: "dist",
            includes: 'includes',
            layouts: 'layouts',
            data: 'data'
        }
    };
}