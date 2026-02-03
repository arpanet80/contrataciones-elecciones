import { IsString } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('requerimientoplanpoe')
export class Requerimientoplan {

    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    idplan: number;

    @Column()
    idunidadorganizacional: number;

    @Column()
    partida: string;

    @Column()
    fuente: string;

    @Column()
    requerimiento: string;

    @Column()
    unidad: string;

    @Column()
    cantidad: number;

    @Column()
    preciounitario: number;

    @Column()
    plazo: number;

    @Column()
    inicial: number;

    @Column()
    movimientomas: number;

    @Column()
    movimientomenos: number;

    @Column()
    actual: number;

    @Column()
    certificacion: number;

    @Column()
    saldo: number;

    @Column()
    actividad: string;

    @Column()
    resultadosalcanzados: string;

    @Column()
    idfuncionarioimport: number;

    @Column({default: true})
    activo?: boolean

    @Column({default: true})
    codigopac?: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", name: 'created_at'})
    createdAt?: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()", name: 'updated_at', onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt?: Date;

    @BeforeInsert()
    insertCreated() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    insertUpdated() {
        this.updatedAt = new Date();
    }

    ///////////////////////// desde aqui para POE /////////////////////////////////////

    @Column()
    fechaimporte: Date;

    @Column()
    objetocontratacion: string;

    @Column()
    tipocontratacion: number;

    @Column()
    modalidadcontratacion: number;

    @Column()
    pac: boolean;

    @Column()
    messolicitud: number;

    @Column()
    mespublicacion: number;

    @Column()
    mespago: number;

    @Column()
    categoria: number;

    @Column()
    obs: string;

    @Column()
    responsable: number;

}
