const CARRER_NET_KEY = '06c2cdaf1d5fe582073b2ed44573c969';
const CARRER_NET_UNIVERSITY =
  "www.career.go.kr/cnet/openapi/getOpenApi?" +
  `apiKey=${CARRER_NET_KEY}&` +
  "svcType=api&" +
  "svcCode=SCHOOL&" +
  "contentType=json&" +
  "gubun=univ_list";

const SERVER_URL = "http://localhost:3000";

const GOOGLE_AUTH_URL = {
  expoClientId: '155502759784-acllog24skbdl2ml05vldv38844muegm.apps.googleusercontent.com',
  androidClientId: '155502759784-3cmortjrsecugber03afvnana9arlgl2.apps.googleusercontent.com',
  iosClientId: '155502759784-dd6blvf1to4thrtnol1qhd5q567b0n1o.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'https://mail.google.com/'],
};

export {
  CARRER_NET_KEY,
  CARRER_NET_UNIVERSITY,
  SERVER_URL,
  GOOGLE_AUTH_URL
}