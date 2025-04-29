import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GuestbooksService } from './guestbooks.service';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';

@Controller('guestbooks')
export class GuestbooksController {
  constructor(private readonly guestbooksService: GuestbooksService) {}

  @Post()
  create(@Body() createGuestbookDto: CreateGuestbookDto) {
    return this.guestbooksService.create(createGuestbookDto);
  }

  @Get()
  findAll() {
    return this.guestbooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestbooksService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestbooksService.remove(+id);
  }
}
