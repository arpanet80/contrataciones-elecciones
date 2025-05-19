import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClasificadorDto } from './dto/create-clasificador.dto';
import { UpdateClasificadorDto } from './dto/update-clasificador.dto';
import { Clasificador } from './entities/clasificador.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClasificadorService {

  constructor(
        @InjectRepository(Clasificador) 
        private tipoProcesoRepository: Repository<Clasificador>,
      ) {}
    
  
    async findAll() : Promise<Clasificador[]> {
        const query =  await this.tipoProcesoRepository.find({
          order: { id: "ASC"     }
        });
        
        return query
      }
    
      async findOne(partida: string) : Promise<Clasificador> {
        const query = await this.tipoProcesoRepository.findOne({ 
          where: { 
            partida,
           },
        });
    
        if (!query) {
          throw new NotFoundException('No existe el registro solicitado');
        }
    
        return query;
      }

  /*
  create(createClasificadorDto: CreateClasificadorDto) {
    return 'This action adds a new clasificador';
  }

  findAll() {
    return `This action returns all clasificador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clasificador`;
  }

  update(id: number, updateClasificadorDto: UpdateClasificadorDto) {
    return `This action updates a #${id} clasificador`;
  }

  remove(id: number) {
    return `This action removes a #${id} clasificador`;
  }
    */
}
