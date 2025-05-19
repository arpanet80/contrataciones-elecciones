import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('metodoseleccionadjudic')
export class MetodoSeleccionAdjudic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    detalle: string;

    @Column({default: true})
    activo: boolean
}
