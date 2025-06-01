import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateInformeverificacionDto } from './dto/create-informeverificacion.dto';
import { UpdateInformeverificacionDto } from './dto/update-informeverificacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Informeverificacion } from './entities/informeverificacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InformeverificacionService {

  constructor(
        @InjectRepository(Informeverificacion) private informeVerifRepository: Repository<Informeverificacion>,
        
    ) {}

  async create(createInformeverificacionDto: CreateInformeverificacionDto)  : Promise<Informeverificacion> {
      try {
          const consult  = this.informeVerifRepository.create(createInformeverificacionDto);

          consult.razonsocial = consult.razonsocial.toUpperCase();
          consult.representantelegal = consult.representantelegal.toUpperCase();
          
          return await this.informeVerifRepository.save(consult);  
          
      } catch (error) {
        throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
      }
  }
    
  async findAll() : Promise<Informeverificacion[]> {
      const query =  await this.informeVerifRepository.find({
        where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
  }
    
  async findOne(id: number) : Promise<Informeverificacion> {
    const query = await this.informeVerifRepository.findOne({ 
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

  async findOneByIdSol(idSol: number) : Promise<Informeverificacion> {
    const query = await this.informeVerifRepository.findOne({ 
      where: { 
        idsolicitud: idSol,
        activo: true
        },
    });
  
    if (!query) {
      throw new NotFoundException('No existe el registro solicitado');
    }

    return query;
  }

  async update(id: number, updateInformeverificacionDto: UpdateInformeverificacionDto)  : Promise<Informeverificacion> {
    try {
      const cert  = await this.informeVerifRepository.findOne({ where: { id } });
      if (!cert) {
        throw new NotFoundException('No existe el registro solicitado');
      }

      await this.informeVerifRepository.update({ id }, updateInformeverificacionDto);
      return await this.informeVerifRepository.findOne({ where: { id } });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el registro:' + error);
    }
  }

  async remove(id: number) : Promise<void> {
    try {
      const tipo  = await this.informeVerifRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.informeVerifRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
  }
}
