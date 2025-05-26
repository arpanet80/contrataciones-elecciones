import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSolprocesoDto {
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idtipoproceso: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idunidadoperativa: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idusuariosolicitante: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idformacontratacion: number;
    
    // @IsNotEmpty({ message: '' })
    // @Type(() => Number)
    // @IsInt({ message: '' })
    // correlativounidad: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    cantidadtotal: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    iddocumentoreferencia: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idestadoproceso: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    numerofojas: number;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idformaadjudic: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idmetodoseleccionadjudic: number;

    // @IsNotEmpty({ message: '' })
    // @Type(() => Number)
    // @IsInt({ message: '' })
    idusuarioaprobador?: number;
    
    // @IsNotEmpty({ message: '' })
    // @Type(() => Number)
    // @IsInt({ message: '' })
    // idusuariorpa: number;
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idplan: number;
    
    /*@IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })*/
    @IsNotEmpty({ message: 'El campo importe no puede estar vacío.' })
    @IsNumber({maxDecimalPlaces: 2})
    preciototal: number;

    // @IsNotEmpty({ message: '' })
    // @Type(() => Number)
    // @IsInt({ message: '' })
    preciounitariototal: number;
    
    @IsString()
    @IsNotEmpty({ message: '' })
    objetocontratacion: string;

    // @IsString()
    // @IsNotEmpty({ message: '' })
    fechasolicitud: string;

    @IsString()
    @IsOptional()
    observaciones?: string;

    @IsOptional({ message: '' })
    @IsString()
    // @IsNotEmpty({ message: '' })
    justificacion: string;

    @IsOptional({ message: '' })
    @IsString()
    // @IsNotEmpty({ message: '' })
    especificaciones: string;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    plazoentrega: number;

    @IsOptional({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    codigopac: number

    @IsOptional({ message: '' })
    @IsString()
    // @IsNotEmpty({ message: '' })
    condicionescomplementarias:string;

    @IsOptional({ message: '' })
    @IsString()
    // @IsNotEmpty({ message: '' })
    formalizacion: string;

    @IsOptional({ message: '' })
    @IsString()
    // @IsNotEmpty({ message: '' })
    lugarentrega: string;

    @IsOptional({ message: '' })
    @IsString()
    // @IsNotEmpty({ message: '' })
    instalacion: string;

    @IsOptional({ message: '' })
    @IsString()
    // @IsNotEmpty({ message: '' })
    garantia: string;

    @IsOptional()
    @IsBoolean()
    activo: boolean;

    @IsOptional()
    updatedAt?: Date;

    @IsOptional({ message: '' })
    certificacion: any
    @IsOptional({ message: '' })
    requerimientos: any;
    @IsOptional({ message: '' })
    itemsProceso?: any;    

    ////////////////// Daotos consultoria //////////////////////
    @IsOptional({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idnivelsalarial?: number

    @IsOptional({ message: '' })
    @IsNotEmpty({ message: 'El campo importe no puede estar vacío.' })
    @IsNumber({maxDecimalPlaces: 2})
    honorariomensual?: number

    @IsOptional({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    numerocasos?: number

    @IsOptional({ message: '' })
    @IsString()
    @IsNotEmpty({ message: '' })
    plazoentregaliteral: string;

    @IsOptional({ message: '' })
    @IsString()
    descripcion: string;

    ////////////////// Daotos Ofertante identificado //////////////////////

    @IsOptional({ message: '' })
    @IsString()
    razonsocial: string;

    @IsOptional({ message: '' })
    @IsString()
    representantelegal: string;

    @IsOptional({ message: '' })
    @IsString()
    cirepresentantelegal: string;

    @IsOptional({ message: '' })
    @IsString()
    nit: string;
    
}
