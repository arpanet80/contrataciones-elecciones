import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('certificadopresupuestario')
export class CertificadoPresupuestario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idsolproceso: number;

    @Column()
    numeropreventivo: number;

    @Column({ type: 'date' })
    fechaemision: Date;

    @Column()
    partida: string;

    @Column()
    importe: number;

    @Column({default: true})
    activo: boolean
}
