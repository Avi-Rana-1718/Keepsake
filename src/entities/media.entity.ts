import { MediaTypes } from "src/common/enums/MediaTypes.enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("media")
export class MediaEntity {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({nullable: true})
    albumId: string;

    @Column({nullable: false})
    userId: string;

    @Column({nullable: false})
    url: string;

    @Column({nullable: false})
    size: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    added_at?: Date;

    @Column({
        type: "enum",
        enum: MediaTypes,
        nullable: false
    })
    type: MediaTypes;

    @Column({nullable: false, default: true})
    is_active?: boolean;
}