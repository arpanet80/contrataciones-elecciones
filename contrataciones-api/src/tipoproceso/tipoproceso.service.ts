import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoprocesoDto } from './dto/create-tipoproceso.dto';
import { UpdateTipoprocesoDto } from './dto/update-tipoproceso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipoproceso } from './entities/tipoproceso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoprocesoService {

  constructor(
      @InjectRepository(Tipoproceso) 
      private tipoProcesoRepository: Repository<Tipoproceso>,
    ) {}
  

  async findAll() : Promise<Tipoproceso[]> {
      const query =  await this.tipoProcesoRepository.find({
        where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
    }
  
    async findOne(id: number) : Promise<Tipoproceso> {
      const query = await this.tipoProcesoRepository.findOne({ 
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
  

  /*create(createTipoprocesoDto: CreateTipoprocesoDto) {
    return 'This action adds a new tipoproceso';
  }

  update(id: number, updateTipoprocesoDto: UpdateTipoprocesoDto) {
    return `This action updates a #${id} tipoproceso`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoproceso`;
  }
  */
}
