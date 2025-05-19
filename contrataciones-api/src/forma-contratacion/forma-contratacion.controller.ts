import { Auth } from 'src/auth/decorators/auth.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormaContratacionService } from './forma-contratacion.service';
import { CreateFormaContratacionDto } from './dto/create-forma-contratacion.dto';
import { UpdateFormaContratacionDto } from './dto/update-forma-contratacion.dto';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('forma-contratacion')
export class FormaContratacionController {
  constructor(private readonly formaContratacionService: FormaContratacionService) {}

  /*@Post()
  create(@Body() createFormaContratacionDto: CreateFormaContratacionDto) {
    return this.formaContratacionService.create(createFormaContratacionDto);
  }
*/
  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.formaContratacionService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formaContratacionService.findOne(+id);
  }
/*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormaContratacionDto: UpdateFormaContratacionDto) {
    return this.formaContratacionService.update(+id, updateFormaContratacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formaContratacionService.remove(+id);
  }
    */
}
