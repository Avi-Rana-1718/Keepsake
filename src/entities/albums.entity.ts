import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('albums')
export class AlbumsEntity {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({nullable: false, default: "Untitled Album"})
    albumName: string;

    @Column({nullable: false})
    userId: string;
    
    @Column({nullable: false, default: true})
    is_active?: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;

    @Column({ type: 'timestamp'})
    updated_at?: Date;

    @Column("json", {nullable: true})
    metadata?: {
        size: number,
        totalMedia: number
    }
}