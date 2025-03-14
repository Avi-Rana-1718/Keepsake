type Roles = "Owner" | "Editor" | "Guest" | "Invited";

export interface AlbumMember {
    email: String,
    invitedAt: Number,
    role: Roles
}