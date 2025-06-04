import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformeRecepcionService } from './informe-recepcion.service';
import { CreateInformeRecepcionDto } from './dto/create-informe-recepcion.dto';
import { UpdateInformeRecepcionDto } from './dto/update-informe-recepcion.dto';

@Controller('informe-recepcion')
export class InformeRecepcionController {
  constructor(private readonly informeRecepcionService: InformeRecepcionService) {}

  @Post()
  create(@Body() createInformeRecepcionDto: CreateInformeRecepcionDto) {
    return this.informeRecepcionService.create(createInformeRecepcionDto);
  }

  @Get()
  findAll() {
    return this.informeRecepcionService.findAll();
  }

  @Get('proceso/:idSol')
  findAllByProceso(@Param('idSol') idSol: string) {
    return this.informeRecepcionService.findOneByIdSol(+idSol);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informeRecepcionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformeRecepcionDto: UpdateInformeRecepcionDto) {
    return this.informeRecepcionService.update(+id, updateInformeRecepcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informeRecepcionService.remove(+id);
  }
}
