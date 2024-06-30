const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const path = require('path');

// Установим путь к ffmpeg
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputFilePath = 'input.mov';  // Входной видео файл в формате MOV
const outputFilePath = 'output.mov'; // Выходной сжатый видео файл в формате MOV

ffmpeg(inputFilePath)
    .videoCodec('libx264') // Кодек для видео
    .audioCodec('aac') // Кодек для аудио
    .outputOptions([
        '-crf 14', // Установка качества сжатия (чем выше значение, тем хуже качество и меньше размер файла)
        '-preset fast', // Установка скорости сжатия (можно выбрать между ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow)
        '-movflags +faststart', // Оптимизация для веб
        '-vf scale=-2:1080' // Изменение разрешения видео (например, 720p)
    ])
    .on('start', (commandLine) => {
        console.log('Started: ' + commandLine);
    })
    .on('progress', (progress) => {
        if (progress.percent) {
            console.log(`Processing: ${progress.percent.toFixed(2)}% done`);
        } else {
            console.log('Processing: in progress...');
        }
    })
    .on('end', () => {
        console.log('Processing finished!');
    })
    .on('error', (err, stdout, stderr) => {
        console.error('Error: ' + err.message);
        console.error('ffmpeg output:\n' + stdout);
        console.error('ffmpeg stderr:\n' + stderr);
    })
    .on('stderr', (stderrLine) => {
        console.error('Stderr output: ' + stderrLine);
    })
    .on('stdout', (stdoutLine) => {
        console.log('Stdout output: ' + stdoutLine);
    })
    .save(outputFilePath);

// Проверка наличия входного файла
const fs = require('fs');
fs.access(inputFilePath, fs.constants.F_OK, (err) => {
    if (err) {
        console.error(`${inputFilePath} does not exist.`);
    } else {
        console.log(`${inputFilePath} exists.`);
    }
});
