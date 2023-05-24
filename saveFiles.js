const fs = require('fs')
const path = require('path')
const os = require('os')
const fsPromises = require('fs/promises')

const RWFiles = (log) => {
    // json文件的读取
    fs.readFile('./logs.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`)
        } else {
            // 将 JSON string 转换成 JSON object
            let logs = JSON.parse(data)

            logs = logs.concat(log)

            // 将 JSON object 转换成 string 这是非常必要的！
            const new_logs = JSON.stringify(logs)

            // write file to disk
            fs.writeFile('./logs.json', new_logs, 'utf8', err => {
                if (err) {
                    console.log(`Error writing file: ${err}`)
                } else {
                    console.log(`File is written successfully!`)
                }
            })
        }
    })
}

module.exports = {
    RWFiles
}



