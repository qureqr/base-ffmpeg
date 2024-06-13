const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const path = require('path');

// Установим путь к ffmpeg
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputFilePath = 'editshaheed.mp4';  // Входной видео файл
const outputFilePath = 'output.mp4'; // Выходной видео файл

ffmpeg(inputFilePath)
    .outputOptions([
        '-vcodec libx264',  // Установка кодека для видео
        '-crf 28',          // Установка коэффициента сжатия (значение 0-51, где 0 - наилучшее качество, 51 - наихудшее)
        '-preset fast'      // Установка предустановки сжатия (ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow)
    ])
    .on('start', (commandLine) => {
        console.log('Started: ' + commandLine);
    })
    .on('progress', (progress) => {
        console.log('Processing: ' + progress.percent + '% done');
    })
    .on('end', () => {
        console.log('Processing finished!');
    })
    .on('error', (err, stdout, stderr) => {
        console.log('Error: ' + err.message);
        console.log('ffmpeg output:\n' + stdout);
        console.log('ffmpeg stderr:\n' + stderr);
    })
    .save(outputFilePath);
