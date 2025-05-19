import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolprocesoService } from './solproceso.service';
import { CreateSolprocesoDto } from './dto/create-solproceso.dto';
import { UpdateSolprocesoDto } from './dto/update-solproceso.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('solproceso')
export class SolprocesoController {
  constructor(private readonly solprocesoService: SolprocesoService) {}

  @Auth(Role.Admin, Role.Usuario)
  @Post()
  create(@Body() createSolprocesoDto: CreateSolprocesoDto) {
    return this.solprocesoService.create(createSolprocesoDto);
  }


  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.solprocesoService.findAll();
  }

  // Asegúrate de que getcombos esté antes de cualquier ruta dinámica.
  @Auth(Role.Admin, Role.Usuario)
  @Get('getcombos')
  async getCombos() {
    return await this.solprocesoService.getCombos();
  }
/*
  @Auth(Role.Admin, Role.Usuario)
  @Get('getreportinfo/:idproceso')
  async getReportInfo(@Param('idproceso') idproceso: string) {
    return await this.solprocesoService.getReportInfo(+idproceso);
  }
*/
  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solprocesoService.findOne(+id);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':idplan/:idunidadorganizacional')
  findByIdSolProceso(@Param('idplan') idplan: number, @Param('idunidadorganizacional') idunidadorganizacional: number) {
    return this.solprocesoService.findByIdPlanIdUnidadOpe(+idplan, +idunidadorganizacional );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolprocesoDto: UpdateSolprocesoDto) {
    return this.solprocesoService.update(+id, updateSolprocesoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solprocesoService.remove(+id);
  }

}
