import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('requerimientoproceso')
export class RequerimientoProceso {

    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    idsolproceso: number;

    @Column()
    idrequerimientoplan: number;

    @Column()
    idunidadmedida: number;

    @Column()
    cantidad: number;

    @Column()
    idproveedor?: number;

    @Column()
    partida: number;

    @Column({default: true})
    activo?: boolean;

    @Column('decimal')
    preciounitario: number;

    @Column('decimal')
    preciototal: number;

    @Column()
    requerimiento: string;

}
