import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDatosPacDto {

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idsolproceso: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    codigopac: number;

    @IsString()
    @IsOptional()
    fechaprogramada?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: '' })
    cantdocadjuntos?: number;

    @IsOptional()
    activo?: boolean;
}
