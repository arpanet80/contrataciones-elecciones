import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePlaneDto {
        
    @IsString()
    @IsNotEmpty({ message: '' })
    abreviacion: string;

    @IsString()
    @IsNotEmpty({ message: '' })
    nombre: string;

    @IsString()
    @IsNotEmpty({ message: '' })
    gestion: string;

    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idfuncionario: number;

    @IsOptional()
    updatedAt: Date;
    
    @IsOptional()
    @IsBoolean()
    activo?: boolean;
    
}
