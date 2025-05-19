import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadMedida } from './entities/unidad-medida.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnidadMedidaService {
  constructor(
        @InjectRepository(UnidadMedida) 
        private unidaMedidaRepository: Repository<UnidadMedida>,
  ) {}
    

  async findAll() : Promise<UnidadMedida[]> {
      const query =  await this.unidaMedidaRepository.find({
        where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
    }

  async findOne(id: number) : Promise<UnidadMedida> {
    const query = await this.unidaMedidaRepository.findOne({ 
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
