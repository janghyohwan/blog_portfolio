import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGuestbookDto {
  @IsString()
  @MinLength(2, { message: '작성자는 2글자 이상이어야 합니다.' })
  @MaxLength(20, { message: '작성자는 20글자 이하여야 합니다.' })
  @IsNotEmpty({ message: '작성자는 필수 입력값 입니다.' })
  author: string;

  @IsString()
  @MinLength(2, { message: '내용은 2글자 이상이어야 합니다.' })
  @MaxLength(500, { message: '내용은 500글자 이하여야 합니다.' })
  @IsNotEmpty({ message: '내용은 필수 입력값 입니다.' })
  content: string;
}
