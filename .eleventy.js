const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const CONTENT_GLOBS = {
    work: "src/content/work/*.njk",
}

module.exports = function (config) {

    config.addPassthroughCopy('./src/assets/**/*');
    config.addPlugin(eleventyNavigationPlugin);

    // Collections: Work items
    config.addCollection('work', collection => {
        return collection
            .getFilteredByGlob(CONTENT_GLOBS.work)
            .sort((a, b) => a.data.displayOrder - b.data.displayOrder)
    });

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