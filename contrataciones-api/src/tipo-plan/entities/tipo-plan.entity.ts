import { Plan } from "src/planes/entities/plane.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipoplan')
export class TipoPlan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    abreviacion: string;

    @Column({default: true})
    activo: boolean;

    @OneToMany((type) => Plan, plan => plan.tipoplan)
    planes: Plan[];
}
