import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsString, MinLength } from "class-validator"

export enum UserFunction {
    ATENDIMENTO = 'Atendimento',
    SUPORTE = 'Suporte',
    PROGRAMACAO = 'Programação',
    FATURAMENTO = 'Faturamento',
    SUPORTEHOSPITAL = 'Suporte Hospital',
    INSTALACAO = 'Instalação',
}

export class CreateUseDto {
    @IsString()
    @IsNotEmpty({message: "Name Invalido"})
    name: string

    @IsString()
    @IsNotEmpty({message: "E-mail invalido"})
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Transform(({value}: {value: string}) => hashSync(value, 10), {
        groups: ['Trasforme']
    })
    password: string

    @IsArray()
    @IsNotEmpty({ message: "Escolha pelo menos um setor" }) 
    @IsIn(Object.values(UserFunction), { each: true }) 
    function: UserFunction[]; 

    @IsNotEmpty({message: "Usuario é ADM?"})
    @IsBoolean()
    isAdmin: boolean;
}
