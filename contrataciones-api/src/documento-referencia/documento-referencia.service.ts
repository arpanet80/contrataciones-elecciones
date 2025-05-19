import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentoReferenciaDto } from './dto/create-documento-referencia.dto';
import { UpdateDocumentoReferenciaDto } from './dto/update-documento-referencia.dto';
import { DocumentoReferencia } from './entities/documento-referencia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentoReferenciaService {

  constructor(
      @InjectRepository(DocumentoReferencia) private documentosRefereniaRepository: Repository<DocumentoReferencia>,
    ) {}
        
      
    async findAll() : Promise<DocumentoReferencia[]> {
        const query =  await this.documentosRefereniaRepository.find({
          where: { activo: true},
          order: { id: "ASC"     }
        });
        
        return query
      }
        
      async findOne(id: number) : Promise<DocumentoReferencia> {
        const query = await this.documentosRefereniaRepository.findOne({ 
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
