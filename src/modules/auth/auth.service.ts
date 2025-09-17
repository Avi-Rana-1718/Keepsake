import {
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { SessionInterface } from 'src/common/interfaces/session.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createDto: CreateDto): Promise<ResponseInterface> {
    const { email, password, username } = createDto;

    if (await this.userRepository.existsBy({ email }))
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        'A user with this email already exists!',
      );

    const user = new UserEntity();
    user.email = email;
    user.username = username;
    user.password = password; // encrypt this

    this.userRepository.save(user);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created user!'
    };
  }

  async loginUser(loginDto: LoginDto, session: SessionInterface): Promise<ResponseInterface> {
    const { email, password } = loginDto;

    const user: UserEntity | null = await this.userRepository.findOneBy({
      email,
      password,
    });

    if (!user) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        'Invalid email and password combination.',
      );
    }

    session.userId = user.id;

    return {
      statusCode: HttpStatus.OK,
      message: 'Logged user in! ID: ' + user.id,
    };
  }
}
