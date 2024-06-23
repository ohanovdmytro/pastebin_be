import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PasteService {
  constructor(private readonly prisma: PrismaService) {}

  async createPaste(userId: number, title: string, content: string) {
    try {
      const paste = await this.prisma.paste.create({
        data: {
          title,
          content,
          userId,
        },
      });
      return paste;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to create paste: ${error.message}`);
    }
  }

  async getPaste(id: number) {
    const paste = await this.prisma.paste.findUnique({
      where: { id: Number(id) },
    });
    if (!paste) {
      throw new NotFoundException('No paste found');
    }
    return paste;
  }

  async getPastesByUsers(userId: number) {
    const pastes = await this.prisma.paste.findMany({ where: { userId } });
    if (!pastes) {
      throw new NotFoundException('No pastes found for this user');
    }
    return pastes;
  }

  async deletePaste(id: number, userId: number) {
    const paste = await this.prisma.paste.findUnique({
      where: { id: Number(id) },
    });
    if (!paste) {
      throw new NotFoundException('Paste not found');
    }
    if (paste.userId !== userId) {
      throw new ForbiddenException('Not authorized to delete this paste');
    }
    return this.prisma.paste.delete({ where: { id: Number(id) } });
  }
}
