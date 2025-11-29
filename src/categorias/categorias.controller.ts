import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import type { Express } from 'express';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('img',{
      limits:{fileSize:5*1024*1024}
    })
  )
  create(@Body() createCategoriaDto: CreateCategoriaDto,@UploadedFile() file?:Express.Multer.File) {
    return this.categoriasService.create(createCategoriaDto,file);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('img',{
      limits:{fileSize:5*1024*1024}
    })
  )
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto, @UploadedFile() file?:Express.Multer.File) {
    return this.categoriasService.update(+id, updateCategoriaDto,file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
