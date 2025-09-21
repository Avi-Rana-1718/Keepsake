import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Embedding {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    userId: string;

    @Column({nullable: true})
    alias: string;
}