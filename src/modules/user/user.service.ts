import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository){}

  async create(createUserDto: CreateUserDto) {
    
    if(await this.userRepository.findByEmail(createUserDto.email)){
      throw new ConflictException("E-mail já está em uso!!!")
    }
    if (await this.userRepository.findByName(createUserDto.name)) {
      throw new ConflictException("Nome de usuário já está em uso!");
    }

    const hashedPass = hashSync(createUserDto.password, 10);
    const user = await this.userRepository.create({
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPass,
          function: createUserDto.function,
          isAdmin: createUserDto.isAdmin,
  });

    // const user = await this.userRepository.create(createUserDto)
    return user
  }
  
  async findByName(name: string) {
    return await this.userRepository.findByName(name)
  }
  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email)
  }

  async findOne(id: string) {
    const findClient =  await this.userRepository.findOne(id)
    if(!findClient){
      throw new NotAcceptableException("User não encontrado!")
    }
    return findClient
  }

  async findAll() {
    const users = await this.userRepository.findAll()
    return users
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOne(id);
    if (!existingUser) {
      throw new NotFoundException('Cliente não encontrado');
    }

    if (updateUserDto.name && updateUserDto.name !== existingUser.name) {
      const userWithSameName = await this.userRepository.findByName(updateUserDto.name);
      if (userWithSameName && userWithSameName.id !== id) {
        throw new ConflictException('Nome já está em uso!!!');
      }
    }

    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(updateUserDto.email);
      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new ConflictException('E-mail já está em uso!!!');
      }
    }

    const user = await this.userRepository.update(id, updateUserDto)
    return user
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne(id)
    if(!user){
      throw new NotAcceptableException("Usuário não encontrado!")
    }
    
    await this.userRepository.delete(id)
    return
  }
}
