import { diskStorage } from 'multer';
import { normalizeFileName } from 'src/utils/utils';

export const fileStorage = diskStorage({
  destination: './uploads',
  filename: normalizeFileName,
});
