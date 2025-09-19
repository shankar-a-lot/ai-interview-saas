import React from 'react';

const CodeSnippet = ({ jsonData }) => {
  return (
    <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg h-64 font-mono text-sm text-left overflow-auto">
      <pre>
        <code>
          {JSON.stringify(jsonData, null, 2)}
        </code>
      </pre>
    </div>
  );
};

export default CodeSnippet;