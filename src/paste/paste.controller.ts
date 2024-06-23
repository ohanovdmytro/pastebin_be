import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Res,
  Param,
  HttpStatus,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PasteService } from './paste.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('paste')
@Controller('paste')
export class PasteController {
  constructor(private readonly pasteService: PasteService) {}

  @Post()
  async createPaste(@Body() body, @Req() req, @Res() res) {
    try {
      const { title, content } = body;
      const userId = req.user.userId;
      const paste = await this.pasteService.createPaste(userId, title, content);
      return res.status(HttpStatus.CREATED).json(paste);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Something went wrong. Please try again later.',
      });
    }
  }

  @Get(':id')
  async getPaste(@Param('id') id: number, @Res() res) {
    try {
      const paste = await this.pasteService.getPaste(id);
      return res.json(paste);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Something went wrong. Please try again later.',
      });
    }
  }

  @Get()
  async getPasteByUser(@Req() req, @Res() res) {
    try {
      const pastes = await this.pasteService.getPastesByUsers(req.user.userId);
      return res.json(pastes);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Something went wrong. Please try again later.',
      });
    }
  }

  @Put(':id')
  async editPaste(
    @Param('id') id: number,
    @Body() { title, content }: { title?: string; content?: string },
    @Req() req,
    @Res() res,
  ) {
    try {
      const userId = req.user.userId;
      const editedPaste = await this.pasteService.editPaste(
        id,
        userId,
        title,
        content,
      );
      return res.json(editedPaste);
    } catch (error) {
      console.log(error);
      
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Something went wrong. Please try again later.',
      });
    }
  }

  @Delete(':id')
  async deletePaste(@Param('id') id: number, @Req() req, @Res() res) {
    try {
      await this.pasteService.deletePaste(id, req.user.userId);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Something went wrong. Please try again later.',
      });
    }
  }
}
