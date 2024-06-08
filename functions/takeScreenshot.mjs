// const screenshot = require('screenshot-desktop');
// const fs = require('fs');
// const path = require('path');
// const sharp = require('sharp');
// switch above to es module format
import screenshot from 'screenshot-desktop';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function takeScreenshot() {
    screenshot.listDisplays().then((displays) => {
        displays.forEach((display, i) => {
            screenshot({screen: display.id}).then((img) => {
                // Will automatically append location output type
                // Create a timestamp string for the filename
                sharp(img).resize(1280, 720)
                    .toBuffer()
                    .then(resizedImageBuffer => {
                        var date = new Date();
                        var timestamp = date.getFullYear() + "-" +
                            ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
                            ("0" + date.getDate()).slice(-2) + "_" +
                            ("0" + date.getHours()).slice(-2) + "-" +
                            ("0" + date.getMinutes()).slice(-2) + "-" +
                            ("0" + date.getSeconds()).slice(-2);

                        let fileName = `${timestamp}-screenshot-display-${i}.jpg`;
                        let dirName = process.env.SCREENSHOT_DIR || 'pics';
                        let filePath = path.join(dirName, fileName);

                        fs.writeFile(filePath, resizedImageBuffer, (err) => {
                            if (err) {
                                throw err;
                            }
                        });
                    }).catch((err) => {
                    console.error(`Error taking screenshot of display ${i}:`, err);
                });

            });
        });
    })
        .catch((err) => {
            console.error('Error listing displays:', err);
        });
}

