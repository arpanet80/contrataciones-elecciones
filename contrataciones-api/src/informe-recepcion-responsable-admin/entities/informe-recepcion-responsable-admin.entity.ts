import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('informerecepcionresponsableadmin')
export class InformeRecepcionResponsableAdmin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombrecompleto: string;

    @Column()
    cargo: string;

    @Column()
    activo: boolean;

}
