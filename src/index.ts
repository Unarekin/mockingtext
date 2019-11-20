#!/usr/bin/env node

import { default as mock } from './mocker';
import { createCanvas, loadImage, Image } from 'canvas';

import * as clipboardy from 'clipboardy';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const writeFile = util.promisify(fs.writeFile);

const template_path: string = path.join(__dirname, 'template.jpg');

const argv = require('yargs')
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

const inputText: string = argv['_'].join(' ');
const mockedText: string = mock(inputText);

console.log(mockedText);

if (argv.c) {
  clipboardy.writeSync(mockedText);
  console.log("Copied to clipboard.");
}

if (argv.o) {
  loadImage(template_path)
    .then((img) => {
      let canvas = createCanvas(img.width, img.height);
      let ctx = canvas.getContext('2d');
      
      let center: number = img.width / 2;
      let fontSize: number = 256;
      let font = fontSize + "px Impact";


      ctx.drawImage(img, 0, 0);
      ctx.font = font;
      
      // let yOffset = img.height - 10// - (fontSize * 1.1);
      let yOffset: number = 5 + (fontSize * 1.1);

      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#000";
      ctx.textAlign = "center";
      ctx.lineWidth = 5;
      ctx.fillText(mockedText, center, yOffset, img.width - 10);
      ctx.strokeText(mockedText, center, yOffset, img.width - 10);
      

      let buf = canvas.toBuffer();
      return writeFile(argv.o, buf);
    })
    .then(() => {
      console.log(`Saved to ${argv.o}.`);
    })
    .catch(console.error)
    ;
}
