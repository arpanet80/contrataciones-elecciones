import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormaAdjudicacionService } from './forma-adjudicacion.service';
import { CreateFormaAdjudicacionDto } from './dto/create-forma-adjudicacion.dto';
import { UpdateFormaAdjudicacionDto } from './dto/update-forma-adjudicacion.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('forma-adjudicacion')
export class FormaAdjudicacionController {
  constructor(private readonly formaAdjudicacionService: FormaAdjudicacionService) {}

  /*
  @Post()
  create(@Body() createFormaAdjudicacionDto: CreateFormaAdjudicacionDto) {
    return this.formaAdjudicacionService.create(createFormaAdjudicacionDto);
  }
  */

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.formaAdjudicacionService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formaAdjudicacionService.findOne(+id);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormaAdjudicacionDto: UpdateFormaAdjudicacionDto) {
    return this.formaAdjudicacionService.update(+id, updateFormaAdjudicacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formaAdjudicacionService.remove(+id);
  }
    */
}
