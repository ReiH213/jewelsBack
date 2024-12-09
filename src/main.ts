import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://jewels-two.vercel.app',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
