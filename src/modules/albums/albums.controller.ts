import { Body, Controller, Delete, Get, Param, Post, Query, Session, UseInterceptors } from "@nestjs/common";
import { ResponseInterface } from "src/common/interfaces/response.interface";
import { CreateAlbumDto } from "./dto/create.dto";
import { AlbumsService } from "./albums.service";
import type { SessionInterface } from "src/common/interfaces/session.interface";
import { AuthInterceptor } from "src/interceptors/AuthInterceptor";

@UseInterceptors(AuthInterceptor)
@Controller("albums")
export class AlbumsController {

    constructor(private readonly albumsService: AlbumsService) {}

    @Get()
    async getAlbumsById(@Session() session: SessionInterface): Promise<ResponseInterface> {
        return await this.albumsService.getAlbumsForUser(session.userId);
    }

    @Post("/create")
    async createAlbum(@Body() createAlbumDto: CreateAlbumDto, @Session() session: SessionInterface): Promise<ResponseInterface> {
        return await this.albumsService.createAlbum(createAlbumDto, session.userId);
    }

    @Delete("delete")
    async deleteAlbum(@Query("id") id: string) {

    }
}