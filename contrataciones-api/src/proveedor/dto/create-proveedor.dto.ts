import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProveedorDto {
        
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt()
    idsolicitud: number;

    @IsString()
    @IsNotEmpty({ message: '' })
    razonsocial: string;

    @IsString()
    @IsNotEmpty({ message: '' })
    cirepresentantelegal: string;

    @IsString()
    @IsOptional()
    nombrecontacto: string;

    @IsString()
    @IsNotEmpty({ message: '' })
    representantelegal: string;
    
    @IsOptional()
    @IsBoolean()
    activo?: boolean;
    
}
