import { Transform, Type } from "class-transformer";
import { IsDecimal, IsInt, IsNotEmpty, IsNumber, Matches } from "class-validator";

export class CreateRequerimientoPlanSolprocesoDto {

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idrequerimientoplan: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idsolproceso: number;

    @IsNotEmpty({ message: 'El campo importe no puede estar vacío.' })
    @IsNumber({maxDecimalPlaces: 2})
    importe: number; 
}
