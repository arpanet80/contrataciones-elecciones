import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoProcesoDto } from './dto/create-estado-proceso.dto';
import { UpdateEstadoProcesoDto } from './dto/update-estado-proceso.dto';
import { EstadoProceso } from './entities/estado-proceso.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstadoProcesoService {
  constructor(
    @InjectRepository(EstadoProceso) 
    private estadoProesoRepository: Repository<EstadoProceso>,
  ) {}
      
    
  async findAll() : Promise<EstadoProceso[]> {
      const query =  await this.estadoProesoRepository.find({
        where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
    }
      
    async findOne(id: number) : Promise<EstadoProceso> {
      const query = await this.estadoProesoRepository.findOne({ 
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
        
}
