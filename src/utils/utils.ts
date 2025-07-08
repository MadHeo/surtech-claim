export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return '';
  if (phoneNumber.length === 10) {
    return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return phoneNumber;
};
