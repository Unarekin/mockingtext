#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mocker_1 = require("./mocker");
var canvas_1 = require("canvas");
var clipboardy = require("clipboardy");
var fs = require("fs");
var path = require("path");
var util = require("util");
var writeFile = util.promisify(fs.writeFile);
var template_path = path.join(__dirname, 'template.jpg');
var argv = require('yargs')
    .option('out', {
    alias: 'o',
    description: 'Where to save an image.',
    type: 'string'
})
    .option('clipboard', {
    alias: 'c',
    description: 'Copy generated text to the clipboard.',
    type: 'boolean'
})
    .argv;
var inputText = argv['_'].join(' ');
var mockedText = mocker_1.default(inputText);
console.log(mockedText);
if (argv.c) {
    clipboardy.writeSync(mockedText);
    console.log("Copied to clipboard.");
}
if (argv.o) {
    canvas_1.loadImage(template_path)
        .then(function (img) {
        var canvas = canvas_1.createCanvas(img.width, img.height);
        var ctx = canvas.getContext('2d');
        var center = img.width / 2;
        var fontSize = 256;
        var font = fontSize + "px Impact";
        ctx.drawImage(img, 0, 0);
        ctx.font = font;
        // let yOffset = img.height - 10// - (fontSize * 1.1);
        var yOffset = 5 + (fontSize * 1.1);
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#000";
        ctx.textAlign = "center";
        ctx.lineWidth = 5;
        ctx.fillText(mockedText, center, yOffset, img.width - 10);
        ctx.strokeText(mockedText, center, yOffset, img.width - 10);
        var buf = canvas.toBuffer();
        return writeFile(argv.o, buf);
    })
        .then(function () {
        console.log("Saved to " + argv.o + ".");
    })
        .catch(console.error);
}
//# sourceMappingURL=index.js.map