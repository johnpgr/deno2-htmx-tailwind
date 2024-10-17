import {
    ManyToOne,
    BaseEntity,
    Column,
    Entity,
    type Relation,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "entities/User.ts";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.comments, {
        eager: true,
        cascade: true,
    })
    user: Relation<User>;

    @Column()
    body: string;

    @Column()
    createdAt: Date;
}
