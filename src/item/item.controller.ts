import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() body) {
    if (!Array.isArray(body.images) || body.images.length !== 3) {
      throw new BadRequestException(
        'Images array must contain exactly 3 images.',
      );
    }

    return this.itemService.create(body);
  }

  @Get()
  async findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body) {
    if (
      body.images &&
      (!Array.isArray(body.images) || body.images.length !== 3)
    ) {
      throw new BadRequestException(
        'Images array must contain exactly 3 images.',
      );
    }

    return this.itemService.update(id, body);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.itemService.delete(id);
  }
}
