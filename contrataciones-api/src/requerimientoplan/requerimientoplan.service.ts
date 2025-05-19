import { ConsoleLogger, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRequerimientoplanDto } from './dto/create-requerimientoplan.dto';
import { UpdateRequerimientoplanDto } from './dto/update-requerimientoplan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Requerimientoplan } from './entities/requerimientoplan.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RequerimientoplanService {

  constructor(
    @InjectRepository(Requerimientoplan) 
    private requerimientoPlanRepository: Repository<Requerimientoplan>,
  ) {}

    
  async create(createRequerimientoplanDto: CreateRequerimientoplanDto): Promise<Requerimientoplan> {
    try {
          const plan = this.requerimientoPlanRepository.create(createRequerimientoplanDto);
          
          return await this.requerimientoPlanRepository.save(plan);  
          
    } catch (error) {
      throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
    }
  }

  async createArrayPlan(createRequerimientoplanDto: CreateRequerimientoplanDto[])  {//: Promise<Requerimientoplan[]> {
    try {
      // Crea las entidades a partir de los DTOs
      const plans = this.requerimientoPlanRepository.create(createRequerimientoplanDto);
      
      // Guarda el array de entidades en la base de datos
      return await this.requerimientoPlanRepository.save(plans);
    } catch (error) {
      // Manejo de errores si la operación falla
      throw new InternalServerErrorException('No se pudo agregar el registro: ' + error.message);
    }
  }

  async findAll() : Promise<Requerimientoplan[]> {
    const query =  await this.requerimientoPlanRepository.find({
      where: { activo: true},
      order: { id: "ASC"     }
    });
    
    return query
  }

  async findOne(id: number) : Promise<Requerimientoplan> {
      const query = await this.requerimientoPlanRepository.findOne({ 
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

  async findByPlanUnidadOrg(idplan: number, idunidadorganizacional: number) : Promise<Requerimientoplan[]> {

    const query = await this.requerimientoPlanRepository.find({ 
      where: { 
        idplan: idplan,
        idunidadorganizacional: idunidadorganizacional,
        activo: true
       },
       order: { id: "ASC"     }
    });

    if (query.length < 1) {
      throw new NotFoundException('No existen registros con los parametros introducidos');
    }

    return query;
}

  async update(id: number, updateRequerimientoplanDto: UpdateRequerimientoplanDto)  : Promise<Requerimientoplan> {
    try {
      const plan  = await this.requerimientoPlanRepository.findOne({ where: { id } });
      if (!plan) {
        throw new NotFoundException('No existe el registro solicitado');
      }

      updateRequerimientoplanDto.updatedAt = new Date();
      
      await this.requerimientoPlanRepository.update({ id }, updateRequerimientoplanDto);
      return await this.requerimientoPlanRepository.findOne({ where: { id } });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el registro:' + error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const tipo  = await this.requerimientoPlanRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.requerimientoPlanRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
  }

  async removeByArray(ids: number[]): Promise<void> {
    try {
      const tipos = await this.requerimientoPlanRepository.find({
        where: { id: In(ids) } 
      });
  
      if (tipos.length !== ids.length) {
        throw new NotFoundException('Algunos registros no existen');
      }
  
      await this.requerimientoPlanRepository.update(ids, { activo: false });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo eliminar todos los registros: ' + error.message);
    }
  }

  async removeByPlanUO(idplan: number, idunidadorganizacional: number): Promise<void> {
    try {
      // Buscar los registros filtrados por idplan y idunidadorganizacional
      const reqs = await this.requerimientoPlanRepository.find({
        where: {
          idplan: idplan,
          idunidadorganizacional: idunidadorganizacional,
        }
      });
  
      // Verificar si no se encontraron registros
      if (reqs.length === 0) {
        throw new NotFoundException('No existen los registros solicitados');
      }
  
      // Actualizar el campo 'activo' a false en los registros encontrados
      await this.requerimientoPlanRepository.update(
        { idplan: idplan, idunidadorganizacional: idunidadorganizacional },
        { activo: false }
      );
    } catch (error) {
      throw new InternalServerErrorException('No se pudo eliminar todos los registros: ' + error.message);
    }
  }

}
