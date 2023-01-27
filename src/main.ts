import "./tracer";
import { NestFactory } from '@nestjs/core';
import { NextFunction, Request } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use( (req: Request, res: Response, next: NextFunction) => {
    console.log(`Method ${req.method} on ${req.url}`)
    next()
  })

  await app.listen(3333);
}
bootstrap();
