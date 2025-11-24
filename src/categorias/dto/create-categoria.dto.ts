import {IsBoolean,IsOptional,IsString,MaxLength } from 'class-validator'

export class CreateCategoriaDto {
    @IsString()
    @MaxLength(100)
    nombre:string

    @IsOptional()
    @IsString()
    @MaxLength(255)
    img?:string

    @IsOptional()
    @IsBoolean()
    activa?:boolean
}
