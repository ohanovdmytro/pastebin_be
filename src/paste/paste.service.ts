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

  async editPaste(
    id: number,
    userId: number,
    title?: string,
    content?: string,
  ) {
    const pasteToEdit = await this.prisma.paste.findUnique({ where: { id: Number(id) } });

    if (!pasteToEdit) {
      throw new NotFoundException('No paste found');
    }

    if (pasteToEdit.userId !== userId) {
      throw new ForbiddenException('Not authorized to edit this paste');
    }

    try {
      const editedPaste = await this.prisma.paste.update({
        where: { id: Number(id) },
        data: {
          title: title ?? pasteToEdit.title,
          content: content ?? pasteToEdit.content,
        },
      });
      return editedPaste;
    } catch (error) {
      throw new Error(`Failed to update paste: ${error.message}`);
    }
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
