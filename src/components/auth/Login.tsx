import { useEffect, useState } from 'react';
import { FiHome, FiLock, FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { login, type LoginData, type LoginResponse } from '../../api/insurtech';
import homsurLogo from '../../assets/homsur-logo.png';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const companyName = [
    {
      name: '흥국',
      id: '흥국',
    },
    {
      name: 'AXA',
      id: 'AXA',
    },
  ];

  // 이미 로그인된 사용자는 홈으로 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password || !selectedCompany) {
      alert('회사, 이메일, 비밀번호를 모두 입력해 주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // API 스펙에 맞게 데이터 구성
      const loginData: LoginData = {
        insuranceCompanyName: selectedCompany,
        userId: userId,
        password: password,
      };

      const response = await login(loginData);
      const loginResponse: LoginResponse = response.data;

      if (loginResponse.accessToken) {
        //토큰 저장
        localStorage.setItem('authToken', loginResponse.accessToken);
        //유저 정보 넣기
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            insuranceCompany: loginResponse.insuranceCompany,
            userId: loginResponse.userId,
            tellNo: loginResponse.tellNo,
            username: loginResponse.username,
            roles: loginResponse.roles,
          })
        );
        navigate('/home');
      } else {
        throw new Error('토큰을 받지 못했습니다.');
      }
    } catch (error: any) {
      console.error('Login error:', error);

      // 에러 메시지 처리
      if (error.response?.status === 401) {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      } else {
        alert('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 to-blue-500 px-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <img src={homsurLogo} alt="홈슈어" className="w-32 h-auto mx-auto mb-2" />
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">보험회사</label>
            <div className="flex items-center bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3">
              <FiHome className="text-gray-600 mr-3" />
              <select
                value={selectedCompany}
                onChange={e => setSelectedCompany(e.target.value)}
                className="w-full bg-transparent text-gray-800 focus:outline-none"
                disabled={isLoading}
              >
                <option value="" className="text-gray-300 bg-white" disabled>
                  선택
                </option>
                {companyName.map(company => (
                  <option key={company.id} value={company.id} className="text-gray-800 bg-white">
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">아이디</label>
            <div className="flex items-center bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3">
              <FiMail className="text-gray-600 mr-3" />
              <input
                type="text"
                placeholder="아이디를 입력해 주세요"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                className="w-full bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">비밀번호</label>
            <div className="flex items-center bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3">
              <FiLock className="text-gray-600 mr-3" />
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-xl hover:bg-indigo-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
