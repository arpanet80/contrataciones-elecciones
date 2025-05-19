import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRequerimientoProcesoDto } from './dto/create-requerimiento-proceso.dto';
import { UpdateRequerimientoProcesoDto } from './dto/update-requerimiento-proceso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RequerimientoProceso } from './entities/requerimiento-proceso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequerimientoProcesoService {

  constructor(
      @InjectRepository(RequerimientoProceso) 
      private requerimientoProcesoRepository: Repository<RequerimientoProceso>,
  ) {}

  async create(createRequerimientoProcesoDto: CreateRequerimientoProcesoDto) : Promise<RequerimientoProceso> {
    try {
        const plan = this.requerimientoProcesoRepository.create(createRequerimientoProcesoDto);
        
        plan.preciototal = plan.cantidad * plan.preciounitario;

        return await this.requerimientoProcesoRepository.save(plan);  
        
    } catch (error) {
      throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
    }
  }

  async createArrayPlan(createRequerimientoProcesoDto: CreateRequerimientoProcesoDto[])  : Promise<RequerimientoProceso[]> {
        try {
          // Crea las entidades a partir de los DTOs
          const plans = this.requerimientoProcesoRepository.create(createRequerimientoProcesoDto);

          plans.forEach(plan => {
            plan.preciototal = plan.cantidad * plan.preciounitario;
        });
          
          // Guarda el array de entidades en la base de datos
          return await this.requerimientoProcesoRepository.save(plans);
        } catch (error) {
          // Manejo de errores si la operación falla
          throw new InternalServerErrorException('No se pudo agregar el registro: ' + error.message);
        }
  }

  async findAll() : Promise<RequerimientoProceso[]> {
      const query =  await this.requerimientoProcesoRepository.find({
        where:  { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
  }
  
  async findOne(id: number) : Promise<RequerimientoProceso> {
    const query = await this.requerimientoProcesoRepository.findOne({ 
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
  
  async findByIdSolProceso(idsolproceso: number) : Promise<RequerimientoProceso[]> {
  
    const query = await this.requerimientoProcesoRepository.find({ 
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

  async update(id: number, updateRequerimientoProcesoDto: UpdateRequerimientoProcesoDto) : Promise<RequerimientoProceso> {
    try {
      const cert  = await this.requerimientoProcesoRepository.findOne({ where: { id } });
      if (!cert) {
        throw new NotFoundException('No existe el registro solicitado');
      }

      cert.preciototal = cert.cantidad * cert.preciounitario;

      await this.requerimientoProcesoRepository.update({ id }, updateRequerimientoProcesoDto);
      return await this.requerimientoProcesoRepository.findOne({ where: { id } });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el registro:' + error);
    }
  }

  async remove(id: number) : Promise<void> {
    try {
      const tipo  = await this.requerimientoProcesoRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.requerimientoProcesoRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
  }
}
