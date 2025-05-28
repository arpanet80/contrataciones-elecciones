import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDatosConsultoriaDto {

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idsolproceso: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    nivelsalarial: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    tiempocontrato: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    numerocasos: number;

    @IsNotEmpty({ message: 'El campo importe no puede estar vacío.' })
    @IsNumber({maxDecimalPlaces: 2})
    honorariomensual: number;

    @IsOptional()
    @IsBoolean()
    activo?: boolean;

    @IsString()
    @IsOptional()
    observaciones?: string;
}
