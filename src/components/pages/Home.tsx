import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0 flex items-center justify-center min-h-[calc(100vh-200px)]">
        {/* 중앙 카드 - 트렌디한 스타일 적용 */}
        <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-10 flex flex-col items-center">
          {/* 환영 메시지 */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">환영합니다!</h2>
          <p className="text-gray-500 mb-8 text-center text-base">
            아래 버튼을 눌러 신규 요청할 수 있습니다.
          </p>
          {/* 새로운 사고 접수하기 버튼 */}
          <button
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200 shadow-md text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300"
            onClick={() => navigate('/register')}
          >
            <FiPlus className="text-2xl" />
            새로운 사고 접수하기
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
