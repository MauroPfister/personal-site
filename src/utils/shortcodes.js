BASE_URL_IMG = "https://res.cloudinary.com/mauropfister/image/upload/"
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

function getSrcset(image, widths) {
    return widths.map(width => {
      return `${getSrc(image, width)} ${width}w`;
    }).join(", ")
};

function getSrc(image, width) {
    return `${BASE_URL_IMG}q_auto,f_auto,w_${width}/${image}`
};

// Shortcode for responsive images using srcset
// TODO: Is this the way to implement named arguments?
const respimg = function (image, options = {}) {

    const loading = options.loading ? options.loading : "eager"
    const alt = options.alt ? options.alt : ""

    const widths = [ 320, 640, 960, 1280, 1600 ];

    return `
    <img 
        src="${getSrc(image, 640)}"
        srcset="${getSrcset(image, widths)}""
        sizes="(min-width: 62em) 50vw, 90vw"
        alt="${alt}" 
        loading="${loading}"
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
        playsinline
    ></video>
    `;
};

module.exports = {
    vimeo,
    respimg,
    respvid
};