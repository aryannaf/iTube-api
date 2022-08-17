const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');
const videosFile = fs.readFileSync('./data/videos.json');

const videos = JSON.parse(videosFile);

router.get("/", (req, res) => {
    
    const listedVideos = videos.map((video) => {
        return {
            title: video.title,
            image: video.image,
            channel: video.channel,
            id: video.id
        }
    })

    res.json(listedVideos);
})

router.post("/", (req, res) => {

    let { title, description } = req.body;

    const newVideo = {
        ...req.body,
        id: uuid(),
        title,
        description,
        image: "http://localhost:8080/images/Upload-video-preview.jpg",
        timestamp: new Date(),
        channel: "CoolChannel",
        duration: "2:22",
        views: "1",
        likes: "1",
        comments: [
            {
                "name":"Jane Doe",
                "comment":"Best video ever!",
                "likes":3,
                "timestamp":new Date()
            }
        ]
    };

    const allVideos = [...videos, newVideo];

    fs.writeFileSync('./data/videos.json', JSON.stringify(allVideos));

    res.status(201).json(newVideo);
})


router.get("/:id", (req, res) => {

    const selectedVideo = videos.find((video) => video.id === req.params.id);

    if (!selectedVideo) {
        return res.status(404).send("Video not found");
    }
    
    res.json(selectedVideo);
})

module.exports = router;