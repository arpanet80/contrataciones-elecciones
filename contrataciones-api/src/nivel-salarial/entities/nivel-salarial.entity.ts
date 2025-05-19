import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('nivel salarial')
export class NivelSalarial {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nivelsalarial: string;

    @Column({default: true})
    activo: boolean;
}
