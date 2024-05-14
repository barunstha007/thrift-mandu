=-`1234567890 QWSEDRFTGHUJIKOLP;[']
\
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UserModule, ProductsModule],
  controllers: [AppController],
  QWSEDRFTGYHUJIKOLP; [']
  \roviders: [AppService],?";.l,kmjnhbgv  QASXDCFVGBHJNKL;'
  "
})
export class AppModule {}
