import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to SkillHub
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A Freelance Skill Marketplace for Students
        </p>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Connect with talented students for your projects or offer your skills to earn
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg text-lg hover:bg-gray-300"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Offer Services</h3>
            <p className="text-gray-600">Share your skills in design, coding, writing, and more</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Hire Talent</h3>
            <p className="text-gray-600">Find skilled students for your projects</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-600">JWT authentication and secure transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
