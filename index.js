const express = require('express')
const app = express()
const cors = require('cors')
const {request, response} = require("express");
const rw = require("./saveFiles")
const fs = require('fs')
const multer=require('multer')
let datas = []
// const upload = multer({ dest: './uploads' }) // 指定上传后的文件的存放位置

// 实时显示：时间 操作 光照 温度 湿度 土壤湿度
let bodies = [
    {
        ID: 1,
        Timestamp: 100,
        Action: "\u5b9a\u65f6\u8bb0\u5f55",
        Sensors: {
            light: 123,
            temperature: 123,
            air_humidity: 123,
            soil_humidity: 123
        }
    }
]

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(express.static("uploads"))

const generateId = () => {
    const maxId = datas.length > 0
        ? Math.max(...datas.map(n => n.ID))
        : 0
    return maxId + 1
}

// 实时显示
app.post("/wendu", (request, response) => {
    const body = request.body

    const data = {
        Timestamp: body.Timestamp,
        Action: body.Action,
        Sensors: {
            light: Number(body.Sensors.light),
            temperature: Number(body.Sensors.temperature),
            air_humidity: Number(body.Sensors.air_humidity),
            soil_humidity: Number(body.Sensors.soil_humidity)
        }
    }
    console.log("wendu_data: ", data)
    bodies = body
    response.json(bodies)
})

app.get("/wendu", (req, res) => {
    res.json(bodies)
})

// 获取日志
app.post("/logs", (request, response) => {
    const body = request.body

    const data = {
        ID: generateId(),
        Timestamp: body.Timestamp,
        Action: body.Action,
        Sensors: {
            light: Number(body.Sensors.light),
            temperature: Number(body.Sensors.temperature),
            air_humidity: Number(body.Sensors.air_humidity),
            soil_humidity: Number(body.Sensors.soil_humidity)
        }
    }
    console.log(data)
    // datas = datas.concat(data)
    rw.RWFiles(data)
    fs.readFile('./logs.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`)
        } else {
            // 将 JSON string 转换成 JSON object
            data = JSON.parse(data)
            console.log("logs_data: ", data)
            response.json({"message": "success"})
        }
    })
})

app.get("/logs", (req, res) => {
    fs.readFile('./logs.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`)
        } else {
            // 将 JSON string 转换成 JSON object
            data = JSON.parse(data)

            res.json(data)
        }
    })


})

// 接收图片
// https://juejin.cn/post/7214146630466388026
/*
* storage 对象由 multer.diskStorage() 生成，其内部传入对象，该对象有两个方法属性，它们都有 3 个参数，请求对象 req，文件信息 file，和一个回调函数 cb：
* destination 就是配置文件存储路径的，其作用等同于之前直接往 multer() 传入的 { dest: './uploads' }，存储路径通过 cb 的第二个参数传入，cb 的第一个参数可以传 Error 对象或直接传 null；
* filename 就可以用来自定义文件名，因为 file.originalname 也就是上传的文件的原来的文件名，其是带有后缀的，所以我们在它前面加个时间戳来作为存储时的文件名。
* */
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads')
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })
app.post('/img', upload.single('photo'), (req, res) => {
    console.log("req.body", req.body)
    console.log("req.file", req.file)
    res.json({ message: "Successfully uploaded files" })
})

// 打开端口
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
