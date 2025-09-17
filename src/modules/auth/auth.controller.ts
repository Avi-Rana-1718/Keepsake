import { Body, Controller, Post, Session } from "@nestjs/common";
import { ResponseInterface } from "src/common/interfaces/response.interface";
import { AuthService } from "./auth.service";
import { CreateDto } from "./dto/create.dto";
import { LoginDto } from "./dto/login.dto";
import type { SessionInterface } from "src/common/interfaces/session.interface";

@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post("/create")
    async createUser(@Body() createDto: CreateDto): Promise<ResponseInterface> {
        return await this.authService.createUser(createDto)
    }

    @Post("/login")
    async loginUser(@Body() loginDto: LoginDto, @Session() session: SessionInterface): Promise<ResponseInterface> {
        return await this.authService.loginUser(loginDto, session);
    }
}