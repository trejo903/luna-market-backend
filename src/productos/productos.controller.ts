import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{name:'imagenes',maxCount:5}],{
      limits:{fileSize:5*1024*1024}
    })
  )
  create(@Body() createProductoDto: CreateProductoDto,@UploadedFiles() files:{imagenes?:Express.Multer.File[]}) {
    return this.productosService.create(createProductoDto,files.imagenes);
  }

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{name:'imagenes',maxCount:5}],{
      limits:{fieldSize:5*1024*1024}
    })
  )
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto,@UploadedFiles() files:{imagenes?:Express.Multer.File[]}) {
    return this.productosService.update(+id, updateProductoDto,files.imagenes);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
  }
}
