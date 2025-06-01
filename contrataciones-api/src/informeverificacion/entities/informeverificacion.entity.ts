import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('informeverificacion')
export class Informeverificacion {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    idsolicitud: number;

    @Column({ type: 'timestamp' })
    fechainforme: Date;

    @Column()
    razonsocial: string;

    @Column()
    representantelegal: string;

    @Column()
    cedula: string;

    @Column({ type: 'date' })
    fechaentrega: Date;

    @Column()
    items: string;

    @Column({default: true})
    copianit: boolean;

    @Column({default: true})
    certificadonit: boolean;

    @Column({default: true})
    seprec: boolean;

    @Column({default: true})
    copiaci: boolean;

    @Column({default: true})
    gestora: boolean;

    @Column({default: true})
    sigep: boolean;

    @Column({default: true})
    formulario2b: boolean;

    @Column({default: true})
    rupe: boolean;

    @Column({default: true})
    cumpledocumentos: boolean;

    @Column({default: true})
    cumpleofertaadj: boolean;

    @Column({default: true})
    ofertatecnica: boolean;

    @Column({default: true})
    activo: boolean;

}
