import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificadoPresupuestarioService } from './certificado-presupuestario.service';
import { CreateCertificadoPresupuestarioDto } from './dto/create-certificado-presupuestario.dto';
import { UpdateCertificadoPresupuestarioDto } from './dto/update-certificado-presupuestario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('certificado-presupuestario')
export class CertificadoPresupuestarioController {
  constructor(private readonly certificadoPresupuestarioService: CertificadoPresupuestarioService) {}

  @Auth(Role.Admin, Role.Usuario)
  @Post()
  create(@Body() createCertificadoPresupuestarioDto: CreateCertificadoPresupuestarioDto) {
    return this.certificadoPresupuestarioService.create(createCertificadoPresupuestarioDto);
  }

  @Auth(Role.Admin)
  @Post('/array')
  createArray(@Body() createCertificadoPresupuestarioDto: CreateCertificadoPresupuestarioDto[]) {
    return this.certificadoPresupuestarioService.createArrayCertificado(createCertificadoPresupuestarioDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.certificadoPresupuestarioService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificadoPresupuestarioService.findOne(+id);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get('byproceso/:idsolproceso')
  findByIdSolProceso(@Param('idsolproceso') idsolproceso: number) {
    return this.certificadoPresupuestarioService.findByIdSolProceso(+idsolproceso );
  }

  @Auth(Role.Admin, Role.Usuario)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificadoPresupuestarioDto: UpdateCertificadoPresupuestarioDto) {
    return this.certificadoPresupuestarioService.update(+id, updateCertificadoPresupuestarioDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificadoPresupuestarioService.remove(+id);
  }
}
