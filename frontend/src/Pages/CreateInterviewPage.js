import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CreateInterviewPage = () => {
  const [interviewTitle, setInterviewTitle] = useState('');
  const [questions, setQuestions] = useState(['']); // Start with one empty question

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, '']); // Add a new empty question field
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };
  
  const handleSaveInterview = () => {
    // In a real app, you would send this data to the backend
    console.log({ title: interviewTitle, questions });
    toast.success('Interview template saved successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-10">
        <h1 className="font-poppins text-4xl font-bold text-white">Create New Interview Template</h1>
        <p className="font-roboto text-lg text-gray-400 mt-2">Design a custom interview by adding your own questions.</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-8 shadow-2xl">
        {/* Interview Title */}
        <div className="mb-6">
          <label className="block font-poppins text-lg font-semibold text-white mb-2" htmlFor="title">Interview Title</label>
          <input 
            id="title"
            type="text" 
            placeholder="e.g., Senior Frontend Developer Screening"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white"
            value={interviewTitle}
            onChange={(e) => setInterviewTitle(e.target.value)}
          />
        </div>

        {/* Dynamic Questions List */}
        <div>
          <label className="block font-poppins text-lg font-semibold text-white mb-2">Questions</label>
          {questions.map((question, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input 
                type="text" 
                placeholder={`Question ${index + 1}`}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
              />
              <button onClick={() => removeQuestion(index)} className="bg-red-600 text-white p-3 rounded-lg">X</button>
            </div>
          ))}
          <button onClick={addQuestion} className="font-roboto text-sm text-primary hover:underline mt-2">+ Add Another Question</button>
        </div>
        
        {/* Save Button */}
        <div className="mt-8 text-right">
            <button onClick={handleSaveInterview} className="font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg text-lg">
                Save Template
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateInterviewPage;