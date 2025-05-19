import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNivelSalarialDto } from './dto/create-nivel-salarial.dto';
import { UpdateNivelSalarialDto } from './dto/update-nivel-salarial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelSalarial } from './entities/nivel-salarial.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NivelSalarialService {
  constructor(
    @InjectRepository(NivelSalarial) 
    private tipoProcesoRepository: Repository<NivelSalarial>,
  ) {}
  

  async findAll() : Promise<NivelSalarial[]> {
      const query =  await this.tipoProcesoRepository.find({
        order: { id: "ASC"     }
      });
      
      return query
    }
  
    async findOne(id: number) : Promise<NivelSalarial> {
      const query = await this.tipoProcesoRepository.findOne({ 
        where: { 
          id,
          },
      });
  
      if (!query) {
        throw new NotFoundException('No existe el registro solicitado');
      }
  
      return query;
    }
    
}
