// frontend/src/components/InfoModal.jsx

import React from 'react';
import { layoutInfo } from '../layouts/layoutInfo';

const InfoModal = ({ layoutName, onClose }) => {
  const info = layoutInfo[layoutName] || {
    title: "Unknown Layout",
    principle: "N/A",
    description: "No information available for this layout.",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex items-center mb-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{info.title}</h2>
            <p className="text-sm font-semibold text-blue-600">{info.principle}</p>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">
          {info.description}
        </p>
      </div>
    </div>
  );
};

export default InfoModal;
