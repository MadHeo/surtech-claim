// 전역적으로 사용할 수 있는 확인/취소 모달 컴포넌트
interface ModalProps {
  open: boolean; // 모달 오픈 여부
  title?: string; // 모달 제목
  description?: string; // 모달 내용
  confirmText?: string; // 확인 버튼 텍스트
  cancelText?: string; // 취소 버튼 텍스트
  onConfirm: () => void; // 확인 버튼 클릭 시 실행 함수
  onCancel: () => void; // 취소 버튼 클릭 시 실행 함수
}

export default function Modal({
  open,
  title = '확인',
  description = '',
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50 p-6">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        {/* 모달 제목 */}
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {/* 모달 설명 */}
        <div className="mb-6 text-gray-700 whitespace-pre-line">{description}</div>
        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={onCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 rounded-md bg-sky-500 text-white hover:bg-sky-600"
            onClick={onConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
