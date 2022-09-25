# Youtube playlist to mp3 download

This a simple youtube playlist downloader written in Node js. Downloaded songs are stored as mp3 format. It strongly relies on
**node-ytdl-core** and **FFMPEG** library to parse audio files. Downloaded music will be placed in downloads folder
inside the project.

### Requirements

- Node
- FFMPEG (needs to be in PATH)
    - OSX: run "brew install ffmpeg"
    - Windows: https://ffmpeg.org/download.html
    - <b>Validate if FFMPEG is installed properly and added to path by running "FFMPEG" from terminal</b>
- Playlist must be visible to Public

### Install and use locally

```sh
git clone {projectURL}
npm install
node index.js
```

### Current limitations and future improvements

- Only 100 latest songs can be downloaded form specific playlist
- <b>Convenient</b> options to download songs that are not in playlist
- Allow downloading Private playlists. Requires session data from cookies
- More audio formats and settings
- FFMPEG validation. If not installed, incorrect PATH, etc.
- Allow to use FFMPEG by specifying absolute path. At the moment requires entry in PATH
- More options on where to save audio files.

