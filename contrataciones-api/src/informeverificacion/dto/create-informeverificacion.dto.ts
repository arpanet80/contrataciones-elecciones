import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateInformeverificacionDto {

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt({ message: 'Debe ser un numero entero' })
    idsolicitud: number;

    @IsOptional()
    fechainforme: Date;

    @IsString()
    @IsNotEmpty()
    razonsocial: string;

    @IsString()
    @IsNotEmpty()
    representantelegal: string;

    @IsString()
    @IsNotEmpty()
    cedula: string;

    @IsString()
    @IsNotEmpty()
    fechaentrega: string;

    @IsString()
    @IsOptional()
    items: string;

    @IsOptional()
    @IsBoolean()
    copianit: boolean;

    @IsOptional()
    @IsBoolean()
    certificadonit: boolean;

    @IsOptional()
    @IsBoolean()
    seprec: boolean;

    @IsOptional()
    @IsBoolean()
    copiaci: boolean;

    @IsOptional()
    @IsBoolean()
    gestora: boolean;

    @IsOptional()
    @IsBoolean()
    sigep: boolean;

    @IsOptional()
    @IsBoolean()
    formulario2b: boolean;

    @IsOptional()
    @IsBoolean()
    rupe: boolean;

    @IsOptional()
    @IsBoolean()
    cumpledocumentos: boolean;

    @IsOptional()
    @IsBoolean()
    ofertatecnica: boolean;

    @IsOptional()
    @IsBoolean()
    cumpleofertaadj: boolean;
    
}
