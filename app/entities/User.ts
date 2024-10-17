import {
    OneToMany,
    BaseEntity,
    Column,
    Entity,
    type Relation,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "entities/Comment.ts";
import { Session } from "entities/Session.ts";
import { getCookies } from "@std/http/cookie";
import { SESSION_COOKIE_NAME } from "config/consts.ts";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    alias: string;

    @Column()
    hashedPassword: string;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Relation<Comment[]>;

    @OneToMany(() => Session, (session) => session.user)
    sessions: Relation<Session[]>;

    static async fromRequest(req: Request): Promise<User | null> {
        const sessionToken = getCookies(req.headers)[SESSION_COOKIE_NAME];
        if (!sessionToken) return null;

        return await User.findOneBy({ sessions: { token: sessionToken } });
    }
}
