import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitToInsurtech, type InsurtechClaimData } from '../../api/insurtech';
import Layout from '../layout/Layout';

export default function Register() {
  const [formData, setFormData] = useState({
    accidentNumber: '',
    phone: '',
    address: '',
    addressDetail: '',
    cause: '',
    type: 'CAUSE' as 'CAUSE' | 'DAMAGE' | 'OTHER',
    insuredPreference: '',
    note: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // API 스펙에 맞게 데이터 변환
      const apiData: InsurtechClaimData = {
        cliamNo: formData.accidentNumber,
        customerTellNo: formData.phone,
        address: formData.address,
        addressDetail: formData.addressDetail,
        leakCause: formData.cause,
        insuredPreference: formData.insuredPreference,
        insuranceCreateNote: formData.note,
        caseType: formData.type,
      };

      await submitToInsurtech(apiData);

      alert('접수가 완료되었습니다.');
      // 폼 초기화
      setFormData({
        accidentNumber: '',
        phone: '',
        address: '',
        addressDetail: '',
        cause: '',
        type: 'CAUSE',
        insuredPreference: '',
        note: '',
      });
    } catch (error: any) {
      console.error('Error submitting form:', error);

      // 토큰 관련 에러일 경우 로그인 페이지로 리다이렉트
      if (error.message?.includes('인증 토큰이 없습니다')) {
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        navigate('/');
        return;
      }

      alert('접수 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">누수 사고 접수</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 사고번호 */}
                <div>
                  <label
                    htmlFor="accidentNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    사고번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="accidentNumber"
                    name="accidentNumber"
                    value={formData.accidentNumber}
                    onChange={handleInputChange}
                    placeholder="사고 번호를 입력해 주세요"
                    className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    required
                  />
                </div>

                {/* 연락처 */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    피보험자 연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="연락처를 입력해 주세요"
                    className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    required
                  />
                </div>

                {/* 주소 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      피보험자 주소 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="주소 검색"
                      className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="addressDetail"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      상세주소 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="addressDetail"
                      name="addressDetail"
                      value={formData.addressDetail}
                      onChange={handleInputChange}
                      placeholder="상세주소 입력"
                      className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                {/* 피보험자 타입 */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    피보험자 타입 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    {[
                      { value: 'CAUSE', label: '원인' },
                      { value: 'DAMAGE', label: '피해' },
                      { value: 'OTHER', label: '기타' },
                    ].map(type => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setFormData(prev => ({
                            ...prev,
                            type: type.value as 'CAUSE' | 'DAMAGE' | 'OTHER',
                          }))
                        }
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          formData.type === type.value
                            ? 'bg-sky-500 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 누수원인 */}
                <div className="relative">
                  <label htmlFor="cause" className="block text-sm font-medium text-gray-700 mb-2">
                    누수원인 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="cause"
                      name="cause"
                      value={formData.cause}
                      onChange={handleInputChange}
                      placeholder="원인을 입력해 주세요"
                      maxLength={500}
                      rows={4}
                      className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      required
                    />
                    <div className="absolute right-2 bottom-2 text-sm text-gray-400">
                      {formData.cause.length} / 500
                    </div>
                  </div>
                </div>

                {/* 피보험자 성향 */}
                <div className="relative">
                  <label
                    htmlFor="insuredPreference"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    피보험자 성향
                  </label>
                  <textarea
                    id="insuredPreference"
                    name="insuredPreference"
                    value={formData.insuredPreference}
                    onChange={handleInputChange}
                    placeholder="성향을 입력해 주세요"
                    rows={2}
                    maxLength={500}
                    className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  />
                  <div className="absolute right-2 bottom-2 text-sm text-gray-400">
                    {formData.insuredPreference.length} / 500
                  </div>
                </div>

                {/* 특이사항 */}
                <div className="relative">
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                    특이사항
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="기타 특이사항을 입력해 주세요"
                    maxLength={500}
                    rows={4}
                    className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  />
                  <div className="absolute right-2 bottom-2 text-sm text-gray-400">
                    {formData.note.length} / 500
                  </div>
                </div>

                {/* 제출 버튼 */}
                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-sky-500 text-white font-medium rounded-md shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200"
                  >
                    접수하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
