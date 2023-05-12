import { Cascade, Collection, Entity, EntityRepositoryType, ManyToOne, OneToMany, Property, Unique } from "@mikro-orm/core";
import { AbstractEntity } from "../../../common/entities";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities";
import { Schedule } from "../../schedules/entities";
import { TaskRepository } from "../tasks.repository";

@Entity({ tableName: 'tasks', customRepository: () => TaskRepository})
export class Task extends AbstractEntity {
    [EntityRepositoryType]?: TaskRepository;

    @Property()
    @Unique()
    @ApiProperty()
    title: string;

    @Property({ nullable: true })
    @ApiProperty()
    color: string;

    @Property({ nullable: true })
    @ApiProperty()
    icon: string;

    @ManyToOne(() => User)
    user: User;

    @OneToMany(() => Schedule, (s) => s.task, { hidden: true, cascade: [Cascade.REMOVE]})
    schedules = new Collection<Schedule>(this);
}
