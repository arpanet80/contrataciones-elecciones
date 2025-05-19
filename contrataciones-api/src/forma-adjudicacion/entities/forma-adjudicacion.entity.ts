import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('formaadjudicacion')
export class FormaAdjudicacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    detalle: string;

    @Column({default: true})
    activo: boolean
}
