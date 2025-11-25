import { IsInt, IsNumber, IsPositive, IsString, Length, Min } from "class-validator";

export class CreateProductoDto {
    @IsString()
    @Length(1,150)
    nombre:string

    @IsString()
    @Length(6,6)
    sku:string

    @IsInt()
    @Min(0)
    cantidad: number

    @IsNumber({maxDecimalPlaces:2})
    @IsPositive()
    precio:number

    @IsInt()
    categoriaId:number
}
