import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('unidadmedida')
export class UnidadMedida {
     @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;

    @Column({default: true})
    activo: boolean
}
