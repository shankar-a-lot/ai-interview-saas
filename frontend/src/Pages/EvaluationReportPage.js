import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom'; // Import useParams to read the URL

// 1. Create a larger set of sample data to act as our "database"
const allReportsData = {
  '101': {
    candidate: { name: 'Rakshita Gada', applyingFor: 'Senior Frontend Developer' },
    summary: { job_fit_score: 92, recommendation: 'Strong Hire', key_takeaways: 'Excellent communication and strong technical knowledge in React.' },
    technical_assessment: { accuracy_score: 8.8, domain_knowledge: 9.5, keywords_hit: ['React Hooks', 'State Management', 'CI/CD'] },
    soft_skills_evaluation: { confidence: 'High', clarity: 'Very Clear', communication_score: 9.4 }
  },
  '102': {
    candidate: { name: 'Prajwal Patil', applyingFor: 'Lead Backend Engineer' },
    summary: { job_fit_score: 88, recommendation: 'Hire', key_takeaways: 'Solid experience with microservices, but could be more concise.' },
    technical_assessment: { accuracy_score: 9.1, domain_knowledge: 9.0, keywords_hit: ['Python', 'Django', 'AWS', 'Docker'] },
    soft_skills_evaluation: { confidence: 'Medium', clarity: 'Clear', communication_score: 8.5 }
  },
  '103': {
    candidate: { name: 'Veerbhadrappa', applyingFor: 'UI/UX Designer' },
    summary: { job_fit_score: 95, recommendation: 'Top Candidate', key_takeaways: 'Exceptional design portfolio and excellent problem-solving skills.' },
    technical_assessment: { accuracy_score: 9.5, domain_knowledge: 9.8, keywords_hit: ['Figma', 'User Research', 'Prototyping'] },
    soft_skills_evaluation: { confidence: 'High', clarity: 'Exceptional', communication_score: 9.7 }
  }
};

const EvaluationReportPage = () => {
  // 2. Get the 'candidateId' from the URL (e.g., '101', '102')
  const { candidateId } = useParams();
  
  // 3. Find the correct report from our data using the ID
  const reportData = allReportsData[candidateId];

  // 4. If no report is found for the ID, show a friendly message
  if (!reportData) {
    return (
      <div className="text-center text-white">
        <h1 className="font-poppins text-4xl font-bold">Report Not Found</h1>
        <p className="font-roboto text-lg mt-4">Could not find a report for the specified candidate ID.</p>
        <Link to="/reports" className="text-primary mt-4 inline-block">← Back to All Reports</Link>
      </div>
    );
  }

  // 5. If a report is found, display its data dynamically
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* --- Header --- */}
      <div className="mb-10">
        <h1 className="font-poppins text-4xl font-bold text-white">Evaluation Report</h1>
        <p className="font-roboto text-lg text-gray-400 mt-2">
          Candidate: <span className="font-bold text-white">{reportData.candidate.name}</span> for {reportData.candidate.applyingFor}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Summary & Scores --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* Summary Card */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
            <h2 className="font-poppins text-2xl font-bold text-white mb-4">Interview Summary</h2>
            <p className="font-roboto text-gray-300"><span className="font-bold">Recommendation:</span> {reportData.summary.recommendation}</p>
            <p className="font-roboto text-gray-300 mt-2"><span className="font-bold">Key Takeaways:</span> {reportData.summary.key_takeaways}</p>
          </div>
          {/* Technical Skills Card */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
            <h2 className="font-poppins text-2xl font-bold text-white mb-4">Technical Assessment</h2>
            <p className="font-roboto text-gray-300">Answer Accuracy: {reportData.technical_assessment.accuracy_score}/10</p>
            <p className="font-roboto text-gray-300 mt-2">Domain Knowledge: {reportData.technical_assessment.domain_knowledge}/10</p>
          </div>
           {/* Soft Skills Card */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
            <h2 className="font-poppins text-2xl font-bold text-white mb-4">Soft Skills Evaluation</h2>
            <p className="font-roboto text-gray-300">Confidence Level: {reportData.soft_skills_evaluation.confidence}</p>
            <p className="font-roboto text-gray-300 mt-2">Clarity of Speech: {reportData.soft_skills_evaluation.clarity}</p>
          </div>
        </div>

        {/* --- Right Column: Overall Score --- */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-2xl flex flex-col items-center justify-center text-center">
          <h2 className="font-poppins text-2xl font-bold text-white mb-4">Job Fit Score</h2>
          <div className="w-40 h-40 rounded-full bg-primary flex items-center justify-center">
            <span className="font-poppins text-5xl font-bold text-white">{reportData.summary.job_fit_score}%</span>
          </div>
          <p className="font-roboto text-gray-400 mt-4">This score reflects the candidate's overall suitability for the role based on our AI analysis.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default EvaluationReportPage;