import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rpa')
export class Rpa {
    @PrimaryGeneratedColumn()
    id?: number;
        
    @Column({ unique: true })
    idusuario?: number;

    // @Column()
    nombreapellidos?: string;

    @Column({default: true})
    activo?: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", name: 'fecharegistro'})
    fecharegistro?: Date;
    
    @BeforeInsert()
    insertCreated() {
        this.fecharegistro = new Date();
    }
    
}
