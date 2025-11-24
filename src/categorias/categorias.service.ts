import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {

  constructor(
    @InjectRepository(Categoria) private readonly categoriaRepo: Repository<Categoria>
  ){}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const nombre = createCategoriaDto.nombre.trim()
    const exists = await this.categoriaRepo.findOne({where:{nombre}})
    if(exists){
      throw new BadRequestException('Ya existe esa categoria')
    }
    const categoria = this.categoriaRepo.create({
      ...createCategoriaDto,
      nombre
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

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id)
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
