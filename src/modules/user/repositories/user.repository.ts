import { CreateUseDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { UpdateUseDto } from "../dto/update-user.dto";


export abstract class UserRepository {
    abstract create(data: CreateUseDto): Promise<User> | User;
    abstract findByName(name: string): Promise<User> | User;
    abstract findByEmail(email: string): Promise<User> | User;
    abstract findAll(): Promise<User> | User[];
    abstract findOne(id: string): Promise<User> | User;
    abstract update(id: string, data: UpdateUseDto): Promise<User> | User;
    abstract delete(id: string): Promise<void> | void; 
}
