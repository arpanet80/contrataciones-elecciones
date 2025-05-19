import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCertificadoPresupuestarioDto {

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idsolproceso: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    numeropreventivo: number;

    // @IsString()
    // @IsNotEmpty({ message: '' })
    // fechaemision: Date;

    @IsString()
    @IsNotEmpty({ message: '' })
    partida: string;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    importe: number;

    @IsOptional()
    @IsBoolean()
    activo: boolean
}
