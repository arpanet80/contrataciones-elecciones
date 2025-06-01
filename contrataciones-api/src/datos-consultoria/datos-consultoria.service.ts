import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDatosConsultoriaDto } from './dto/create-datos-consultoria.dto';
import { UpdateDatosConsultoriaDto } from './dto/update-datos-consultoria.dto';
import { DatosConsultoria } from './entities/datos-consultoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DatosConsultoriaService {

  constructor(
    @InjectRepository(DatosConsultoria) 
      private datosonsultoriaRepository: Repository<DatosConsultoria>,
  ) {}

  async create(createDatosConsultoriaDto: CreateDatosConsultoriaDto)  : Promise<DatosConsultoria> {
    try {
        const consult  = this.datosonsultoriaRepository.create(createDatosConsultoriaDto);
        
        return await this.datosonsultoriaRepository.save(consult);  
        
    } catch (error) {
      throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
    }
  }

  async createArrayCertificado(createDatosConsultoriaDto: CreateDatosConsultoriaDto[]) : Promise<DatosConsultoria[]> {
        try {
          // Crea las entidades a partir de los DTOs
          const consult = this.datosonsultoriaRepository.create(createDatosConsultoriaDto);
          
          // Guarda el array de entidades en la base de datos
          return await this.datosonsultoriaRepository.save(consult);
        } catch (error) {
          throw new InternalServerErrorException('No se pudo agregar el registro: ' + error.message);
        }
      }

  async findAll() : Promise<DatosConsultoria[]> {
      const query =  await this.datosonsultoriaRepository.find({
        where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
  }
  
  async findOne(id: number) : Promise<DatosConsultoria> {
    const query = await this.datosonsultoriaRepository.findOne({ 
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

  async findByIdSolProceso(idsolproceso: number) : Promise<DatosConsultoria[]> {
    
        const query = await this.datosonsultoriaRepository.find({ 
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

  async update(id: number, updateDatosConsultoriaDto: UpdateDatosConsultoriaDto)  : Promise<DatosConsultoria> {
    try {
      const cert  = await this.datosonsultoriaRepository.findOne({ where: { id } });
      if (!cert) {
        throw new NotFoundException('No existe el registro solicitado');
      }

      await this.datosonsultoriaRepository.update({ id }, updateDatosConsultoriaDto);
      return await this.datosonsultoriaRepository.findOne({ where: { id } });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el registro:' + error);
    }
  }
  
  async remove(id: number) : Promise<void> {
    try {
      const tipo  = await this.datosonsultoriaRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.datosonsultoriaRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
  }
}
