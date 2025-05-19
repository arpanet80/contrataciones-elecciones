import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.funcionariosService.findAll();
  }
  
  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionariosService.findOne(+id);
  }

/*
  @Post()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionariosService.create(createFuncionarioDto);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuncionarioDto: UpdateFuncionarioDto) {
    return this.funcionariosService.update(+id, updateFuncionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionariosService.remove(+id);
  }
    */
}
