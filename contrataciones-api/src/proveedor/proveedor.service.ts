import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-plane.dto';

@Injectable()
export class ProveedorService {

  constructor(
    @InjectRepository(Proveedor) 
    private proveedorRepository: Repository<Proveedor>,
  ) {}


  async create(createProveedorDto: CreateProveedorDto) : Promise<Proveedor> {

    try {
      createProveedorDto.razonsocial = createProveedorDto.razonsocial.toUpperCase();
      createProveedorDto.representantelegal = createProveedorDto.representantelegal.toUpperCase();
      
      const plan = this.proveedorRepository.create(createProveedorDto);
      
      return await this.proveedorRepository.save(plan);  
      
    } catch (error) {
      throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
    }

  }

  async findAll() : Promise<Proveedor[]> {
    const query =  await this.proveedorRepository.find({
      where: { activo: true},
      order: { id: "ASC"     }
    });
    
    return query
  }

  async findOne(idsol: number) : Promise<Proveedor> {
    const query = await this.proveedorRepository.findOne({ 
      where: { 
        idsolicitud: idsol,
        activo: true
       },
    });

    if (!query) {
      throw new NotFoundException('No existe el registro solicitado');
    }

    return query;
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto) : Promise<Proveedor> {
    try {
      const plan  = await this.proveedorRepository.findOne({ where: { id } });
      if (!plan) {
        throw new NotFoundException('No existe el registro solicitado');
      }

      (updateProveedorDto as any).updatedAt = new Date();
      
      await this.proveedorRepository.update({ id }, updateProveedorDto);
      return await this.proveedorRepository.findOne({ where: { id } });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el registro:' + error);
    }
  }

  async remove(id: number) : Promise<void> {
    try {
      const tipo  = await this.proveedorRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.proveedorRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
  }

}
