import { Body, Controller, Get, Param, Post, Session, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ResponseInterface } from "src/common/interfaces/response.interface";
import type { SessionInterface } from "src/common/interfaces/session.interface";
import { MediaService } from "./media.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AuthInterceptor } from 'src/interceptors/AuthInterceptor';

@UseInterceptors(AuthInterceptor)
@Controller("media")
export class MediaController {
   constructor(private readonly mediaService: MediaService) {}

   @Post("/upload/:albumId")
   @UseInterceptors(FilesInterceptor("files"))
   async uploadImages(@UploadedFiles() files: Express.Multer.File[], @Session() session: SessionInterface, @Param("albumId") albumId: string): Promise<ResponseInterface> {
      return this.mediaService.uploadImages(files, albumId, session.userId);
   }

   @Get("/:albumId")
   async getImages(@Session() session: SessionInterface, @Param("albumId") albumId: string): Promise<ResponseInterface> {
      return this.mediaService.getAllMediaAlbum(albumId, session.userId);
   }

   @Get("/")
   async getAllUserMedia(@Session() session: SessionInterface): Promise<ResponseInterface> {
      return this.mediaService.getAllUserMedia(session.userId);
   }
}