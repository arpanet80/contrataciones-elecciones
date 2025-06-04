import { Transform, Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateInformeRecepcionDto {

    @IsString()
    @IsNotEmpty()
    citememounidadsol: string;

    @IsString()
    @IsNotEmpty()
    citememoadmin: string;

    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    fechamemo: Date;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt({ message: 'Debe ser un numero entero' })
    idresponsablerecepcionadmin: number;

    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    fecharecepcion: Date;

    @IsOptional()
    @IsBoolean()
    activo: boolean;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt({ message: 'Debe ser un numero entero' })
    idsolicitud: number;
}
