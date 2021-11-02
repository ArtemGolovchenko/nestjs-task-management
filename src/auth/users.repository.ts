import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {

    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User
    ) { }

    async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = AuthCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            const user = await this.usersRepository.create({
                username,
                password: hashedPassword,
            });
        } catch (error) {
            throw new ConflictException(error.message);
        }

    }

    async findOneUser(username: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { username: username } });
        return user;
    }
}