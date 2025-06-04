import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformeRecepcionResponsableAdminService } from './informe-recepcion-responsable-admin.service';
import { CreateInformeRecepcionResponsableAdminDto } from './dto/create-informe-recepcion-responsable-admin.dto';
import { UpdateInformeRecepcionResponsableAdminDto } from './dto/update-informe-recepcion-responsable-admin.dto';

@Controller('informe-recepcion-responsable-admin')
export class InformeRecepcionResponsableAdminController {
  constructor(private readonly informeRecepcionResponsableAdminService: InformeRecepcionResponsableAdminService) {}

  @Post()
  create(@Body() createInformeRecepcionResponsableAdminDto: CreateInformeRecepcionResponsableAdminDto) {
    return this.informeRecepcionResponsableAdminService.create(createInformeRecepcionResponsableAdminDto);
  }

  @Get()
  findAll() {
    return this.informeRecepcionResponsableAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informeRecepcionResponsableAdminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformeRecepcionResponsableAdminDto: UpdateInformeRecepcionResponsableAdminDto) {
    return this.informeRecepcionResponsableAdminService.update(+id, updateInformeRecepcionResponsableAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informeRecepcionResponsableAdminService.remove(+id);
  }
}
