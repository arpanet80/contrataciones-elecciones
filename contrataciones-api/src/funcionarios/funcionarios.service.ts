import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Funcionario } from './entities/funcionario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FuncionariosService {

  constructor(
      @InjectRepository(Funcionario) 
      private funcionarioRepository: Repository<Funcionario>,
    ) {}

    
  async findAll() : Promise<Funcionario[]> {
    const query =  await this.funcionarioRepository.find({
      where: { activo: true},
      order: { nombres: "ASC"     }
    });
    
    return query
  }

  async findOne(id: number) : Promise<Funcionario> {
      const query = await this.funcionarioRepository.findOne({ 
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
  create(createFuncionarioDto: CreateFuncionarioDto) {
    return 'This action adds a new funcionario';
  }
  
  update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    return `This action updates a #${id} funcionario`;
  }

  remove(id: number) {
    return `This action removes a #${id} funcionario`;
  }
    */
}
