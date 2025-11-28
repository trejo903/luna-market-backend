import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

   app.enableCors({
    origin: [
      'http://localhost:3000',            // Frontend local
      process.env.FRONTEND_ORIGIN || '',  // Dominio de producción (Vercel)
    ].filter(Boolean),                     // quita strings vacíos

    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // si luego usas cookies / auth
  });

  await app.listen(process.env.PORT ?? 3500);
}
bootstrap();
