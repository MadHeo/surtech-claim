import { FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">환영합니다!</h2>
            <p className="text-gray-600">SurTech Claim 시스템에 로그인되었습니다.</p>

            <button
              className="w-full mt-6 hover:cursor-pointer"
              onClick={() => navigate('/register')}
            >
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                        <FiMail className="text-white" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <span className="text-lg font-medium text-gray-900 hover:cursor-pointer">
                        새로운 사고 접수하기
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
