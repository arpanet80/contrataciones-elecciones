import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('documentoreferencia')
export class DocumentoReferencia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    detalle: string;

    @Column({default: true})
    activo: boolean
}
