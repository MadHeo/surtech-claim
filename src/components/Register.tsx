import axios from 'axios';
import { useState } from 'react';
import Layout from './Layout';

// API 엔드포인트 설정
const API_URL = 'http://localhost:3000/api/submit-claim';

export default function Register() {
  const [formData, setFormData] = useState({
    title: '',
    accidentNumber: '',
    phone: '',
    address: '',
    addressDetail: '',
    cause: '',
    type: 'cause', // 'cause' | 'damage' | 'other'
    note: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, formData);

      if (response.status === 200) {
        alert('접수가 완료되었습니다.');
        // 폼 초기화
        setFormData({
          title: '',
          accidentNumber: '',
          phone: '',
          address: '',
          addressDetail: '',
          cause: '',
          type: 'cause',
          note: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">보험금 청구 접수</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 제목 */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="제목을 입력해 주세요"
                    className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    required
                  />
                </div>

                {/* 사고번호 */}
                <div>
                  <label
                    htmlFor="accidentNumber"
                    className="block text-sm font-medium text-gray-700"
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    피보험 연락처 <span className="text-red-500">*</span>
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
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      피보험주소 <span className="text-red-500">*</span>
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
                      className="block text-sm font-medium text-gray-700"
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

                {/* 누수원인 */}
                <div>
                  <label htmlFor="cause" className="block text-sm font-medium text-gray-700">
                    누수원인 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="cause"
                      name="cause"
                      value={formData.cause}
                      onChange={handleInputChange}
                      placeholder="원인을 입력해 주세요"
                      maxLength={100}
                      rows={3}
                      className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      required
                    />
                    <div className="absolute right-2 bottom-2 text-sm text-gray-400">
                      {formData.cause.length} / 100
                    </div>
                  </div>
                </div>

                {/* 피보험 성향 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    피보험 성향 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    {['cause', 'damage', 'other'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type }))}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          formData.type === type
                            ? 'bg-sky-500 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {type === 'cause' ? '원인' : type === 'damage' ? '피해' : '기타'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 특이사항 */}
                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                    특이사항
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="특이사항을 입력해 주세요"
                    rows={4}
                    className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  />
                </div>

                {/* 제출 버튼 */}
                <div className="pt-4">
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
