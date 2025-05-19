import { Injectable, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs-extra';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

@Injectable()
export class GeneraWordService {

  generateFromTemplate(data: DocumentoData): Buffer {
    // Verificar que los datos necesarios estén presentes
    if (!data.nombre || !data.fecha || !data.contenido) {
      throw new BadRequestException('Faltan datos requeridos: nombre, fecha y contenido son obligatorios');
    }

    try {
      const templatePath = path.resolve(
        process.cwd(),
        'src',
        'genera-word',
        'templates',
        'carta.docx',
      );

      // Verificar que la plantilla existe
      if (!fs.existsSync(templatePath)) {
        throw new BadRequestException(`No se encontró la plantilla en: ${templatePath}`);
      }

      // Leer el archivo plantilla
      const content = fs.readFileSync(templatePath, 'binary');

      // Cargar en PizZip
      const zip = new PizZip(content);

      // Cargar en Docxtemplater
      const doc = new Docxtemplater(zip, {
        delimiters: { start: '[[', end: ']]' },
        paragraphLoop: true,
        linebreaks: true
      });

      try {
        // Usar directamente el método render con los datos
        doc.render(data);
      } catch (error) {
        console.error('Error al renderizar el documento:', error);
        
        // Proporcionar mensaje de error más detallado si es posible
        if (error.properties && error.properties.errors) {
          const errorMessages = error.properties.errors
            .map(e => `Variable "${e.properties.name}": ${e.message}`)
            .join(', ');
          throw new BadRequestException(`Error al renderizar la plantilla: ${errorMessages}`);
        }
        
        throw new BadRequestException('Error al generar el documento');
      }

      // Obtener el documento generado como buffer
      const buf = doc.getZip().generate({ type: 'nodebuffer' });
      return buf;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error en el servicio:', error);
      throw new BadRequestException('Error al generar el documento');
    }
  }
}