import { Injectable } from '@nestjs/common';
import { Character } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CharacterDto } from './dto';

@Injectable()
export class CharacterService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Character[]> {
    return await this.prismaService.character.findMany();
  }

  async createCharacter(characterDto: CharacterDto): Promise<Character> {
    const newCharacter = await this.prismaService.character.create({
      data: characterDto,
    });
    return newCharacter;
  }
}
