import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDatosPacDto } from './dto/create-datos-pac.dto';
import { UpdateDatosPacDto } from './dto/update-datos-pac.dto';
import { DatosPac } from './entities/datos-pac.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DatosPacService {

  constructor(
      @InjectRepository(DatosPac) 
      private datosPacRepository: Repository<DatosPac>,
  ) {}

  async create(createDatosPacDto: CreateDatosPacDto)  : Promise<DatosPac> {
    try {
        const consult  = this.datosPacRepository.create(createDatosPacDto);
        consult.fechaprogramada = new Date();
        
        return await this.datosPacRepository.save(consult);  
        
    } catch (error) {
      throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
    }
}

  async findAll() : Promise<DatosPac[]> {
      const query =  await this.datosPacRepository.find({
        where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
  }
    
  async findOne(id: number) : Promise<DatosPac> {
    const query = await this.datosPacRepository.findOne({ 
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

  async findByIdSolProceso(idsolproceso: number) : Promise<DatosPac[]> {
      
    const query = await this.datosPacRepository.find({ 
      where: { 
        idsolproceso: idsolproceso,
        activo: true
        },
    });

    if (query.length < 1) {
      throw new NotFoundException('No existen registros con los parametros introducidos');
    }

    return query;
  }

  async update(id: number, updateDatosPacDto: UpdateDatosPacDto) : Promise<DatosPac> {
    try {
      const cert  = await this.datosPacRepository.findOne({ where: { id } });
      if (!cert) {
        throw new NotFoundException('No existe el registro solicitado');
      }

      await this.datosPacRepository.update({ id }, updateDatosPacDto);
      return await this.datosPacRepository.findOne({ where: { id } });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el registro:' + error);
    }
  }

  async remove(id: number) : Promise<void> {
    try {
      const tipo  = await this.datosPacRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.datosPacRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
  }
}
