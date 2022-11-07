import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets('public/picture', { prefix: '/api/public/picture' });
  app.useStaticAssets('public/avatar', { prefix: '/api/public/avatar' });
  app.enableCors();
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API 文档')
    .setDescription('API 文档')
    .setTermsOfService('https://docs.nestjs.cn/8/introduction')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/doc', app, document);

  await app.listen(3000);
}
bootstrap();
