import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormFiled, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!form.prompt) return alert('Please enter a prompt');

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:3000/api/v1/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      const data = await response.json();
      setform({ ...form, photo: data.photo });

    } catch (err) {
      alert(err.message);
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.prompt || !form.photo || !form.name) {
      return alert('Please generate an image first');
    }

    try {
      setLoading(true);

      await fetch('http://localhost:3000/api/v1/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      navigate('/');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomprompt = getRandomPrompt(form.prompt);
    setform({ ...form, prompt: randomprompt })
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        {/* Title: Dark text on Light, White text on Dark */}
        <h1 className='font-extrabold text-[#222328] dark:text-white text-[32px]'>
          Create
        </h1>
        {/* Subtitle: Medium Gray on Light, Light Gray on Dark */}
        <p className='mt-2 text-[#666e75] dark:text-gray-400 text-[16px] max-w [500px]'>
          Create imaginative and visually stunning images through DALL-E AI and share them with the community
        </p>
      </div>

      <form className='mt-6 max-w-3x1' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormFiled
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex. Himanshu"
            value={form.name}
            handlechange={handlechange}
          />

          <FormFiled
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a pencil and watercolor drawing of a bright city in the future with flying cars"
            value={form.prompt}
            handlechange={handlechange}
            issurpriseme
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* Image Preview Box: Needs to be dark in dark mode */}
          <div className="relative bg-gray-50 dark:bg-[#202123] border border-gray-300 dark:border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-60 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40 dark:opacity-60 invert-0 dark:invert"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-6">
          <p className="mt-2 text-[#666e75] dark:text-gray-400 text-[14px]">
            ** Once you have created the image you want, you can share it with others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost