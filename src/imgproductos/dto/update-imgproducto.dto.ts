import { PartialType } from '@nestjs/mapped-types';
import { CreateImgproductoDto } from './create-imgproducto.dto';

export class UpdateImgproductoDto extends PartialType(CreateImgproductoDto) {}
