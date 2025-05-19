import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetodoSeleccionAdjudicDto } from './dto/create-metodo-seleccion-adjudic.dto';
import { UpdateMetodoSeleccionAdjudicDto } from './dto/update-metodo-seleccion-adjudic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetodoSeleccionAdjudic } from './entities/metodo-seleccion-adjudic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetodoSeleccionAdjudicService {
  
  constructor(
      @InjectRepository(MetodoSeleccionAdjudic) 
      private metodoSeleccionRepository: Repository<MetodoSeleccionAdjudic>,
  ) {}
        
      
  async findAll() : Promise<MetodoSeleccionAdjudic[]> {
      const query =  await this.metodoSeleccionRepository.find({
        where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
  }

  async findOne(id: number) : Promise<MetodoSeleccionAdjudic> {
    const query = await this.metodoSeleccionRepository.findOne({ 
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
