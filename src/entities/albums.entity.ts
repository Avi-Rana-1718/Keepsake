import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('albums')
export class AlbumsEntity {
    @PrimaryColumn("uuid")
    id: string;

    @Column({nullable: false, default: "Untitled Album"})
    albumName: string;

    @Column({nullable: false})
    userId: string;
    
    @Column({nullable: false, default: true})
    is_active?: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;

    @Column({ type: 'timestamp', nullable: true})
    updated_at?: Date;

    @Column("text", {array: true})
    content: string[];

    @Column("json", {nullable: true})
    metadata?: {
        size: number,
        totalMedia: number
    }
}