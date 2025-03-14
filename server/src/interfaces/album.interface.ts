import { AlbumMember } from "./albumMember.interface"
import { Photo } from "./photo.interface"

export interface Album {
    albumName: String,
    albumID: String,
    ownerID: String,
    members: AlbumMember[],
    createdAt: number
}