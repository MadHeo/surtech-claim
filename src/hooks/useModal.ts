import { useCallback, useState } from 'react';

// useModal 훅에서 사용할 모달 props 타입 정의
interface UseModalProps {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// useModal 커스텀 훅
export function useModal() {
  // 모달 오픈 여부
  const [open, setOpen] = useState(false);
  // 모달에 전달할 props
  const [modalProps, setModalProps] = useState<UseModalProps>({
    onConfirm: () => {},
    onCancel: () => {},
  });

  // 모달 열기 함수
  const showModal = useCallback((props: Partial<UseModalProps>) => {
    setModalProps({
      title: props.title,
      description: props.description,
      confirmText: props.confirmText,
      cancelText: props.cancelText,
      // onCancel: 모달 닫기 + 사용자 정의 onCancel
      onCancel: () => {
        setOpen(false);
        props.onCancel && props.onCancel();
      },
      // onConfirm: 모달 닫기 + 사용자 정의 onConfirm
      onConfirm: () => {
        setOpen(false);
        props.onConfirm && props.onConfirm();
      },
    });
    setOpen(true);
  }, []);

  // 모달 강제 닫기 함수
  const closeModal = useCallback(() => setOpen(false), []);

  return {
    open,
    modalProps,
    showModal,
    closeModal,
  };
}
