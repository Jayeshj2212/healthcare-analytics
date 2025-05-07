import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

const FeedbackWidget = ({ data = [] }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [feedbackData, setFeedbackData] = useState(data);

  useEffect(() => {
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/hospitals/1');
          const result = await response.json();
          setFeedbackData(result.feedback);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [data]);

  const handleButtonClick = () => {
    setFormVisible(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-[#1261A0]" />
          Feedback
        </h2>
        <div className="flex">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1 text-sm font-medium text-gray-700">4.2/5</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {feedbackData.map((feedback, index) => (
          <div key={index} className="p-3 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-800">{feedback.category}</h3>
                <div className="flex mt-1">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-xs text-gray-500">{feedback.date}</span>
            </div>
            <p className="text-sm text-gray-600">{feedback.comment}</p>
            <div className="mt-2 flex justify-end">
              <span className="text-xs text-gray-500">- {feedback.author}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        {!isFormVisible && (
          <button onClick={handleButtonClick} className="w-full py-2 bg-[#1261A0] text-white rounded-md bg-blue-700 transition-colors">
            Submit New Feedback
          </button>
        )}
        {isFormVisible && (
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <input type="text" placeholder="Your Name" className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md" />
              <input type="email" placeholder="Your Email" className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md mt-2 sm:mt-0" />
            </div>
            <textarea placeholder="Your Feedback" className="w-full p-2 border border-gray-300 rounded-md" rows="4"></textarea>
            <button type="submit" className="w-full py-2 bg-[#1261A0] text-white rounded-md bg-blue-700 transition-colors">
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackWidget; 