import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormaContratacionDto } from './dto/create-forma-contratacion.dto';
import { UpdateFormaContratacionDto } from './dto/update-forma-contratacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormaContratacion } from './entities/forma-contratacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormaContratacionService {

  constructor(
          @InjectRepository(FormaContratacion) 
          private formaContratacionRepository: Repository<FormaContratacion>,
        ) {}
      
    
      async findAll() : Promise<FormaContratacion[]> {
          const query =  await this.formaContratacionRepository.find({
            where: { activo: true},
            order: { id: "ASC"     }
          });
          
          return query
        }
      
        async findOne(id: number) : Promise<FormaContratacion> {
          const query = await this.formaContratacionRepository.findOne({ 
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
  create(createFormaContratacionDto: CreateFormaContratacionDto) {
    return 'This action adds a new formaContratacion';
  }

  update(id: number, updateFormaContratacionDto: UpdateFormaContratacionDto) {
    return `This action updates a #${id} formaContratacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} formaContratacion`;
  }
  */
}
