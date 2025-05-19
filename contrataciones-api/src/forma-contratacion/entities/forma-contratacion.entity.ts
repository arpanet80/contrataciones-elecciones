import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('formacontratacion')
export class FormaContratacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    detalle: string;

    @Column({default: true})
    activo: boolean
}
