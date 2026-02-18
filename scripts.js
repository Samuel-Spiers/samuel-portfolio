/*"StAuth10244: I Samuel Spiers, 000731023 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."*/
const svgNS = "http://www.w3.org/2000/svg"; // SVG Reference
const canvas = document.getElementById("canvas"); // Header canvas
let clouds = []; // Array to hold cloud elements

/**
 * Randomly generates 10 clouds to float around the screen. Each cloud is a random size, opacity, and shape from the cloudTypes array.
 * Each cloud is given a random speed.
 */
function createClouds() {
    for (let i = 0; i < 10; i++) {
        cloud = {};
        const cloudSVG = document.createElementNS(svgNS, "g");
        const cloudPath = document.createElementNS(svgNS, "path");
        const randomPath = cloudTypes[Math.floor(Math.random() * cloudTypes.length)];
        cloudPath.setAttribute("d", randomPath);
        cloudPath.setAttribute("fill", `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`);
        cloudSVG.appendChild(cloudPath);
        cloud.position = `${Math.random() * canvas.getBoundingClientRect().width} ${Math.random() * canvas.getBoundingClientRect().height * 0.35}`;
        cloud.scale = `${(5 + Math.random() * 5)} ${(5 + Math.random() * 5)}`;
        cloudSVG.setAttribute("transform", `translate(${cloud.position}) scale(${cloud.scale})`);
        canvas.appendChild(cloudSVG);
        cloud.svg = cloudSVG;
        cloud.moveDir = Math.random() < 0.5 ? -1 : 1; // Random direction
        cloud.speed = 0.1 + Math.random(); // Random speed
        clouds.push(cloud);
    }
}

/**
 * Updates the position of each cloud based on its speed and direction. If a cloud moves off the screen, move it the other direction
 */
function updateClouds() {
    clouds.forEach(cloud => {
        let x = parseFloat(cloud.position.split(" ")[0]);
        let y = parseFloat(cloud.position.split(" ")[1]);
        x += cloud.speed * cloud.moveDir;
        if (x > canvas.getBoundingClientRect().width + 100 || x < -500) {
            cloud.moveDir *= -1;
        }
        cloud.position = `${x} ${y}`;
        cloud.svg.setAttribute("transform", `translate(${cloud.position}) scale(${cloud.scale})`);
    });
}

// Array of cloud path styles
cloudTypes = [
    "M17,8l-.51,0A6,6,0,0,0,12,6a6,6,0,0,0-5.65,4A4,4,0,1,0,6,18H17A5,5,0,0,0,17,8Z",
    "M14 13c1.1 0 2-0.9 2-2s-0.9-2-2-2c0 0-0.1 0-0.1 0 0-0.3 0.1-0.6 0.1-1 0-2.2-1.8-4-4-4-0.8 0-1.5 0.2-2.2 0.6-0.3-0.9-1.2-1.6-2.3-1.6-1.4 0-2.5 1.1-2.5 2.5 0 0.6 0.2 1.1 0.6 1.6-0.2-0.1-0.4-0.1-0.6-0.1-1.7 0-3 1.3-3 3s1.3 3 3 3h11z",
    "M2 13.5C2 17.9 5.667 19 7.5 19h10c1.5 0 4.5-.9 4.5-4.5S19 10 17.5 10c0-1.5-1.5-5-5-5-2.8 0-4.5 2-5 3C5.667 8 2 9.1 2 13.5z",
    "M28.736,9.38c0.155-0.602,0.247-1.229,0.247-1.88c0-4.143-3.357-7.5-7.5-7.5c-3.375,0-6.228,2.229-7.17,5.295C13.429,4.498,12.269,4,10.983,4C8.455,4,6.387,5.883,6.052,8.32C2.648,8.692,0,11.637,0,15.139C0,18.894,3.043,22,6.798,22c3.756,0,14.5,0,18.254,0c3.757,0,6.801-3.106,6.801-6.861C31.853,12.744,30.607,10.6,28.736,9.38z"
]

// Create cloud SVGs on page load
createClouds();
// Update Routine
setInterval( function() {
    updateClouds();
}, 16.6);