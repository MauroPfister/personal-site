// Shortcode for embedding vimeo video
const vimeo = function (videoURL) {
    const url = new URL(videoURL);
    return `
    <div style="position:relative;" class="video-sq">
        <iframe 
            src="${url}&autopause=0&dnt=1" 
            background="0" 
            frameborder="0" 
            style="position:absolute;top:0;left:0;width:100%;height:100%;" 
        ></iframe>
    </div>
    `;
};

// Shortcode for responsive images
const respimg = function (image) {

    return `
    <img 
        src="${image}"
        srcset="${image} 320w, ${image}.jpg 800w, ${image} 1200w"
        alt="" loading="lazy"
    ></img>
    `;
};

module.exports = {
    vimeo,
    respimg
};