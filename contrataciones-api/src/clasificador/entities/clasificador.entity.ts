import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Clasificador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    partida: string;

    @Column()
    descripcion: string
}
