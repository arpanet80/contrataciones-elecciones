import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateRpaDto {
    
    @IsNotEmpty({ message: '' })
    @Type(() => Number)
    @IsInt({ message: '' })
    idusuario: number;

}
