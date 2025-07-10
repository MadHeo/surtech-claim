export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return '';
  if (phoneNumber.length) {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return phoneNumber;
};

// 한국식 날짜/시간 포맷 함수
export function formatDateTime(date: string | number | Date) {
  return new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

// 오늘 날짜인지 판별
export function isToday(date: string | number | Date): boolean {
  const d = new Date(date);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

// 이번 달(당월)인지 판별
export function isThisMonth(date: string | number | Date): boolean {
  const d = new Date(date);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

// 사고접수 리스트 아이템 타입 (공통)
export interface ListItem {
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

// 상태값에 따른 스타일 및 텍스트 반환 함수 (공통)
export function getStatusStyle(status: ListItem['status']) {
  switch (status) {
    case 'DISPATCH':
      return {
        bgColor: 'bg-blue-500',
        text: '접수',
        textColor: 'text-blue-500',
      };
    case 'CONSTRUCTION_SCHEDULING':
      return {
        bgColor: 'bg-green-400',
        text: '시공일정조율',
        textColor: 'text-green-400',
      };
    case 'CONSTRUCTION':
      return {
        bgColor: 'bg-green-500',
        text: '시공',
        textColor: 'text-green-500',
      };
    case 'COST':
      return {
        bgColor: 'bg-orange-500',
        text: '비용정산',
        textColor: 'text-orange-500',
      };
    case 'COMPLETED':
      return {
        bgColor: 'bg-gray-500',
        text: '종결',
        textColor: 'text-gray-500',
      };
    default:
      return {
        bgColor: 'bg-gray-300',
        text: '기타',
        textColor: 'text-gray-300',
      };
  }
}
