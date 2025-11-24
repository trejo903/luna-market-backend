import { Module } from '@nestjs/common';
import { ImgproductosService } from './imgproductos.service';
import { ImgproductosController } from './imgproductos.controller';

@Module({
  controllers: [ImgproductosController],
  providers: [ImgproductosService],
})
export class ImgproductosModule {}
