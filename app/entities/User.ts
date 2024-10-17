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

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    alias: string;

    @Column()
    hashedPassword: string;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Relation<Comment[]>;

    @OneToMany(() => Session, (session) => session.user)
    sessions: Relation<Session[]>;
}
