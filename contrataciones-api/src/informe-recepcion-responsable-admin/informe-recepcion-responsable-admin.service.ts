import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInformeRecepcionResponsableAdminDto } from './dto/create-informe-recepcion-responsable-admin.dto';
import { UpdateInformeRecepcionResponsableAdminDto } from './dto/update-informe-recepcion-responsable-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InformeRecepcionResponsableAdmin } from './entities/informe-recepcion-responsable-admin.entity';

@Injectable()
export class InformeRecepcionResponsableAdminService {

   constructor(
        @InjectRepository(InformeRecepcionResponsableAdmin) private informeRespRepository: Repository<InformeRecepcionResponsableAdmin>,
    ) {}
    
  create(createInformeRecepcionResponsableAdminDto: CreateInformeRecepcionResponsableAdminDto) {
    return 'This action adds a new informeRecepcionResponsableAdmin';
  }

  async findAll() : Promise<InformeRecepcionResponsableAdmin[]> {
      const query =  await this.informeRespRepository.find({
        where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
  }

  async findOne(id: number) : Promise<InformeRecepcionResponsableAdmin> {
      const query = await this.informeRespRepository.findOne({ 
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

  update(id: number, updateInformeRecepcionResponsableAdminDto: UpdateInformeRecepcionResponsableAdminDto) {
    return `This action updates a #${id} informeRecepcionResponsableAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} informeRecepcionResponsableAdmin`;
  }
}
