import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { UpdateGuestbookDto } from './dto/update-guestbook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guestbook } from './entities/guestbook.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuestbooksService {
  constructor(
    @InjectRepository(Guestbook)
    private guestbookRepository: Repository<Guestbook>,
  ) {}

  async create(createGuestbookDto: CreateGuestbookDto) {
    const guestbook = this.guestbookRepository.create(createGuestbookDto);
    await this.guestbookRepository.save(guestbook);
    return {
      success: true,
      message: '방명록이 성공적으로 저장되었습니다.',
      statusCode: 204,
    };
  }

  async findAll(): Promise<Guestbook[]> {
    return await this.guestbookRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const guestbook = await this.guestbookRepository.findOne({ where: { id } });
    if (!guestbook) {
      throw new NotFoundException(`Guestbook with ID${id} not found`);
    }
    return {
      success: true,
      message: '방명록이 성공적으로 조회되었습니다.',
      statusCode: 200,
      data: guestbook,
    };
  }

  update(id: number, UpdateGuestbookDto: UpdateGuestbookDto) {
    return `This action updates a #${id} guestbook`;
  }

  async remove(id: number) {
    const result = await this.guestbookRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('방명록을 찾을 수 없습니다.');
    }
    return { message: '삭제 성공' };
  }
}
