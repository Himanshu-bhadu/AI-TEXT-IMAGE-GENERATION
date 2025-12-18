import React from 'react'

const Card = ({ name, prompt, photo }) => {
  return (
    <div className="rounded-xl shadow-md group relative">
      <img src={photo} alt={prompt} className="w-full h-auto object-cover rounded-xl" />
      <div className="absolute bottom-0 hidden group-hover:flex bg-[#10131f] p-4 rounded-md">
        <p className="text-white text-sm">{prompt}</p>
        <span className="text-white font-semibold">{name}</span>
      </div>
    </div>
  );
};


export default Card