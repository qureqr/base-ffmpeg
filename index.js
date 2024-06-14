const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const path = require('path');

// Установим путь к ffmpeg
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputFilePath = '1.mp4';  // Входной видео файл
const outputFilePath = 'output.mp3'; // Выходной аудио файл

ffmpeg(inputFilePath)
    .setStartTime('00:00:02') // Установка времени начала обрезки
    .outputOptions([
        '-vn',              // Отключение видео
        '-acodec libmp3lame', // Установка кодека для аудио
        '-q:a 0'            // Установка качества аудио (значение 0-9, где 0 - наилучшее качество)
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
