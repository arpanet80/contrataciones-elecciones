import { TipoPlan } from "src/tipo-plan/entities/tipo-plan.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('proveedor')
export class Proveedor {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    idsolicitud: number;
    
    @Column()
    razonsocial: string;

    @Column()
    cirepresentantelegal: string;

    @Column()
    nombrecontacto?: string;

    @Column()
    representantelegal: string;
    
    @Column()
    nit: string;

    @Column({default: true})
    activo?: boolean;
    

}
