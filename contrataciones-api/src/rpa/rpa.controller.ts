import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RpaService } from './rpa.service';
import { CreateRpaDto } from './dto/create-rpa.dto';
import { UpdateRpaDto } from './dto/update-rpa.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('rpa')
export class RpaController {
  constructor(private readonly rpaService: RpaService) {}

  @Auth(Role.Admin)
  @Post()
  create(@Body() createRpaDto: CreateRpaDto) {
    return this.rpaService.create(createRpaDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.rpaService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get('activo')
  findRpaActivo() {
    return this.rpaService.findRpaActivo();
  }

  @Auth(Role.Admin)
  @Get('deshanilitaeinserta/:idusuario')
  deshabilitaEInserta(@Param('idusuario') idusuario: string) {
    console.log(idusuario);
    return this.rpaService.deshabilitaEInserta(+idusuario);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rpaService.findOne(+id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRpaDto: UpdateRpaDto) {
    return this.rpaService.update(+id, updateRpaDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rpaService.remove(+id);
  }
}
