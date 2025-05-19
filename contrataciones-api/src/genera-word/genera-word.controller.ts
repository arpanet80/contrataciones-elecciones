import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { GeneraWordService } from './genera-word.service';

@Controller('genera-word')
export class GeneraWordController {
  constructor(private readonly generaWordService: GeneraWordService) {}

  @Post('descargar-docx')
  async descargar(
    @Body() datosDocumento: DocumentoData,
    @Res() res: Response
  ) {
    const docBuffer = this.generaWordService.generateFromTemplate(datosDocumento);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=resultado.docx');
    res.send(docBuffer);
  }
}