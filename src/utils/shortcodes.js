// Shortcode for embedding vimeo video
const vimeo = function (videoURL, aspectRatio, title = '') {
    const url = new URL(videoURL);
    return `
    <div class="video-container-${aspectRatio}">
        <iframe 
            src="${url}&autopause=0&dnt=1" 
            background="0" 
            frameborder="0" 
            title="${title}"
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

// Shortcode for embedded videos
const respvid = function (video) {
    // https://arxiv.org/pdf/2105.12797.pdf
    return `
    <video
        src="${video}"
        autoplay
        muted
        loop
    ></video>
    `;
};

module.exports = {
    vimeo,
    respimg,
    respvid
};