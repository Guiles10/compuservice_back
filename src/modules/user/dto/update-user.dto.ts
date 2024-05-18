import { PartialType } from '@nestjs/mapped-types';
import { CreateUseDto } from './create-user.dto';

export class UpdateUseDto extends PartialType(CreateUseDto) {}
