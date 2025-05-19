import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequerimientoProcesoService } from './requerimiento-proceso.service';
import { CreateRequerimientoProcesoDto } from './dto/create-requerimiento-proceso.dto';
import { UpdateRequerimientoProcesoDto } from './dto/update-requerimiento-proceso.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('requerimiento-proceso')
export class RequerimientoProcesoController {
  constructor(private readonly requerimientoProcesoService: RequerimientoProcesoService) {}

  @Auth(Role.Admin, Role.Usuario)
  @Post()
  create(@Body() createRequerimientoProcesoDto: CreateRequerimientoProcesoDto) {
    return this.requerimientoProcesoService.create(createRequerimientoProcesoDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Post('/array')
  createArray(@Body() createRequerimientoProcesoDto: CreateRequerimientoProcesoDto[]) {
    return this.requerimientoProcesoService.createArrayPlan(createRequerimientoProcesoDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.requerimientoProcesoService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requerimientoProcesoService.findOne(+id);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get('solproceso/:idsolproceso')
  findByIdSolProceso(@Param('idsolproceso') idsolproceso: number) {
    return this.requerimientoProcesoService.findByIdSolProceso(+idsolproceso );
  }

  @Auth(Role.Admin, Role.Usuario)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequerimientoProcesoDto: UpdateRequerimientoProcesoDto) {
    return this.requerimientoProcesoService.update(+id, updateRequerimientoProcesoDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requerimientoProcesoService.remove(+id);
  }
}
