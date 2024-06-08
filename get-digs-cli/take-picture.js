const NodeWebcam = require("node-webcam");

console.log("trying to take picture");

// Default options
var opts = {
    // Picture related
    width: 1280,
    height: 720,
    quality: 100,

    // Delay to take shot
    delay: 0,

    // Save shots in memory
    saveShots: true,

    // [jpeg, png] support varies
    // Webcam.OutputTypes
    output: "jpeg",

    // Which camera to use
    // Use Webcam.list() for results
    // false for default device
    device: false,

    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
    callbackReturn: "location",

    // Logging
    verbose: false
};

// Creates webcam instance
var Webcam = NodeWebcam.create(opts);
console.log("Got webcam? : ");
if (Webcam) {
	console.log("YES!");
}	
// Will automatically append location output type
// Create a timestamp string for the filename
var date = new Date();
var timestamp = date.getFullYear() + "-" +
                ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
                ("0" + date.getDate()).slice(-2) + "_" +
                ("0" + date.getHours()).slice(-2) + "-" +
                ("0" + date.getMinutes()).slice(-2) + "-" +
                ("0" + date.getSeconds()).slice(-2);

Webcam.capture('pics/' + timestamp + "-image", function( err, data ) {
    if (!err) {
        console.log("Image saved to:", data);
    } else {
        console.error("Error capturing image:", err);
    }
});

