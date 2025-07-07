import { JWT } from 'google-auth-library';
import { google } from 'googleapis';

// Google Sheets API 인증 정보
const CREDENTIALS = {
  type: 'service_account',
  project_id: 'surtech-claim-465202',
  private_key_id: '081c20f93ecdfe55ad9d115eccb8ec16a0b8d3cd',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkkjzhN8tkLOC+\ntn2F46O0TuYmfm0EtW30xFhPydYP5mSCmSVhNFel+AvZvOXuQUpIlQnE4OzaPmpn\nWgXV6IfphNp+3lsCAxUtO7M/OEoKPDHqYwkDJ66xLNlVdyZ4LBCba/1MmGqlmuFu\n1IRUTCzhKSsWllLd5Vn2re4g1RzwFp49ypEIYe6ryusSq4e4rJDGUebxQHjO0iI9\no2vyEspSnTrNRLy7RT5Gw5Gdv4alURc1fQ94JMq+T401SLxVetxgYUi0HCoEQnrp\n5PdrxDp6rQSf5KtUGcnFfIEMbtr/AJXTVt4YBNpN1IQ/AZ/ru42oTA4Krg9o+ZNY\nuqneQOqDAgMBAAECggEAAWzhNhojmtFNfDL2BCWkLB80aXtWBy2cr2Gb88tag6mJ\n9hxmPhQT+XRo6RCnwfGy0QCDCyXfjaxVg5U8ahpCqXt+R1o2c5GcEPFsn5mMAQN9\nP/uhMloy1Ln/6XhhghzvlkkDJcytvJPXOMlPNBbmZ85rElECLew0l6kkYAhrrb1t\npyFyYHZ5Hrf8OEq9O5OuEqdPgKyx3ui/Q3AF7jllBWOyfAXdV7arediK6CrolAYD\nl18g55vUFt+hBxcMG5571/1IZ0rQx026b59pFcotcUejH5Zurwvv6C50ZwkOus7J\nNUpUBgzqm4X8zu8Gb563mtsrujmdHO4sKjO+dhFjAQKBgQDQb0QCvkAXz2zPPN4L\nzl2mA9nmwIOvJhRFFgdpy/vmE7rbHbCYW6Z1YPTflo5PzlNiJ1A6cZYZmCpp2RYN\nphurjsXRcCX3u/5nB3klKoLJBsMmyGQLT3ei5eVnY88jgQvjvGg9+Q+5ZX3tk34d\nMkhl/dIlD4y7xHSv6Vb0o0ZgwwKBgQDKIHn4DMVMIVOVIA8v0hUp7sQ+Qfe3QXMY\nyWWhKGDWuOCgZf6wYWsxTVqIkxee4EkchrltI3PygEvKRlWuvszw68y4fpYBstbe\nDfgKXKZG8M+Gg0WCTiP6FBtBwk4Y+TaJpMMYdpKwfrYOOe5qnpcLiMAvyxPqCd7H\ne7LJ4b6zQQKBgQCL5mKrxK6YTK0n3B7dpcHNsEANVaINaW2pgUOwiy2kHBILCD6D\nxOBRYKZ7fD5A6qek9eYvlBW/UBcHvKHEv31LBSVZkgCp6xCybp2tiH8IFvXdjhs4\nTDpsqAn1/1QE7JTiYo9FKWqYcbq4P4siZaGac2cdYPaBATeg6ulmgkC2qQKBgHTR\nokyHbPwcAsecWMqlm4+5rHfi/n1OeWvo8jDbOmS/QyvQ5wsfsqky8NEgWjV7oSW4\ng7CdHeUY2zTTw6+UHLRdQ9uZZa8jomWCI0ox0/QKN5ahhenSqZ5eQoaV+zcZybhx\nnkQkO5GAGk5MkwvSDrAe4Bx/PUo1XClkx6dALkxBAoGAOC7AE5DMei2hJdMrqu71\n40+HSbNhmt1wu/IbQyRc0M35gLMPTrQVpU/uZy38a/2XtYWYmC+UAK+jQjoWgWNX\nE7XZd2GvWw2w7siR9qxEvAqEA/tuiwyCnwyKOE3DD4IgoP9/Z5pDOBg9w58TQx1F\nnT9HzYUaDCQIu6tyrkhPAiw=\n-----END PRIVATE KEY-----\n',
  client_email: 'kwanggi@surtech-claim-465202.iam.gserviceaccount.com',
  client_id: '114419270129295315912',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/kwanggi%40surtech-claim-465202.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

const SPREADSHEET_ID = '1fy0XiKK--WNu6j41T0qH-7DqAFNX2Y8jdT6Np4hhA6U';
const RANGE = 'Sheet1!A:H';

export async function appendToSheet(data: any) {
  try {
    const auth = new JWT({
      email: CREDENTIALS.client_email,
      key: CREDENTIALS.private_key,
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
