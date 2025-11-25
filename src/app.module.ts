import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDB } from './config/typeorm.config';
import { CategoriasModule } from './categorias/categorias.module';
import { ImgproductosModule } from './imgproductos/imgproductos.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      useFactory:configDB,
      inject:[ConfigService]
    }),
    ProductosModule, UsuariosModule, CategoriasModule, ImgproductosModule, AwsS3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
