import { TipoPlan } from "src/tipo-plan/entities/tipo-plan.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('plan')
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    abreviacion: string;

    @Column({ unique: true })
    nombre: string;

    @Column()
    gestion: string;

    @Column()
    idfuncionario: number;
    
    @Column({default: true})
    activo?: boolean;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()", name: 'updated_at', onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @BeforeInsert()
    insertCreated() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    insertUpdated() {
        this.updatedAt = new Date();
    }

    @ManyToOne((type) => TipoPlan, tipoplan => tipoplan.planes, { eager: true, cascade: true})
        @JoinColumn({ name: 'idtipoplan' })
        tipoplan: TipoPlan;


}
