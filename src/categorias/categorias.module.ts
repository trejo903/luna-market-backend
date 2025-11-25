import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  imports:[TypeOrmModule.forFeature([Categoria]),
  AwsS3Module
],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
