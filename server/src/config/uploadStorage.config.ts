import { BadRequestException } from '@nestjs/common';
import { genSaltSync } from 'bcryptjs';
import { diskStorage } from 'multer';

export const storageConfig = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const staticPath = `./public/${file.fieldname}`;
      return callback(null, staticPath);
    },
    filename: (req, file, callback) => {
      const salt = genSaltSync().replace(/[\/|\\]/g, 'a');
      const name = `${salt}-${file.originalname}`;
      return callback(null, name);
    },
  }),
  fileFilter: (req, file, callback) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const allowedType = mimetypes.some(type => type === file.mimetype);
    if (allowedType) {
      callback(null, true);
    } else {
      callback(new BadRequestException(`不能上传${file.mimetype}类型`), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
};
