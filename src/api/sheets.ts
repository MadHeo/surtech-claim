import { JWT } from 'google-auth-library';
import { google } from 'googleapis';

// 환경 변수에서 Google Sheets API 인증 정보 가져오기
const getCredentials = () => {
  return {
    type: 'service_account',
    project_id: import.meta.env.VITE_GOOGLE_PROJECT_ID,
    private_key_id: import.meta.env.VITE_GOOGLE_PRIVATE_KEY_ID,
    private_key: import.meta.env.VITE_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: import.meta.env.VITE_GOOGLE_CLIENT_EMAIL,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(import.meta.env.VITE_GOOGLE_CLIENT_EMAIL)}`,
    universe_domain: 'googleapis.com',
  };
};

// 환경 변수에서 스프레드시트 ID와 범위 가져오기
const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;
const RANGE = import.meta.env.VITE_GOOGLE_SHEETS_RANGE || 'Sheet1!A:H';

export async function appendToSheet(data: any) {
  try {
    const credentials = getCredentials();

    // 필수 환경 변수 확인
    if (!credentials.client_email || !credentials.private_key || !SPREADSHEET_ID) {
      throw new Error('필수 Google Sheets 환경 변수가 설정되지 않았습니다.');
    }

    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth: auth as any });

    const values = [
      [
        data.title,
        data.accidentNumber,
        data.phone,
        data.address,
        data.addressDetail,
        data.cause,
        data.type,
        data.note,
      ],
    ];

    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values,
      },
    };

    const response = await sheets.spreadsheets.values.append(request);
    return response.data;
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}
