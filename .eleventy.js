const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const shortcodes = require('./src/utils/shortcodes.js');
const filters = require('./src/utils/filters.js');

const CONTENT_GLOBS = {
    work: "src/content/work/*.njk",
}

module.exports = function (config) {

    // Plugins
    config.addPlugin(eleventyNavigationPlugin);

    // Shortcodes
    config.addShortcode('vimeo', shortcodes.vimeo);
    config.addShortcode('respimg', shortcodes.respimg);
    config.addShortcode('respvid', shortcodes.respvid);
    config.addShortcode('heroimg', shortcodes.heroimg);
    
    // Filters
    config.addFilter('markdown', filters.markdown);
    config.addFilter('absoluteURL', filters.absoluteURL);
    config.addFilter('removeLinks', filters.removeLinks);
    config.addFilter('sortByName', filters.sortByName);

    // Pass-through files
    config.addPassthroughCopy('src/assets/images/**/*');
    config.addPassthroughCopy('src/assets/fonts/**/*');
    config.addPassthroughCopy({ 'src/content/site.webmanifest': 'site.webmanifest' });

    // Asset Watch Targets
    config.addWatchTarget('./src/assets');

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