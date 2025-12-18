import express from 'express';
import * as dotenv from 'dotenv';
import cloudinary from '../utils/cloudinary.js';
import Post from '../mongodb/models/post.js';


dotenv.config();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    const uploaded = await cloudinary.uploader.upload(photo);

    const post = await Post.create({
      name,
      prompt,
      photo: uploaded.secure_url,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
