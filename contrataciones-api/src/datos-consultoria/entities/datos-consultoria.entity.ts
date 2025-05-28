import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('datosconsultoria')
export class DatosConsultoria {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    idsolproceso: number;

    @Column()
    nivelsalarial: number;

    @Column()
    tiempocontrato: number;

    @Column()
    honorariomensual: number;

    @Column()
    numerocasos: number;

    @Column({default: true})
    activo?: boolean;

    @Column()
    observaciones?: string;

}
