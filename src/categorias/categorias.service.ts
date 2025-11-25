import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class CategoriasService {

  constructor(
    @InjectRepository(Categoria) private readonly categoriaRepo: Repository<Categoria>,
    private readonly awsS3Service:AwsS3Service
  ){}

  async create(createCategoriaDto: CreateCategoriaDto,file?:Express.Multer.File) {
    const nombre = createCategoriaDto.nombre.trim()
    const exists = await this.categoriaRepo.findOne({where:{nombre}})
    if(exists){
      throw new BadRequestException('Ya existe esa categoria')
    }

    let imgUrl:string|undefined = undefined

    if(file){
      imgUrl = await this.awsS3Service.uploadImage(file,'categorias')
    }

    const categoria = this.categoriaRepo.create({
      ...createCategoriaDto,
      nombre,
      img:imgUrl
    })

    await this.categoriaRepo.save(categoria)

    return {msg:'Nueva categoria añadida'};
  }

  findAll() {
    return this.categoriaRepo.find({
      order:{id:'ASC'}
    });
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepo.findOne({where:{id}})
    if(!categoria){
      throw new NotFoundException('Categoria no encontrada')
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto,file?:Express.Multer.File) {
    const categoria = await this.findOne(id)
    if(file){
      const imgUrl = await this.awsS3Service.uploadImage(file,'categorias')
      categoria.img = imgUrl
    }
    Object.assign(categoria,updateCategoriaDto)
    if(updateCategoriaDto.nombre){
      categoria.nombre= updateCategoriaDto.nombre.trim()
    }
    await this.categoriaRepo.save(categoria)
    return {msg:'Categoria actualizada correctamente'};
  }

  async remove(id: number) {
    const categoria = await this.findOne(id)
    await this.categoriaRepo.remove(categoria)
    return {msg:'Categoria eliminada'};
  }
}
