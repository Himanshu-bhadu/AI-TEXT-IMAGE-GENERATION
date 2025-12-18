import React from 'react';

const FormFiled = ({ LabelName, type, name, placeholder, value, handlechange, issurpriseme, handleSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          // 1. Added dark:text-gray-100 so label is visible on dark bg
          className='block text-sm font-medium text-gray-900 dark:text-gray-100'
        >
          {LabelName}
        </label>
        
        {issurpriseme && (
          <button
            type='button'
            onClick={handleSurpriseMe}
            // 2. Updated button to be dark grey with white text in dark mode
            className='font-semibold text-xs bg-[#ECECF1] dark:bg-[#3b3b3b] py-1 px-2 rounded-[5px] text-black dark:text-white'
          >
            Surprise Me
          </button>
        )}
      </div>
      
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handlechange}
        required
        className='bg-gray-50 dark:bg-[#2b2c37] border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3'
      />
    </div>
  );
};

export default FormFiled;