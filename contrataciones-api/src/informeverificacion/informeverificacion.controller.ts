import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformeverificacionService } from './informeverificacion.service';
import { CreateInformeverificacionDto } from './dto/create-informeverificacion.dto';
import { UpdateInformeverificacionDto } from './dto/update-informeverificacion.dto';

@Controller('informeverificacion')
export class InformeverificacionController {
  constructor(private readonly informeverificacionService: InformeverificacionService) {}

  @Post()
  create(@Body() createInformeverificacionDto: CreateInformeverificacionDto) {
    return this.informeverificacionService.create(createInformeverificacionDto);
  }

  @Get()
  findAll() {
    return this.informeverificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informeverificacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformeverificacionDto: UpdateInformeverificacionDto) {
    return this.informeverificacionService.update(+id, updateInformeverificacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informeverificacionService.remove(+id);
  }
}
