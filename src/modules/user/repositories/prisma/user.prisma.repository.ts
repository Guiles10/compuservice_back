
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { UserRepository } from '../user.repository';
import { CreateUseDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { UpdateUseDto } from '../../dto/update-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserPrismaRepository implements UserRepository {

    constructor(private prisma: PrismaService){}

    async create(data: CreateUseDto): Promise<User> {     
        const user = new User()
        Object.assign(user, {
           ...data,
        })
        const newUser = await this.prisma.user.create({data: {...user}})
        return plainToInstance(User, newUser)
    }

    async findByName (name: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {name}
        })
        return user
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {email}
        })
        return user
    }

    async findAll(): Promise<any> {
        const user = await this.prisma.user.findMany()
        return plainToInstance(User, user)
    }
    
    async findOne(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {id}
        })
        return plainToInstance(User, user)   
    }

    async update(id: string, data: UpdateUseDto): Promise<any> {
        const userIndex = await this.prisma.user.update({
            where: {id},
            data: {...data}
        })

        return plainToInstance(User, userIndex)
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }
}
