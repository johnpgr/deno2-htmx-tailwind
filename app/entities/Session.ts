import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    type Relation,
} from "typeorm"
import { User } from "entities/User.ts"

@Entity()
export class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.sessions)
    user: Relation<User>

    @Column()
    token: string

    @Column()
    expiresAt: Date
}
