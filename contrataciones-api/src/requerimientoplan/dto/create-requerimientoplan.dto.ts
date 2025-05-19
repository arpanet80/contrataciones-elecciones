import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRequerimientoplanDto {
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idplan: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idunidadorganizacional: number;

    @IsString()
    @IsNotEmpty({ message: '' })
    partida: string;
    
    @IsString()
    @IsNotEmpty({ message: '' })
    fuente: string;

    @IsString()
    @IsNotEmpty({ message: '' })
    requerimiento: string;

    @IsString()
    @IsNotEmpty({ message: '' })
    unidad: string;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    cantidad: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    preciounitario: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    plazo: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    inicial: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    movimientomas: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    movimientomenos: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    actual: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    certificacion: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    saldo: number;

    @IsString()
    @IsNotEmpty({ message: '' })
    actividad: string;

    @IsString()
    @IsNotEmpty({ message: '' })
    resultadosalcanzados: string;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idfuncionarioimport: number;

    @IsOptional()
    @IsBoolean()
    activo?: boolean

    @IsOptional()
    updatedAt?: Date;
}
