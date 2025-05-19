import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plane.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanesService {

  constructor(
    @InjectRepository(Plan) 
    private planRepository: Repository<Plan>,
  ) {}


  async create(createPlaneDto: CreatePlaneDto) : Promise<Plan> {

    try {
      // const usuario = await this.usuarioRepository.findOne({ where: { usuario: createUsuarioDto.usuario,activo: true}});

      // if (usuario) {
      //   throw new BadRequestException('El usuario ya existe');
      // }

      createPlaneDto.abreviacion = createPlaneDto.abreviacion.toUpperCase();
      createPlaneDto.nombre = createPlaneDto.nombre.toUpperCase();
      
      const plan = this.planRepository.create(createPlaneDto);
      
      return await this.planRepository.save(plan);  
      
    } catch (error) {
      throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
    }

  }

  async findAll() : Promise<Plan[]> {
    const query =  await this.planRepository.find({
      where: { activo: true},
      order: { id: "ASC"     }
    });
    
    return query
  }

  async findOne(id: number) : Promise<Plan> {
    const query = await this.planRepository.findOne({ 
      where: { 
        id,
        activo: true
       },
    });

    if (!query) {
      throw new NotFoundException('No existe el registro solicitado');
    }

    return query;
  }

  async update(id: number, updatePlaneDto: UpdatePlaneDto) : Promise<Plan> {
    try {
      const plan  = await this.planRepository.findOne({ where: { id } });
      if (!plan) {
        throw new NotFoundException('No existe el registro solicitado');
      }

      updatePlaneDto.updatedAt = new Date();
      
      await this.planRepository.update({ id }, updatePlaneDto);
      return await this.planRepository.findOne({ where: { id } });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el registro:' + error);
    }
  }

  async remove(id: number) : Promise<void> {
    try {
      const tipo  = await this.planRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.planRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
  }

}
