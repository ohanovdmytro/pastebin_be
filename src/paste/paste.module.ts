import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { PasteService } from './paste.service';
import { PasteController } from './paste.controller';

@Module({
  imports: [PrismaModule],
  providers: [PasteService],
  controllers: [PasteController],
})
export class PasteModule {}
