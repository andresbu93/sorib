import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CustomStrategy } from './custom.strategy';

@Module({
  imports: [PassportModule],
  providers: [CustomStrategy],
})
export class AuthModule {}
