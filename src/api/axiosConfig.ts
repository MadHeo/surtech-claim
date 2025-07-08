import axios from 'axios';

// axios 인터셉터 설정
axios.interceptors.response.use(
  response => response,
  error => {
    // 401 에러 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 인터셉터 설정 완료
export default axios;
