import { Solproceso } from "src/solproceso/entities/solproceso.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipoproceso')
export class Tipoproceso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({default: true})
    activo: boolean;

    @OneToMany((type) => Solproceso, solproceso => solproceso.tipoproceso)
    Solprocesos: Solproceso[];
}
