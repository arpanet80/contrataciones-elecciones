import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('estadoproceso')
export class EstadoProceso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;

    @Column({default: true})
    activo: boolean
}
