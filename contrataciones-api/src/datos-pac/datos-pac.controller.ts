import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatosPacService } from './datos-pac.service';
import { CreateDatosPacDto } from './dto/create-datos-pac.dto';
import { UpdateDatosPacDto } from './dto/update-datos-pac.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('datos-pac')
export class DatosPacController {
  constructor(private readonly datosPacService: DatosPacService) {}

  @Auth(Role.Admin, Role.Usuario)
  @Post()
  create(@Body() createDatosPacDto: CreateDatosPacDto) {
    return this.datosPacService.create(createDatosPacDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.datosPacService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datosPacService.findOne(+id);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get('solproceso/:idsolproceso')
  findByIdSolProceso(@Param('idsolproceso') idsolproceso: number) {
    return this.datosPacService.findByIdSolProceso(+idsolproceso );
  }

  @Auth(Role.Admin, Role.Usuario)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatosPacDto: UpdateDatosPacDto) {
    return this.datosPacService.update(+id, updateDatosPacDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosPacService.remove(+id);
  }
}
