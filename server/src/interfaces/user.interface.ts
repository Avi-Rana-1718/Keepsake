import { Album } from "./album.interface";

export interface User {
    email: String,
    password: String,
    username?: String,
    createdAt?: number,
    albums?: String[]
}
