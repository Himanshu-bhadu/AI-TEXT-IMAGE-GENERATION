import express from 'express';
import { HfInference } from '@huggingface/inference';

const router = express.Router();
const hf = new HfInference(process.env.HF_TOKEN);

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt required' });

    const image = await hf.textToImage({
      model: 'stabilityai/stable-diffusion-xl-base-1.0',
      inputs: prompt,
    });

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = buffer.toString('base64');

    res.status(200).json({
      photo: `data:image/png;base64,${base64}`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
