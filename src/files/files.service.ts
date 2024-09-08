import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { FileType } from 'src/@types/file-types.enum';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly repository: Repository<File>,
  ) {}

  create(file: Express.Multer.File, userId: number): Promise<File> {
    return this.repository.save({
      fileName: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      user: { id: userId },
    });
  }

  findAll(userId: number, fileType: FileType): Promise<File[]> {
    const qb = this.repository.createQueryBuilder('file');

    qb.where('file.userId = :userId', { userId });

    if (fileType === FileType.IMAGES) {
      qb.andWhere('file.mime_type ILIKE :type', { type: '%image%' });
    }

    if (fileType === FileType.VIDEOS) {
      qb.andWhere('file.mime_type ILIKE :type', { type: '%video%' });
    }

    if (fileType === FileType.TRASH) {
      qb.withDeleted().andWhere('file.deleted_at IS NOT NULL');
    }

    return qb.getMany();
  }

  remove(userId: number, filesIds: string) {
    const filesIdsArray = filesIds.split(',');

    const qb = this.repository.createQueryBuilder('file');

    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: filesIdsArray,
      userId,
    });

    return qb.softDelete().execute();
  }
}
