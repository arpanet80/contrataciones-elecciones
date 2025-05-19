import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('requerimientoplansolproceso')
export class RequerimientoPlanSolproceso {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    idrequerimientoplan: number;

    @Column()
    idsolproceso: number;

    @Column('decimal')
    importe: number;

}
