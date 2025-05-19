import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCertificadoPresupuestarioDto } from './dto/create-certificado-presupuestario.dto';
import { UpdateCertificadoPresupuestarioDto } from './dto/update-certificado-presupuestario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CertificadoPresupuestario } from './entities/certificado-presupuestario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CertificadoPresupuestarioService {

  constructor(
      @InjectRepository(CertificadoPresupuestario) 
      private certifiacionRepository: Repository<CertificadoPresupuestario>,
  ) {}


  async create(createCertificadoPresupuestarioDto: CreateCertificadoPresupuestarioDto) : Promise<CertificadoPresupuestario> {
    try {
        const plan = this.certifiacionRepository.create(createCertificadoPresupuestarioDto);
        plan.fechaemision = new Date();
        
        return await this.certifiacionRepository.save(plan);  
        
    } catch (error) {
      throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
    }
  }

  async createArrayCertificado(createCertificadoPresupuestarioDto: CreateCertificadoPresupuestarioDto[])  {//: Promise<Requerimientoplan[]> {
      try {
        // Crea las entidades a partir de los DTOs
        const certificados = this.certifiacionRepository.create(createCertificadoPresupuestarioDto);
        
        // Guarda el array de entidades en la base de datos
        return await this.certifiacionRepository.save(certificados);
      } catch (error) {
        throw new InternalServerErrorException('No se pudo agregar el registro: ' + error.message);
      }
    }

  async findAll() : Promise<CertificadoPresupuestario[]> {
      const query =  await this.certifiacionRepository.find({
        where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
    }
  
  async findOne(id: number) : Promise<CertificadoPresupuestario> {
      const query = await this.certifiacionRepository.findOne({ 
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

  async findByIdSolProceso(idsolproceso: number) : Promise<CertificadoPresupuestario[]> {
  
      const query = await this.certifiacionRepository.find({ 
        where: { 
          idsolproceso: idsolproceso,
          activo: true
         },
         order: { id: "ASC"     }
      });
  
      if (query.length < 1) {
        throw new NotFoundException('No existen registros con los parametros introducidos');
      }
  
      return query;
  }

  async update(id: number, updateCertificadoPresupuestarioDto: UpdateCertificadoPresupuestarioDto)  : Promise<CertificadoPresupuestario> {
    try {
      const cert  = await this.certifiacionRepository.findOne({ where: { id } });
      if (!cert) {
        throw new NotFoundException('No existe el registro solicitado');
      }

      await this.certifiacionRepository.update({ id }, updateCertificadoPresupuestarioDto);
      return await this.certifiacionRepository.findOne({ where: { id } });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el registro:' + error);
    }
  }

  async remove(id: number) : Promise<void> {
    try {
      const tipo  = await this.certifiacionRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.certifiacionRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
  }
}
