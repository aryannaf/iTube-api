const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');
const videosFile = fs.readFileSync('./data/videos.json');

const videos = JSON.parse(videosFile);

router.get("/videos", (req, res) => {
    

    res.json(videos);
})

router.post("/videos", (req, res) => {
    console.log(req.body);

    const newVideo = {...req.body, id: uuid()};
    console.log(newVideo);

    const allVideos = [...videos, newVideo];

    fs.writeFileSync('./data/videos.json', JSON.stringify(allVideos));

    res.status(201).json(newVideo);
})


router.get("/videos/:id", (req, res) => {
    console.log(req.params);

    const selectedVideo = videos.find((video) => video.id === req.params.videoId);

    res.json(selectedVideo);
})

module.exports = router;