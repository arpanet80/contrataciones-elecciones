import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('funcionariosv')
export class Funcionario {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombres: string;

    @Column()
    paterno: string;

    @Column()
    materno: string;

    @Column()
    documento: string;

    @Column()
    cargo: string;
    
    @Column({default: true})
    activo?: boolean;
    
}
