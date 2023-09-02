import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import 'dotenv/config';
import * as cookie from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(express.static(process.cwd() + '/uploads/'));

  app.use(cookie());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sello.uz website')
    .setDescription('The sello.uz website API documentation')
    .setVersion('1.0')
    .addTag('default')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT;

  await app.listen(PORT, () => {
    console.log(PORT);
  });
}
bootstrap();
