const fs = require("fs");

module.exports = class FileSystemHelper {
    constructor(path) {
        this.path = path;
    }

    validatePath() {
        return fs.existsSync(this.path);
    }

    createDirectory() {
        fs.mkdirSync(this.path, {recursive: true});
    }
}
