import { Tipoproceso } from "src/tipoproceso/entities/tipoproceso.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('solproceso')
export class Solproceso {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    idtipoproceso: number;

    @Column()
    idunidadoperativa: number;

    @Column()
    idusuariosolicitante: number;

    @Column()
    idformacontratacion: number;

    @Column({ type: 'date' })
    fechasolicitud: Date;

    @Column()
    correlativounidad: number;

    @Column()
    objetocontratacion: string;

    @Column()
    cantidadtotal: number;
    
    @Column()
    idformaadjudic: number;
    
    @Column()
    idmetodoseleccionadjudic: number;
    
    @Column()
    idusuarioaprobador?: number;
    
    @Column()
    idusuariorpa: number;
    
    @Column()
    idestadoproceso: number
    
    @Column()
    idplan: number;
 
    @Column({ type: 'numeric' })
    preciototal: number;
    
    @Column({ type: 'numeric' })
    preciounitariototal: number;
    
    @Column()
    justificacion: string;
    
    @Column()
    especificaciones: string;

    @Column()
    plazoentrega: number;
    
    @Column()
    condicionescomplementarias:string;
    
    @Column()
    formalizacion: string;
    
    @Column()
    lugarentrega: string;
    
    @Column()
    instalacion: string;
    
    @Column()
    garantia: string;

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
    
    @ManyToOne((type) => Tipoproceso, tipoproceso => tipoproceso.Solprocesos, { eager: true, cascade: true})
    @JoinColumn({ name: 'idtipoproceso' })
    tipoproceso: Tipoproceso;

    @Column({default: true})
    activo?: boolean;
    

    ////////PAC ///////////////
    @Column()
    codigopac?: number;

    ///////////////////////
    @Column()
    observaciones?: string;
    
    //////// PAC /////////////////
    @Column()
    iddocumentoreferencia?: number;

    @Column()
    numerofojas?: number;

    @Column()
    plazoentregaliteral:string;
    
    @Column()
    descripcion: string;

    certificacion: any
    requerimientos: any;
    itemsProceso?: any;

}
