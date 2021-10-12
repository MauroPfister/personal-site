// Shortcode for embedding vimeo video
const vimeo = function (videoURL, aspectRatio) {
    const url = new URL(videoURL);
    return `
    <div class="video-container-${aspectRatio}">
        <iframe 
            src="${url}&autopause=0&dnt=1" 
            background="0" 
            frameborder="0" 
        ></iframe>
    </div>
    `;
};

// Shortcode for responsive images
const respimg = function (image) {

    return `
    <img 
        src="${image}"
        srcset="${image} 320w, ${image} 800w, ${image} 1200w"
        alt="" loading="lazy"
    ></img>
    `;
};

module.exports = {
    vimeo,
    respimg
};