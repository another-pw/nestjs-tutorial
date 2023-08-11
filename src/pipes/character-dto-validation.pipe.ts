import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Logger,
} from '@nestjs/common';

@Injectable()
export class CharacterDtoValidationPipe implements PipeTransform {
  private readonly logger = new Logger(CharacterDtoValidationPipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log(`Argument's metadata: ${JSON.stringify(metadata)}`);
    this.logger.log(`Before transforming data: ${JSON.stringify(value)}`);

    const createCharacterDtoKey = ['name'];
    for (const [key] of Object.entries(value)) {
      if (!createCharacterDtoKey.includes(key)) {
        delete value[key];
      }
    }

    this.logger.log(`After transforming data: ${JSON.stringify(value)}`);
    return value;
  }
}
