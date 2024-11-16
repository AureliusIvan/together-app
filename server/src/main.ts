import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Use the JwtAuthGuard as a global guard
   */
  app.useGlobalGuards(new JwtAuthGuard());

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });

  await app.listen(parseInt(process.env.PORT, 10) || 3001);
}

bootstrap();
