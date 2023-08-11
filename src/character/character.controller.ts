import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Character } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateDuplicateCharacterFilter } from 'src/exception-filters/create-duplicate-character.filter';
import { CharacterTransformInterceptor } from 'src/interceptors/character-transform.interceptor';
import { CharacterDtoValidationPipe } from 'src/pipes/character-dto-validation.pipe';
import { CharacterService } from './character.service';
import { CharacterDto } from './dto';

@Controller('character')
export class CharacterController {
  private readonly logger = new Logger(CharacterController.name);

  constructor(private characterService: CharacterService) {}

  @UseInterceptors(CharacterTransformInterceptor)
  @Roles('admin', 'user')
  @Get('/')
  async findAll(): Promise<Character[]> {
    this.logger.log('Querying data from database...');
    const characters = await this.characterService.findAll();
    this.logger.log(`Retrieved ${characters.length} results from database`);
    return characters;
  }

  @UseFilters(CreateDuplicateCharacterFilter)
  @Roles('admin')
  @Post('/create')
  async createCharacter(
    @Body(CharacterDtoValidationPipe) characterDto: CharacterDto,
    // @Res() res: Response,
  ): Promise<Character | void> {
    // try {
    //   return await this.characterService.createCharacter(characterDto);
    // } catch (error) {
    //   this.logger.error(error);
    //   res.send({ message: 'Cannot create a character' });
    // }

    return await this.characterService.createCharacter(characterDto);
  }

  @Roles('admin', 'user', 'guest')
  @Get('/test/:id')
  test(
    @Param('id', ParseIntPipe) id: string,
    @Query('text') text: string,
    @Body() dto: any,
  ): Record<string, any> {
    return {
      message: 'This route is used to test pipe',
      data: {
        param: {
          name: 'id',
          value: id,
          type: typeof id,
        },
        query: {
          name: 'text',
          value: text,
          type: typeof text,
        },
        body: {
          name: 'dto',
          value: dto,
          type: typeof dto,
        },
      },
    };
  }
}
