import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*//////////// Para https ////////////////////////////
  const httpsOptions = {
    key: fs.readFileSync('./secrets/private-key.pem'),
    cert: fs.readFileSync('./secrets/public-certificate.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  *///////////////////////////////////////////////

  // Habilita CORS
  app.enableCors();

  // Amplia el tamaño que se recibe en el BOSY, sin esto peticiones grandes dan error 413 (Payload Too Large) 
  app.use(json({ limit: '50mb' }));

  // Agrega validadores para los DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Agrega Swagger
  const options = new DocumentBuilder()
    .setTitle('Usuarios API')
    .setDescription('API de control de usuarios')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
    

  const port = process.env.PORT || 3000;
  
  await app.listen(port);
}
bootstrap();
