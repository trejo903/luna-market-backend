import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Imgproducto } from 'src/imgproductos/entities/imgproducto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo : Repository<Producto>,
    @InjectRepository(Imgproducto)
    private readonly imgRepo: Repository<Imgproducto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,

    private readonly awsS3Service:AwsS3Service
  ){

  }
  /** Genera un SKU de 6 dígitos y se asegura de que no exista en la BD */
  private async generateUniqueSku(): Promise<string> {
    while (true) {
      // número aleatorio entre 100000 y 999999
      const sku = Math.floor(100000 + Math.random() * 900000).toString();

      const exists = await this.productoRepo.findOne({ where: { sku } });
      if (!exists) {
        return sku;
      }
      // si existe, vuelve a intentar
    }
  }

  async create(
    createProductoDto: CreateProductoDto,
    imagenes?: Express.Multer.File[],
  ) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id: createProductoDto.categoriaId },
    });

    if (!categoria) {
      throw new BadRequestException('La categoria indicada no existe');
    }

    // si no viene sku en el dto, lo generamos
    const sku = createProductoDto.sku ?? (await this.generateUniqueSku());

    const producto = this.productoRepo.create({
      nombre: createProductoDto.nombre.trim(),
      sku,
      cantidad: createProductoDto.cantidad ?? 0,
      precio: createProductoDto.precio,
      categoriaId: createProductoDto.categoriaId,
    });

    await this.productoRepo.save(producto);

    if (imagenes && imagenes.length > 0) {
      const urls = await Promise.all(
        imagenes.map((file) => this.awsS3Service.uploadImage(file, 'productos')),
      );

      const imgEntities = urls.map((url, index) =>
        this.imgRepo.create({
          url,
          principal: index === 0,
          order: index,
          productoId: producto.id,
        }),
      );

      await this.imgRepo.save(imgEntities);
      producto.imagenes = imgEntities;
    }

    return {
  msg: 'Producto creado correctamente',
  sku: producto.sku,
  producto,
};

  }

  findAll() {
    return this.productoRepo.find({
      relations:['categoria','imagenes'],
      order:{id:'ASC'}
    });
  }

  async findOne(id: number) {
    const producto = await this.productoRepo.findOne({
      where:{id},
      relations:['categoria','imagenes']
    })
    if(!producto){
      throw new NotFoundException('Producto no encontrado')
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto,imagenes?:Express.Multer.File[]) {
    const producto = await this.findOne(id)
    if(updateProductoDto.nombre){
      producto.nombre = updateProductoDto.nombre.trim()
    }
    if(updateProductoDto.sku){
      producto.sku = updateProductoDto.sku
    }
    if(updateProductoDto.cantidad !== undefined){
      producto.cantidad = updateProductoDto.cantidad
    }
    if(updateProductoDto.precio !==undefined){
      producto.precio = updateProductoDto.precio
    }
    if(updateProductoDto.categoriaId){
      const categoria  = await this.categoriaRepo.findOne({
        where:{id:updateProductoDto.categoriaId}
      })
      if(!categoria){
        throw new BadRequestException('La nueva categoria no existe')
      }
      producto.categoriaId = updateProductoDto.categoriaId
    }
    await this.productoRepo.save(producto)

    if(imagenes && imagenes.length>0){
      await this.imgRepo.delete({productoId:producto.id})
      const urls = await Promise.all(
        imagenes.map(file=>this.awsS3Service.uploadImage(file,'productos'))
      )
      const imgEntities = urls.map((url,index)=>
      this.imgRepo.create({
        url,
        principal:index===0,
        order:index,
        productoId:producto.id
      })
      )
      await this.imgRepo.save(imgEntities)
      producto.imagenes=imgEntities
    }

    return {msg:'Producto actualizado correctamente'};
  }

  async remove(id: number) {
    const producto = await this.findOne(id)
    await this.productoRepo.remove(producto)
    return {msg:'Producto eliminado correctamente'};
  }
}
