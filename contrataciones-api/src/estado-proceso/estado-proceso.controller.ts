import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoProcesoService } from './estado-proceso.service';
import { CreateEstadoProcesoDto } from './dto/create-estado-proceso.dto';
import { UpdateEstadoProcesoDto } from './dto/update-estado-proceso.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('estado-proceso')
export class EstadoProcesoController {
  constructor(private readonly estadoProcesoService: EstadoProcesoService) {}

  /*
  @Post()
  create(@Body() createEstadoProcesoDto: CreateEstadoProcesoDto) {
    return this.estadoProcesoService.create(createEstadoProcesoDto);
  }
*/

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.estadoProcesoService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoProcesoService.findOne(+id);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoProcesoDto: UpdateEstadoProcesoDto) {
    return this.estadoProcesoService.update(+id, updateEstadoProcesoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoProcesoService.remove(+id);
  }
    */
}
