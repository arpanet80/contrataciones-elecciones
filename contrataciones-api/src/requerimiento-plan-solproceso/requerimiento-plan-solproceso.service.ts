import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRequerimientoPlanSolprocesoDto } from './dto/create-requerimiento-plan-solproceso.dto';
import { UpdateRequerimientoPlanSolprocesoDto } from './dto/update-requerimiento-plan-solproceso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RequerimientoPlanSolproceso } from './entities/requerimiento-plan-solproceso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequerimientoPlanSolprocesoService {

  constructor(
    @InjectRepository(RequerimientoPlanSolproceso) 
    private requerimientoPlanRepository: Repository<RequerimientoPlanSolproceso>,
  ) {}

  async create(createRequerimientoPlanSolprocesoDto: CreateRequerimientoPlanSolprocesoDto) : Promise<RequerimientoPlanSolproceso> {
    try {
              const plan = this.requerimientoPlanRepository.create(createRequerimientoPlanSolprocesoDto);
              
              return await this.requerimientoPlanRepository.save(plan);  
              
        } catch (error) {
          throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
        }
  }

  async createArrayPlan(createRequerimientoPlanSolprocesoDto: CreateRequerimientoPlanSolprocesoDto[])  : Promise<RequerimientoPlanSolproceso[]> {
      try {
        // Crea las entidades a partir de los DTOs
        const plans = this.requerimientoPlanRepository.create(createRequerimientoPlanSolprocesoDto);
        
        // Guarda el array de entidades en la base de datos
        return await this.requerimientoPlanRepository.save(plans);
      } catch (error) {
        // Manejo de errores si la operación falla
        throw new InternalServerErrorException('No se pudo agregar el registro: ' + error.message);
      }
    }

  async findAll() : Promise<RequerimientoPlanSolproceso[]> {
      const query =  await this.requerimientoPlanRepository.find({
        order: { id: "ASC"     }
      });
      
      return query
  }

  async findOne(id: number) : Promise<RequerimientoPlanSolproceso> {
      const query = await this.requerimientoPlanRepository.findOne({ 
        where: { 
          id,
          },
      });
  
      if (!query) {
        throw new NotFoundException('No existe el registro solicitado');
      }
  
      return query;
  }

  async findByIdSolProceso(idsolproceso: number) : Promise<RequerimientoPlanSolproceso[]> {
  
    const query = await this.requerimientoPlanRepository.find({ 
      where: { 
        idsolproceso: idsolproceso,
        },
        order: { id: "ASC"     }
    });
  
    if (query.length < 1) {
      throw new NotFoundException('No existen registros con los parametros introducidos');
    }
  
    return query;
  }

  async update(id: number, updateRequerimientoPlanSolprocesoDto: UpdateRequerimientoPlanSolprocesoDto) : Promise<RequerimientoPlanSolproceso> {
    try {
      const cert  = await this.requerimientoPlanRepository.findOne({ where: { id } });
      if (!cert) {
        throw new NotFoundException('No existe el registro solicitado');
      }

      await this.requerimientoPlanRepository.update({ id }, updateRequerimientoPlanSolprocesoDto);
      return await this.requerimientoPlanRepository.findOne({ where: { id } });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el registro:' + error);
    }
  }

  async remove(id: number) : Promise<void> {
    /*
    try {
      const tipo  = await this.requerimientoPlanRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.requerimientoPlanRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
      */
  }
}
