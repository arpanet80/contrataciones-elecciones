import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequerimientoPlanSolprocesoService } from './requerimiento-plan-solproceso.service';
import { CreateRequerimientoPlanSolprocesoDto } from './dto/create-requerimiento-plan-solproceso.dto';
import { UpdateRequerimientoPlanSolprocesoDto } from './dto/update-requerimiento-plan-solproceso.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('requerimiento-plan-solproceso')
export class RequerimientoPlanSolprocesoController {
  constructor(private readonly requerimientoPlanSolprocesoService: RequerimientoPlanSolprocesoService) {}

  @Auth(Role.Admin, Role.Usuario)
  @Post()
  create(@Body() createRequerimientoPlanSolprocesoDto: CreateRequerimientoPlanSolprocesoDto) {
    return this.requerimientoPlanSolprocesoService.create(createRequerimientoPlanSolprocesoDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Post('/array')
  createArray(@Body() createRequerimientoPlanSolprocesoDto: CreateRequerimientoPlanSolprocesoDto[]) {
    return this.requerimientoPlanSolprocesoService.createArrayPlan(createRequerimientoPlanSolprocesoDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.requerimientoPlanSolprocesoService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requerimientoPlanSolprocesoService.findOne(+id);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get('solproceso/:idsolproceso')
  findByIdSolProceso(@Param('idsolproceso') idsolproceso: number) {
    return this.requerimientoPlanSolprocesoService.findByIdSolProceso(+idsolproceso );
  }

  @Auth(Role.Admin, Role.Usuario)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequerimientoPlanSolprocesoDto: UpdateRequerimientoPlanSolprocesoDto) {
    return this.requerimientoPlanSolprocesoService.update(+id, updateRequerimientoPlanSolprocesoDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requerimientoPlanSolprocesoService.remove(+id);
  }
}
