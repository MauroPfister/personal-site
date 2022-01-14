BASE_URL_IMG = 'https://res.cloudinary.com/mauropfister/image/upload/'
BASE_URL_VID = 'https://res.cloudinary.com/mauropfister/video/upload/'

// Shortcode for embedding vimeo video
const vimeo = function (videoURL, aspectRatio, title = '') {
    const url = new URL(videoURL)
    return `
    <div class="video-container-${aspectRatio}">
        <iframe 
            src="${url}&autopause=0&dnt=1" 
            background="0" 
            frameborder="0" 
            title="${title}"
        ></iframe>
    </div>
    `
}

function getSrcset(image, widths) {
    return widths
        .map((width) => {
            return `${getSrc(image, width)} ${width}w`
        })
        .join(', ')
}

function getSrc(image, width) {
    return `${BASE_URL_IMG}q_auto,f_auto,w_${width}/${image}`
}

// Shortcode for responsive images using srcset
// TODO: Is this the way to implement named arguments?
const respimg = function (image, options = {}) {
    const loading = options.loading ? options.loading : 'eager'
    const alt = options.alt ? options.alt : ''

    const widths = [320, 640, 960, 1280, 1600]

    return `
    <img 
        src="${getSrc(image, 640)}"
        srcset="${getSrcset(image, widths)}"
        sizes="(min-width: 62em) 50vw, 90vw"
        alt="${alt}" 
        loading="${loading}"
    ></img>
    `
}

// Shortcode for embedded videos
const respvid = function (video) {
    return `
    <video autoplay muted loop playsinline>
        <source src="${BASE_URL_VID}f_mp4/${video}" type="video/mp4">
    </video>
    `
}

/* Shortcode for hero image
   This uses quite an ugly hack to set the background image of the 
   hero image class depending on the screen size. Since inline styles
   do not support media queries, a separate <style> tag is used to 
   implement the resolution switching.
   
   Maybe it would be better to remove the parallax effect (reason for
    using background images) and instead use a regular <img> tag.
*/
const heroimg = function (image) {
    return `
    <style>
        @media (min-width: 62em) {
            .hero-image {
                background-image: url(${getSrc(image, 1300)})
            }
        }
        .hero-image {
            background-image: url(${getSrc(image, 2300)})
        }
    </style>
    <div class="hero-image full-bleed"></div>
    `
}

module.exports = {
    vimeo,
    respimg,
    respvid,
    heroimg,
    getSrc,
}
