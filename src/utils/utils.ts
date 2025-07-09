export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return '';
  if (phoneNumber.length) {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return phoneNumber;
};
