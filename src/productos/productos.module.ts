import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { Producto } from './entities/producto.entity';
import { Imgproducto } from 'src/imgproductos/entities/imgproducto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Module({
  imports: [
    // 👇 aquí registras los repos que inyectas en el service
    TypeOrmModule.forFeature([Producto, Imgproducto, Categoria]),
    AwsS3Module, // para poder usar AwsS3Service
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
