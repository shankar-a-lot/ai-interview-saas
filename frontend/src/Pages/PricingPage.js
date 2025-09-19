import React, { useState } from 'react';
import Heading from '../components/Heading';

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
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  return (
    <div className="container mx-auto px-6 py-20">
      <Heading>Find the Right Plan</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PricingCard 
          title="Starter" 
          price="$29" 
          features={['Up to 10 interviews/mo', 'Basic AI analysis', 'Email support']} 
          isSelected={selectedPlan === 'Starter'} 
          onSelect={setSelectedPlan} 
        />
        <PricingCard 
          title="Pro" 
          price="$99" 
          features={['Up to 50 interviews/mo', 'Advanced AI analysis', 'Custom branding', 'Priority support']} 
          isFeatured={true} 
          isSelected={selectedPlan === 'Pro'} 
          onSelect={setSelectedPlan} 
        />
        <PricingCard 
          title="Enterprise" 
          price="Contact Us" 
          features={['Unlimited interviews', 'Full API access', 'Dedicated account manager']} 
          isSelected={selectedPlan === 'Enterprise'} 
          onSelect={setSelectedPlan} 
        />
      </div>
    </div>
  );
};

export default PricingPage;