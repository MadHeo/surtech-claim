import DaumPostcode from 'react-daum-postcode';

// 주소 검색 모달 컴포넌트의 props 타입 정의
interface AddressSearchModalProps {
  open: boolean; // 모달 오픈 여부
  onClose: () => void; // 닫기 버튼 클릭 시 실행 함수
  onComplete: (data: any) => void; // 주소 선택 완료 시 실행 함수
}

export default function AddressSearchModal({ open, onClose, onComplete }: AddressSearchModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">주소 검색</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">닫기</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <DaumPostcode onComplete={onComplete} autoClose={false} style={{ height: 400 }} />
      </div>
    </div>
  );
}
