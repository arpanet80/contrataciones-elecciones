import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRpaDto } from './dto/create-rpa.dto';
import { UpdateRpaDto } from './dto/update-rpa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rpa } from './entities/rpa.entity';
import { Repository } from 'typeorm';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';

@Injectable()
export class RpaService {

  constructor(
      @InjectRepository(Rpa)  
      private rpaRepository: Repository<Rpa>,

      @InjectRepository(Funcionario)  
      private funcionarioRepository: Repository<Funcionario>,

    ) {}
    
  async create(createRpaDto: CreateRpaDto) : Promise<Rpa> {
    try {

      const funcionario = await this.funcionarioRepository.findOne({ where: { id: createRpaDto.idusuario,activo: true}});

      if (funcionario) {

        const usuario = await this.rpaRepository.findOne({ where: { idusuario: createRpaDto.idusuario,activo: true}});

        if (usuario) {
          throw new BadRequestException('El rpa ya se encuentra activo');
        }

        const rpa = this.rpaRepository.create(createRpaDto);
        
        return await this.rpaRepository.save(rpa);  
      }
      else
        throw new InternalServerErrorException('El funcionario  no esta registrado:');

    } catch (error) {
      throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
    }
  }

  async findAll() : Promise<Rpa[]> {
      const query =  await this.rpaRepository.find({
        // where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
    }

  async findRpaActivo() : Promise<Rpa> {

      const query = await this.rpaRepository.findOne({ 
        where: { 
          activo: true
        },
      });

      if (query) {
        const funcionario = await this.funcionarioRepository.findOne({ where: { id: query.idusuario, activo: true}});

        query.nombreapellidos = funcionario.nombres.toUpperCase() + " " + funcionario.paterno.toUpperCase() + " " + funcionario.materno.toUpperCase();

        return query;

      }
      else {
        throw new NotFoundException('No existe RPA activo');
        
      }

  }

  async deshabilitaEInserta(idusuario: number) : Promise<Rpa> {

    const func = await this.funcionarioRepository.findOne({ where: { id: idusuario, activo: true}});

    if (func) {

      const rpaExiste = await this.rpaRepository.findOne({ where: { activo: true}});

      if (rpaExiste) {

        await this.rpaRepository.update({ id: rpaExiste.id }, {activo: false});

        const usuario = await this.rpaRepository.findOne({ where: { idusuario: idusuario }});

        if (usuario) {
          await this.rpaRepository.update({ id: usuario.id }, {activo: true});
        }
        else {
            const rpaNew = this.rpaRepository.create({ idusuario: idusuario });
            const rpa = this.rpaRepository.create(rpaNew);
            return await this.rpaRepository.save(rpa);  
        }

        return rpaExiste;

      }
      else {
        const rpaNew = this.rpaRepository.create({ idusuario: idusuario });
        const rpa = this.rpaRepository.create(rpaNew);
        return await this.rpaRepository.save(rpa);  
      }
    }
    else
      throw new InternalServerErrorException('Funcionario no registrado en BD ControlUsuarios :');
  }

  async findOne(id: number) : Promise<Rpa> {
      const query = await this.rpaRepository.findOne({ 
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

  update(id: number, UpdateRpaDto) {
    return `This action updates a #${id} rpa`;
  }

  async remove(id: number) : Promise<void> {
    try {
      const tipo  = await this.rpaRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.rpaRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
  }
}
