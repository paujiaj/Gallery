const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const util = require("util")
const exp = require("constants")
const https = require("https");
const unlinkFile = util.promisify(fs.unlink)
const port = 3003
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")
app.use(express.static("public"))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/upload/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).any()

function checkFileType(file, cb) {
    const fileTypes = /jpeg|png|jpg/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb("Please upload images only")
    }
}

const handleRoute = (dir, view, route) => {
    app.get(route, (req, res) => {
        let images = [];
        fs.readdir(dir, (err, files) => {
            if (!err) {
                files.forEach(file => {
                    images.push(file);
                });
                const folder = dir.replace('./public', '');
                res.render(view, { images: images, folder: folder});
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
};

handleRoute("./public/img/upload", "index", "/");
handleRoute("./public/img/upload", "gallery", "/gallery");

//app.get("/", (req, res) => {
//    res.render("index")
//})

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (!err && req.files != "") {
            res.status(200).send()
        } else if (!err && req.files == "") {
            res.statusMessage = "Please select an image to upload"
            res.status(400).end()
        } else {
            res.statusMessage = (err === "Please upload images only") ? err : "Photo exceed limit of 10 MB"
            res.status(400).end()
        }
    })
})

app.put("/delete", (req, res) => {
    const deleteImages = req.body.deleteImages
    if(deleteImages == ""){
        res.status(400).end()
    } else {
        deleteImages.forEach( image => {
            unlinkFile("./public/img/upload/" + image)
        })
        res.status(200).end()

    }
})

const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
  };

https.createServer(options, app).listen(port, () => {
    console.log(`Server running at https://localhost:${port}/`);
});
