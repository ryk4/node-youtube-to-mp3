const Downloader = require('./downloader')

const prompt = require('prompt-sync')();

start();

function start() {
    console.log('Starting application')

    const url = prompt('Enter Youtube playlist URL: ');
    const audioBitRate = parseInt(prompt('Select Audio bit rate (default=128): '));
    const limit = parseInt(prompt('Enter how many latest songs to download (max is 100): '));

    const allowedBitRates = [128, 256, 512];

    const settings = {
        limit: limit && limit <= 100 && limit > 0 && Number.isInteger(limit) ? limit : 100,
        audioBitRate: Number.isInteger(audioBitRate) && allowedBitRates.includes(audioBitRate) ? audioBitRate : 128,
    }

    console.log(settings);

    const downloader = new Downloader(settings);

    console.log(downloader.getDownloadInfo());

    downloader.getListOfSongsFromPlaylist(url).then(playlist => {
        console.log('Playlist name: ' + playlist.title);
        console.log('Total songs in playlist: ' + playlist.estimatedItemCount);
        console.log('Total songs to download: ' + settings.limit);

        playlist.items.forEach(song => {
            downloader.downloadSong(song.id, song.title, playlist.title);
        })

    })

}

