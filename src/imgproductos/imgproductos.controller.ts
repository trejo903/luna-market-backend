import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImgproductosService } from './imgproductos.service';
import { CreateImgproductoDto } from './dto/create-imgproducto.dto';
import { UpdateImgproductoDto } from './dto/update-imgproducto.dto';

@Controller('imgproductos')
export class ImgproductosController {
  constructor(private readonly imgproductosService: ImgproductosService) {}

  @Post()
  create(@Body() createImgproductoDto: CreateImgproductoDto) {
    return this.imgproductosService.create(createImgproductoDto);
  }

  @Get()
  findAll() {
    return this.imgproductosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgproductosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImgproductoDto: UpdateImgproductoDto) {
    return this.imgproductosService.update(+id, updateImgproductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgproductosService.remove(+id);
  }
}
