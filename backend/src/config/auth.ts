import { sign } from 'jsonwebtoken';

export const jwtConfig = {
  expiresIn: '1d',
  secret: process.env.JWT_SECRET || '',
};

export const tokenSignature = async (passHashed: string): Promise<string> => {
  const token = sign({ data: passHashed }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
    algorithm: 'HS256',
  });

  return token;
};
