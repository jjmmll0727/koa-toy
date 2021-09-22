import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwtKey';
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export const sign = async (user : any) => {
  const payload = {
    userId: user.userId,
    name: user.name
  }; // token에 암호화되어 저장되는 값
  const token = jwt.sign(payload, jwtConfig.secretKey, jwtConfig.options);
  return token;
};
export const verify = async (token : any) => {
  let decoded: string | jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, jwtConfig.secretKey); // 결국 decoded 변수에 payload가 담기는 꼴
  } catch (err : any) {
    if (err.message === 'jwt expired') {
      console.log('expired token');
      return TOKEN_EXPIRED;
    } else {
      console.log('invalid token');
      return TOKEN_INVALID;
    }
  }
  return decoded;
};
