// File: frontend/src/layouts/WriterLayout.jsx

import React, { useState } from 'react';

const WriterLayout = ({ data }) => {
  const { title } = data;
  const [text, setText] = useState('');
  
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="h-[60vh] flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full flex-1 p-6 text-lg bg-gray-50 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 leading-relaxed"
        placeholder="Start writing..."
      ></textarea>
      <div className="text-right mt-2 text-sm text-gray-500 font-semibold">
        Word Count: {wordCount}
      </div>
    </div>
  );
};

export default WriterLayout;