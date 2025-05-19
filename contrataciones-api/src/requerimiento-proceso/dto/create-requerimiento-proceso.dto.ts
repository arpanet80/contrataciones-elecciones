import { Transform, Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRequerimientoProcesoDto {

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idsolproceso: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idrequerimientoplan: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idunidadmedida: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idproveedor?: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    partida: number;

    @IsNotEmpty({ message: 'El campo requerimiento no puede estar vacío.' })
    @IsString()
    requerimiento: string;

    @IsOptional()
    @IsBoolean()
    activo: boolean;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    cantidad: number;

    @IsNotEmpty({ message: 'El campo preciounitario no puede estar vacío.' })
    @IsNumber({maxDecimalPlaces: 2})
    preciounitario: number;

    // @IsNotEmpty({ message: 'El campo preciototal no puede estar vacío.' })
    // @IsNumber({maxDecimalPlaces: 2})
    preciototal: number;

}
