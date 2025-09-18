import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { AlbumsEntity } from 'src/entities/albums.entity';
import { CreateAlbumDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumsEntity)
    private albumsRepository: Repository<AlbumsEntity>,
  ) {}

  async getAlbumsForUser(userId: string): Promise<ResponseInterface> {
    const albums: AlbumsEntity[] | null = await this.albumsRepository.findBy({
      userId,
    });

    if (!albums) {
      throw new BadRequestException('No albums found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: albums.map((el) => ({
        name: el.albumName,
        id: el.id,
        createdAt: el.created_at,
        modifiedAt: el.updated_at,
        mediaCount: el?.metadata?.totalMedia || 0,
      })),
    };
  }

  async createAlbum(
    createAlbumDto: CreateAlbumDto,
    userId: string,
  ): Promise<ResponseInterface> {
    const { albumName } = createAlbumDto;
    const album: AlbumsEntity = {
      albumName: albumName,
      userId: userId
    };
    await this.albumsRepository.save(album);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created album!',
    };
  }
}
