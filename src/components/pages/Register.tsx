import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitToInsurtech, type InsurtechClaimData } from '../../api/insurtech';
import { useModal } from '../../hooks/useModal';
import AddressSearchModal from '../AddressSearchModal';
import Layout from '../layout/Layout';
import Modal from '../Modal';

export default function Register() {
  const [formData, setFormData] = useState({
    cliamNo: '',
    customerTellNo: '',
    address: '',
    addressDetail: '',
    leakCause: '',
    insuredPreference: '',
    insuranceCreateNote: '',
    type: 'CAUSE' as 'CAUSE' | 'VICTIM',
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const navigate = useNavigate();

  // useModal 훅 사용
  const {
    open: isConfirmModalOpen,
    modalProps: confirmModalProps,
    showModal: showConfirmModal,
  } = useModal();

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setFormData(prev => ({
      ...prev,
      address: fullAddress,
    }));
    setIsAddressModalOpen(false);
  };

  // 폼 제출 시 모달을 먼저 띄움
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.address === '') {
      alert('주소를 입력해 주세요.');
      return;
    }

    showConfirmModal({
      title: '접수 확인',
      description: '접수하시겠습니까?',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => handleSubmit(),
    });
  };

  // 실제 submit 함수 (내부에서만 사용)
  const handleSubmit = async () => {
    try {
      // API 스펙에 맞게 데이터 변환
      const apiData: InsurtechClaimData = {
        cliamNo: formData.cliamNo,
        customerTellNo: formData.customerTellNo,
        address: formData.address,
        addressDetail: formData.addressDetail,
        leakCause: formData.leakCause,
        insuredPreference: formData.insuredPreference,
        insuranceCreateNote: formData.insuranceCreateNote,
        caseType: formData.type,
      };

      await submitToInsurtech(apiData);

      alert('접수가 완료되었습니다.');
      // 폼 초기화
      setFormData({
        cliamNo: '',
        customerTellNo: '',
        address: '',
        addressDetail: '',
        leakCause: '',
        insuredPreference: '',
        insuranceCreateNote: '',
        type: 'CAUSE',
      });

      navigate('/list');
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">사고 접수</h2>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* 사고번호 */}
                <div>
                  <label htmlFor="cliamNo" className="block text-sm font-medium text-gray-700 mb-2">
                    사고번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cliamNo"
                    name="cliamNo"
                    value={formData.cliamNo}
                    onChange={handleInputChange}
                    placeholder="사고 번호를 입력해 주세요"
                    className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    required
                  />
                </div>

                {/* 연락처 */}
                <div>
                  <label
                    htmlFor="customerTellNo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    피보험자 연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="customerTellNo"
                    name="customerTellNo"
                    value={formData.customerTellNo}
                    onChange={handleInputChange}
                    placeholder="연락처를 입력해 주세요"
                    className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    required
                  />
                </div>

                {/* 주소 */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    피보험자 주소 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      placeholder="주소 검색"
                      className="py-2 px-4 mt-1 block w-[80%] rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm bg-gray-50"
                      required
                      disabled
                    />
                    <button
                      type="button"
                      onClick={() => setIsAddressModalOpen(true)}
                      className="w-[20%] mt-1 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:text-sm text-sm flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="addressDetail"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    상세주소
                  </label>
                  <input
                    type="text"
                    id="addressDetail"
                    name="addressDetail"
                    value={formData.addressDetail}
                    onChange={handleInputChange}
                    placeholder="상세주소 입력"
                    className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  />
                </div>

                {/* 피보험자 타입 */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    피보험자 유형 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    {[
                      { value: 'CAUSE', label: '원인' },
                      { value: 'VICTIM', label: '피해' },
                    ].map(type => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setFormData(prev => ({
                            ...prev,
                            type: type.value as 'CAUSE' | 'VICTIM',
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
                  <label
                    htmlFor="leakCause"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    누수원인
                  </label>
                  <div className="relative">
                    <textarea
                      id="leakCause"
                      name="leakCause"
                      value={formData.leakCause}
                      onChange={handleInputChange}
                      placeholder="원인을 입력해 주세요"
                      maxLength={1000}
                      rows={4}
                      className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                    <div className="absolute right-2 bottom-2 text-sm text-gray-400">
                      {formData.leakCause.length} / 1000
                    </div>
                  </div>
                </div>

                {/* 피보험자 성향 */}
                <div className="relative">
                  <label
                    htmlFor="insuredPreference"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    피보험자 성향 <span className="text-gray-400">(선택 사항)</span>
                  </label>
                  <textarea
                    id="insuredPreference"
                    name="insuredPreference"
                    value={formData.insuredPreference}
                    onChange={handleInputChange}
                    placeholder="성향을 입력해 주세요"
                    rows={2}
                    maxLength={1000}
                    className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  />
                  <div className="absolute right-2 bottom-2 text-sm text-gray-400">
                    {formData.insuredPreference.length} / 1000
                  </div>
                </div>

                {/* 특이사항 */}
                <div className="relative">
                  <label
                    htmlFor="insuranceCreateNote"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    특이사항 <span className="text-gray-400">(선택 사항)</span>
                  </label>
                  <textarea
                    id="insuranceCreateNote"
                    name="insuranceCreateNote"
                    value={formData.insuranceCreateNote}
                    onChange={handleInputChange}
                    placeholder="기타 특이사항을 입력해 주세요. (추가 연락처 등 기재)"
                    maxLength={1000}
                    rows={4}
                    className="py-2 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  />
                  <div className="absolute right-2 bottom-2 text-sm text-gray-400">
                    {formData.insuranceCreateNote.length} / 1000
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

      {/* 주소 검색 모달 */}
      <AddressSearchModal
        open={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onComplete={handleComplete}
      />

      {/* 확인 모달 */}
      <Modal open={isConfirmModalOpen} {...confirmModalProps} />
    </Layout>
  );
}
