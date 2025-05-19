import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormaAdjudicacionDto } from './dto/create-forma-adjudicacion.dto';
import { UpdateFormaAdjudicacionDto } from './dto/update-forma-adjudicacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormaAdjudicacion } from './entities/forma-adjudicacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormaAdjudicacionService {

  constructor(
        @InjectRepository(FormaAdjudicacion) 
        private formaAdjudicacionRepository: Repository<FormaAdjudicacion>,
      ) {}
    
  
    async findAll() : Promise<FormaAdjudicacion[]> {
        const query =  await this.formaAdjudicacionRepository.find({
          where: { activo: true},
          order: { id: "ASC"     }
        });
        
        return query
      }
    
      async findOne(id: number) : Promise<FormaAdjudicacion> {
        const query = await this.formaAdjudicacionRepository.findOne({ 
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
      
      /*
  create(createFormaAdjudicacionDto: CreateFormaAdjudicacionDto) {
    return 'This action adds a new formaAdjudicacion';
  }

  update(id: number, updateFormaAdjudicacionDto: UpdateFormaAdjudicacionDto) {
    return `This action updates a #${id} formaAdjudicacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} formaAdjudicacion`;
  }
  */
}
