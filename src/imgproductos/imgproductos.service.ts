import { Injectable } from '@nestjs/common';
import { CreateImgproductoDto } from './dto/create-imgproducto.dto';
import { UpdateImgproductoDto } from './dto/update-imgproducto.dto';

@Injectable()
export class ImgproductosService {
  create(createImgproductoDto: CreateImgproductoDto) {
    return 'This action adds a new imgproducto';
  }

  findAll() {
    return `This action returns all imgproductos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imgproducto`;
  }

  update(id: number, updateImgproductoDto: UpdateImgproductoDto) {
    return `This action updates a #${id} imgproducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} imgproducto`;
  }
}
