import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('informerecepcion')
export class InformeRecepcion {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    citememounidadsol: string;

    @Column()
    citememoadmin: string;

    @Column({ type: 'date' })
    fechamemo: Date;

    @Column()
    idresponsablerecepcionadmin: number;

    @Column({ type: 'timestamp' })
    fecharecepcion: Date;

    @Column()
    activo: boolean;

    @Column()
    idsolicitud: number;

    @Column()
    fechainforme: Date;
}
