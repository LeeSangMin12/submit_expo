export const CARRER_NET_KEY = '06c2cdaf1d5fe582073b2ed44573c969';
export const CARRER_NET_UNIVERSITY =
  "www.career.go.kr/cnet/openapi/getOpenApi?" +
  `apiKey=${CARRER_NET_KEY}&` +
  "svcType=api&" +
  "svcCode=SCHOOL&" +
  "contentType=json&" +
  "gubun=univ_list";

export const SERVER_URL = `https://port-0-submit-server-ac2nlkq7twkt.sel4.cloudtype.app`;

export const REDIRECT_URI = 'https://auth.expo.io/@sangminleee/submit_expo';

export const GOOGLE_AUTH_URL =
  "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?" +
  "response_type=code&" +
  "client_id=155502759784-lc91rr15k6sh8qr7m97prlsogkc2ts88.apps.googleusercontent.com&" +
  `redirect_uri=${REDIRECT_URI}&` +
  "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://mail.google.com/&" +
  "access_type=offline&" +  //refresh token 발급
  "prompt=consent";  //refresh token 발급