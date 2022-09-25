const ytdl = require('ytdl-core');
const ytpl = require("ytpl");
const ffmpeg = require('fluent-ffmpeg');
const FileSystemHelper = require('./fileSystemHelper')

module.exports = class Downloader {
    constructor(settings) {
        this.settings = settings;
    }

    validateUrl(songUrl) {
        return ytdl.validateURL(songUrl)
    }

    async getSongTitle(songUrl) {
        return await ytdl.getInfo(songUrl).then(res => {
            return res.videoDetails.title;
        });

    }

    async downloadSong(songUrl, title, playlist) {
        let stream = ytdl(songUrl,
            {
                quality: 'highestaudio',
            });

        let pathToSaveAt = playlist ? `./downloads/${playlist}` : `./downloads`;

        const fileSystem = new FileSystemHelper(pathToSaveAt);
        if (!fileSystem.validatePath()) {
            console.log(pathToSaveAt + ' - does not exist. Creating folder');
            fileSystem.createDirectory();
        }

        pathToSaveAt += `/${title} (${this.settings.audioBitRate}).mp3`;

        ffmpeg(stream)
            .audioBitrate(this.settings.audioBitRate)
            .save(pathToSaveAt)
            .on('end', () => {
                console.log('Downloaded: ' + title);
            });
    }

    async getListOfSongsFromPlaylist(playlistUrl) {
        console.log(playlistUrl)
        let playlist = await ytpl(playlistUrl, {limit: this.settings.limit});

        playlist.items = playlist.items.filter(song => song.isPlayable === true).map(song => {
                const title = (song.title.includes(song.author.name)) ? song.title : song.author.name + ' - ' + song.title;

                return {
                    id: song.id,
                    title: title,
                    duration: song.duration
                }
            }
        )

        return playlist;
    }

    getDownloadInfo() {
        return `Downloading ${this.settings.limit} latest songs at ${this.settings.audioBitRate} bitrate`
    }
}
