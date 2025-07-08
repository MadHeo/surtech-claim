import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetail } from '../../api/insurtech';
import { formatPhoneNumber } from '../../utils/utils';
import Layout from '../layout/Layout';

interface DetailData {
  id: number;
  insuranceCompany: string;
  status: string;
  requestType: string;
  caseType: string;
  insuranceCreateNote: string;
  insuredPreference: string;
  insuranceLeakCause: string;
  address: string;
  addressDetail: string;
  customerTellNo: string;
  claimNumber: string;
  createdByInsuranceMemberName: string;
  createdAt: string;
}

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (!id) return;
        const response = await getDetail(id);

        setData(response.data);
      } catch (error: any) {
        if (error.message?.includes('인증 토큰이 없습니다')) {
          alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
          navigate('/');
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">로딩 중...</div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 h-screen">
          <div className="bg-gray-50 flex items-center justify-center">
            <div className="text-gray-600">데이터를 찾을 수 없습니다.</div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/list')}
              className="px-6 py-3 bg-sky-500 text-white font-medium rounded-md shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200"
            >
              목록으로
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">사고 상세 정보</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    data.status === 'COMPLETE'
                      ? 'bg-green-100 text-green-800'
                      : data.status === 'PROCESSING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {data.status === 'COMPLETE'
                    ? '완료'
                    : data.status === 'PROCESSING'
                      ? '처리중'
                      : '접수'}
                </span>
              </div>

              <div className="space-y-4">
                {/* 기본 정보 그리드 */}
                <div className="grid grid-cols-2 gap-4">
                  {/* 사고번호 */}
                  <div className="border-b border-gray-200 pb-3">
                    <h3 className="text-xs font-medium text-gray-500">사고번호</h3>
                    <p className="mt-1 text-sm text-gray-900">{data.claimNumber}</p>
                  </div>

                  {/* 보험사 */}
                  <div className="border-b border-gray-200 pb-3">
                    <h3 className="text-xs font-medium text-gray-500">보험사</h3>
                    <p className="mt-1 text-sm text-gray-900">{data.insuranceCompany}</p>
                  </div>

                  {/* 연락처 */}
                  <div className="border-b border-gray-200 pb-3">
                    <h3 className="text-xs font-medium text-gray-500">피보험자 연락처</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatPhoneNumber(data.customerTellNo)}
                    </p>
                  </div>

                  {/* 담당자 */}
                  <div className="border-b border-gray-200 pb-3">
                    <h3 className="text-xs font-medium text-gray-500">담당자</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {data.createdByInsuranceMemberName}
                    </p>
                  </div>
                </div>

                {/* 주소 */}
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-medium text-gray-500">피보험자 주소</h3>
                  <p className="mt-1 text-sm text-gray-900">{data.address}</p>
                  <p className="mt-1 text-sm text-gray-900">{data.addressDetail}</p>
                </div>

                {/* 사고 유형 */}
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-medium text-gray-500">피보험자 유형</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        data.caseType === 'CAUSE'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {data.caseType === 'CAUSE' ? '원인' : '피해'}
                    </span>
                  </div>
                </div>

                {/* 누수원인 */}
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-medium text-gray-500">누수원인</h3>
                  <p
                    className={`mt-1 text-sm ${data.insuranceLeakCause ? 'text-gray-900' : 'text-gray-400'} whitespace-pre-wrap`}
                  >
                    {data.insuranceLeakCause || '(입력되지 않음)'}
                  </p>
                </div>

                {/* 피보험자 성향 */}
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-medium text-gray-500">피보험자 성향</h3>
                  <p
                    className={`mt-1 text-sm ${data.insuredPreference ? 'text-gray-900' : 'text-gray-400'} whitespace-pre-wrap`}
                  >
                    {data.insuredPreference || '(입력되지 않음)'}
                  </p>
                </div>

                {/* 특이사항 */}
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-medium text-gray-500">특이사항</h3>
                  <p
                    className={`mt-1 text-sm ${data.insuranceCreateNote ? 'text-gray-900' : 'text-gray-400'} whitespace-pre-wrap`}
                  >
                    {data.insuranceCreateNote || '(입력되지 않음)'}
                  </p>
                </div>

                {/* 등록 일시 */}
                <div className="text-xs text-gray-500">
                  <span>등록일시: </span>
                  <span>{new Date(data.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* 목록으로 돌아가기 버튼 */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate('/list')}
                  className="px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200"
                >
                  목록으로
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
