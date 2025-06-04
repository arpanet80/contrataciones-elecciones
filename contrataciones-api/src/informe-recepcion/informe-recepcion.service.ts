import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateInformeRecepcionDto } from './dto/create-informe-recepcion.dto';
import { UpdateInformeRecepcionDto } from './dto/update-informe-recepcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InformeRecepcion } from './entities/informe-recepcion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InformeRecepcionService {

  constructor(
          @InjectRepository(InformeRecepcion) private informeRecepRepository: Repository<InformeRecepcion>,
  ) {}

  async  create(createInformeRecepcionDto: CreateInformeRecepcionDto) : Promise<InformeRecepcion> {
    try {
        const consult  = this.informeRecepRepository.create(createInformeRecepcionDto);

        consult.citememoadmin = consult.citememoadmin.toUpperCase();
        consult.citememounidadsol = consult.citememounidadsol.toUpperCase();
        consult.fechainforme = new Date();
        
        return await this.informeRecepRepository.save(consult);  
        
    } catch (error) {
      throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
      }
  }

  async findAll() : Promise<InformeRecepcion[]> {
      const query =  await this.informeRecepRepository.find({
        where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
  }

  async findOneByIdSol(idSol: number) : Promise<InformeRecepcion> {
    const query = await this.informeRecepRepository.findOne({ 
      where: { 
        idsolicitud: idSol,
        activo: true
        },
    });
  
    // if (!query) {
    //   throw new NotFoundException('No existe el registro solicitado');
    // }

    return query;
  }
  
    // async findAllByProceso(idSol: number) : Promise<InformeRecepcion[]> {
    //     const query =  await this.informeRecepRepository.find({
    //       where: { 
    //         idsolicitud: idSol,
    //         activo: true
    //       },
    //       order: { id: "DESC"     }
    //     });
        
    //     return query
    // }
      
  async findOne(id: number) : Promise<InformeRecepcion> {
    const query = await this.informeRecepRepository.findOne({ 
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

  async  update(id: number, updateInformeRecepcionDto: UpdateInformeRecepcionDto)  : Promise<InformeRecepcion> {
    try {
          const cert  = await this.informeRecepRepository.findOne({ where: { id } });
          if (!cert) {
            throw new NotFoundException('No existe el registro solicitado');
          }
    
          await this.informeRecepRepository.update({ id }, updateInformeRecepcionDto);
          return await this.informeRecepRepository.findOne({ where: { id } });
    
        } catch (error) {
          throw new InternalServerErrorException('No se pudo actualizar el registro:' + error);
      }
  }

   async remove(id: number) : Promise<void> {
    try {
      const tipo  = await this.informeRecepRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.informeRecepRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
  }
}
