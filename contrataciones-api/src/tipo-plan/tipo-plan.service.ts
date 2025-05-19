import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoPlanDto } from './dto/create-tipo-plan.dto';
import { UpdateTipoPlanDto } from './dto/update-tipo-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoPlan } from './entities/tipo-plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoPlanService {
  constructor(
        @InjectRepository(TipoPlan) 
        private tipoPlanRepository: Repository<TipoPlan>,
      ) {}
    
  
    async findAll() : Promise<TipoPlan[]> {
        const query =  await this.tipoPlanRepository.find({
          where: { activo: true},
          order: { id: "ASC"     }
        });
        
        return query
    }
    
    async findOne(id: number) : Promise<TipoPlan> {
      const query = await this.tipoPlanRepository.findOne({ 
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
