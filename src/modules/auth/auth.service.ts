import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { SessionInterface } from 'src/common/interfaces/session.interface';
import * as bcrypt from "bcrypt";
import { AlbumsEntity } from 'src/entities/albums.entity';
import { MediaEntity } from 'src/entities/media.entity';
import * as uuid from "uuid"

@Injectable()
export class AuthService {

  saltRound = 10;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AlbumsEntity)
    private albumRepository: Repository<AlbumsEntity>
  ) {}

  async createUser(createDto: CreateDto): Promise<ResponseInterface> {
    const { email, password, username } = createDto;

    if(await this.userRepository.existsBy({email, is_active: false}))
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED, "Your account is currently disabled or banned. Please contact support if you believe this is a mistake.")

    if (await this.userRepository.existsBy({ email }))
      throw new BadRequestException(HttpStatus.BAD_REQUEST,'A user with this email already exists. Please use a different email address or log in if you already have an account.');

    
    const hash = await bcrypt.hash(password, this.saltRound);

    let user = new UserEntity();
    user.id = uuid.v4();
    user.email = email;
    user.username = username;
    user.password = hash;

    let album: AlbumsEntity = {
      id: uuid.v4(),
      albumName: "Favorite",
      userId: user.id,
      content: []
    };

    user.favoriteAlbumID = album.id;

    await this.userRepository.save(user);
    await this.albumRepository.save(album);
    
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Your account has been created successfully!'
    };
  }

  async loginUser(loginDto: LoginDto, session: SessionInterface): Promise<ResponseInterface> {
    const { email, password } = loginDto;

    const user: UserEntity | null = await this.userRepository.findOneBy({
      email, is_active: true
    });

    if (!user) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        'No active account found with this email address.',
      );
    }

    if(await bcrypt.compare(password, user.password)===false) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED, 'Incorrect email or password. Please try again.');
    }

    session.userId = user.id;

    return {
      statusCode: HttpStatus.OK,
      message: `Login successful! Welcome back, ${user.username}.`,
    };
  }
}
