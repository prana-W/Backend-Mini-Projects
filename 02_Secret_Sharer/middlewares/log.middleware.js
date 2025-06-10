const fs = require('fs');

const deleteLog = () => {
    fs.unlink('logs.txt', (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('Logs were deleted!')
    })
}

const checkStatus = () => {
    fs.stat('logs.txt', (err, stats) => {
        if (err) {
            console.error('Error getting file stats:', err);
            return;
        }
        if (stats?.size > 1500000) {
            deleteLog();
        }
    })
}

const writeLog = (req, res, next) => {

    fs.appendFile('logs.txt', `Visited ${req.url} by ${req.user?.username || 'Anonymous'} at ${new Date().toLocaleTimeString()}\n`, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    })
    checkStatus() //checks status of the file each time and then deletes it if size is greater than 1.5 MB
    next()
}

module.exports = writeLog