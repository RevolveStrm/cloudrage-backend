import * as crypto from 'crypto';

export const generateId = () => {
  return Array(18)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
};

export const normalizeFileName = (_, file, callback) => {
  const fileExtName = file.originalname.split('.').pop();

  if (!fileExtName) {
    throw new Error('FILE_EXTENSION_NOT_FOUND');
  }
  callback(null, `${generateId()}.${fileExtName}`);
};

export const generateRandomJWT = () => {
  return crypto.randomBytes(64).toString('hex');
};
