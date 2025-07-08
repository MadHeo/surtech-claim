import { FaUser } from 'react-icons/fa';
import Layout from '../layout/Layout';

export default function MyPage() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const { insuranceCompany, userId, username } = userInfo;

  const profileImage = null; // 여기에 실제 프로필 이미지 URL이 들어갈 수 있습니다

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">내 정보</h2>
        <div className="flex flex-col items-center gap-8">
          {/* 프로필 이미지 섹션 */}
          <div className="relative">
            {profileImage ? (
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                src={profileImage}
                alt="프로필 이미지"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-100">
                <FaUser className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          {/* 사용자 정보 섹션 */}
          <div className="w-full max-w-[464px] space-y-6">
            <div className="space-y-2">
              <div className="opacity-80 text-black text-sm font-medium font-['Poppins']">
                보험회사
              </div>
              <div className="w-full h-10 bg-stone-50 rounded-md flex items-center px-4">
                <div className="opacity-70 text-black text-sm font-normal">{insuranceCompany}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="opacity-80 text-black text-sm font-medium font-['Poppins']">
                아이디
              </div>
              <div className="w-full h-10 bg-stone-50 rounded-md flex items-center px-4">
                <div className="opacity-70 text-black text-sm font-normal">{userId}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="opacity-80 text-black text-sm font-medium font-['Poppins']">이름</div>
              <div className="w-full h-10 bg-stone-50 rounded-md flex items-center px-4">
                <div className="opacity-70 text-black text-sm font-normal">{username}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
