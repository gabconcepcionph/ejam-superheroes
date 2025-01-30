import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Force immediate log output
  console.log('Starting NestJS application...');
  process.stdout.write('Starting NestJS application2...\n');
  
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log']
    });
    
    // Enable global validation
    app.useGlobalPipes(new ValidationPipe());
    
    // Enable CORS for Docker network
    app.enableCors({
      origin: '*', 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Accept',
    });

    const port = process.env.PORT ?? 3000;
    
    console.log(`Listening on port ${port}`);
    process.stdout.write(`Listening on port ${port}\n`);
    
    await app.listen(port);
  } catch (error) {
    console.error('Bootstrap failed', error);
    process.stderr.write(`Bootstrap failed: ${error}\n`);
    process.exit(1);
  }
}

bootstrap();
