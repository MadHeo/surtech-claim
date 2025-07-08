import type { AxiosResponse } from 'axios';
import axios from './axiosConfig';

// 로그인 API 타입 정의
export interface LoginData {
  insuranceCompanyName: string;
  userId: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  accessToken: string;
  refreshToken: string;
  username: string;
  userId: string;
  tellNo: string;
  insuranceCompany: string;
  roles: string;
}

// Insurtech API 타입 정의
export interface InsurtechClaimData {
  cliamNo: string; // API 스펙에 따라 오타 그대로 유지
  customerTellNo: string;
  address: string;
  addressDetail: string;
  leakCause: string;
  insuredPreference: string;
  insuranceCreateNote: string;
  caseType: 'CAUSE' | 'DAMAGE' | 'OTHER';
}

// localStorage에서 토큰 가져오기
function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

// 로그인 API 함수
export async function login(data: LoginData): Promise<AxiosResponse<LoginResponse>> {
  try {
    const response = await axios.post('https://api.insurtech.co.kr/insurances/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

// Insurtech API 함수
export async function submitToInsurtech(data: InsurtechClaimData) {
  try {
    const token = getAuthToken();

    if (!token) {
      throw new Error('인증 토큰이 없습니다. 다시 로그인해 주세요.');
    }

    const response = await axios.post('https://api.insurtech.co.kr/insurances', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error submitting to Insurtech API:', error);
    throw error;
  }
}
