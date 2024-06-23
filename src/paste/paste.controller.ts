import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Req,
  Res,
  Param,
  HttpStatus,
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
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  @Get(':id')
  async getPaste(@Param() params, @Res() res) {
    try {
      const paste = await this.pasteService.getPaste(params.id);
      return res.json(paste);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
    }
  }

  @Get()
  async getPasteByUser(@Req() req, @Res() res) {
    try {
      const pastes = await this.pasteService.getPastesByUsers(req.user.userId);
      return res.json(pastes);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  @Delete(':id')
  async deletePaste(@Param() params, @Req() req, @Res() res) {
    try {
      await this.pasteService.deletePaste(params.id, req.user.userId);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }
}
