import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('datospac')
export class DatosPac {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    idsolproceso: number;

    @Column()
    codigopac: number;

    @Column({ type: 'date' })
    fechaprogramada: Date;

    @Column()
    cantdocadjuntos?: number;

    @Column({default: true})
    activo?: boolean;

}
