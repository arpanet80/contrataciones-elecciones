import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentoReferenciaService } from './documento-referencia.service';
import { CreateDocumentoReferenciaDto } from './dto/create-documento-referencia.dto';
import { UpdateDocumentoReferenciaDto } from './dto/update-documento-referencia.dto';

@Controller('documento-referencia')
export class DocumentoReferenciaController {
  constructor(private readonly documentoReferenciaService: DocumentoReferenciaService) {}

  // @Post()
  // create(@Body() createDocumentoReferenciaDto: CreateDocumentoReferenciaDto) {
  //   return this.documentoReferenciaService.create(createDocumentoReferenciaDto);
  // }

  @Get()
  findAll() {
    return this.documentoReferenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentoReferenciaService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDocumentoReferenciaDto: UpdateDocumentoReferenciaDto) {
  //   return this.documentoReferenciaService.update(+id, updateDocumentoReferenciaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.documentoReferenciaService.remove(+id);
  // }
}
