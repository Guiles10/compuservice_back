import { Exclude } from "class-transformer";
import { randomUUID } from "crypto";

export class User {
    readonly id: string;
    name: string;
    email: string;

    @Exclude()
    password: string;

    function: string[];
    isAdmin: boolean;

    constructor() {
        this.id = randomUUID();
    }
}
