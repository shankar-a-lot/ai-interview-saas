import React, { useState } from 'react';
import Heading from '../components/Heading';

// This is the reusable component for the pricing cards
const PricingCard = ({ title, price, features, isFeatured, isSelected, onSelect }) => (
  <div className={`border-2 ${isSelected ? 'border-primary scale-105' : 'border-gray-700'} backdrop-blur-sm bg-white/10 rounded-lg p-8 flex flex-col transition-transform transform`}>
    {isFeatured && <span className="bg-primary text-white text-xs font-bold uppercase px-3 py-1 rounded-full self-start mb-4">Most Popular</span>}
    <h3 className="font-poppins font-bold text-2xl text-white mb-2">{title}</h3>
    <p className="font-poppins text-4xl font-bold text-white mb-4">{price}</p>
    <ul className="font-roboto space-y-3 text-gray-300 mb-8 text-left">
      {features.map(feature => <li key={feature} className="flex items-center"><span className="text-primary mr-3">✔</span>{feature}</li>)}
    </ul>
    <button onClick={() => onSelect(title)} className={`mt-auto font-poppins font-bold py-3 px-8 rounded-lg text-lg transition ${isSelected ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}>
      {isSelected ? 'Selected' : 'Choose Plan'}
    </button>
  </div>
);


const PricingPage = () => {
  const [userType, setUserType] = useState('recruiter'); // Default to recruiter view

  const recruiterPlans = [
    { title: 'Starter', price: '$29/mo', features: ['Up to 10 interviews/mo', 'Basic AI analysis', 'Email support'], isFeatured: false },
    { title: 'Pro', price: '$99/mo', features: ['Up to 50 interviews/mo', 'Advanced AI analysis', 'Custom branding', 'Priority support'], isFeatured: true },
    { title: 'Enterprise', price: 'Contact Us', features: ['Unlimited interviews', 'Full API access', 'Dedicated account manager'], isFeatured: false },
  ];
  
  const candidatePlans = [
    { title: 'Free Practice', price: 'Free', features: ['1 free practice interview', 'Basic feedback on filler words', 'No credit card required'], isFeatured: false },
    { title: 'Interview Pro', price: '$19', features: ['5 practice interviews', 'Advanced feedback on tone & clarity', 'Unlimited system checks'], isFeatured: true },
  ];
  
  const plans = userType === 'recruiter' ? recruiterPlans : candidatePlans;
  const [selectedPlan, setSelectedPlan] = useState(plans.find(p => p.isFeatured)?.title || plans[0]?.title);


  return (
    <div className="container mx-auto px-6 py-20">
      <Heading>Find the Right Plan for You</Heading>

      {/* --- User Type Toggle --- */}
      <div className="flex justify-center mb-12">
        <div className="flex rounded-lg bg-gray-900 p-1">
          <button onClick={() => setUserType('recruiter')} className={`px-6 py-2 rounded-md font-bold transition ${userType === 'recruiter' ? 'bg-primary text-white' : 'text-gray-400'}`}>
            For Recruiters
          </button>
          <button onClick={() => setUserType('candidate')} className={`px-6 py-2 rounded-md font-bold transition ${userType === 'candidate' ? 'bg-primary text-white' : 'text-gray-400'}`}>
            For Candidates
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map(plan => (
            <PricingCard 
                key={plan.title}
                title={plan.title}
                price={plan.price}
                features={plan.features}
                isFeatured={plan.isFeatured}
                isSelected={selectedPlan === plan.title}
                onSelect={setSelectedPlan}
            />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;