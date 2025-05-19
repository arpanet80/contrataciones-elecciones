import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatosConsultoriaService } from './datos-consultoria.service';
import { CreateDatosConsultoriaDto } from './dto/create-datos-consultoria.dto';
import { UpdateDatosConsultoriaDto } from './dto/update-datos-consultoria.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('datos-consultoria')
export class DatosConsultoriaController {
  constructor(private readonly datosConsultoriaService: DatosConsultoriaService) {}

  @Auth(Role.Admin, Role.Usuario)
  @Post()
  create(@Body() createDatosConsultoriaDto: CreateDatosConsultoriaDto) {
    return this.datosConsultoriaService.create(createDatosConsultoriaDto);
  }

  @Auth(Role.Admin)
    @Post('/array')
    createArray(@Body() createDatosConsultoriaDto: CreateDatosConsultoriaDto[]) {
      return this.datosConsultoriaService.createArrayCertificado(createDatosConsultoriaDto);
    }

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.datosConsultoriaService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datosConsultoriaService.findOne(+id);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get('solproceso/:idsolproceso')
  findByIdSolProceso(@Param('idsolproceso') idsolproceso: number) {
    return this.datosConsultoriaService.findByIdSolProceso(+idsolproceso );
  }

  @Auth(Role.Admin, Role.Usuario)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatosConsultoriaDto: UpdateDatosConsultoriaDto) {
    return this.datosConsultoriaService.update(+id, updateDatosConsultoriaDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosConsultoriaService.remove(+id);
  }
}
