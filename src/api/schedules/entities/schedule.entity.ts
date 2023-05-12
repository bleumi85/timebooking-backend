import { Entity, EntityRepositoryType, ManyToOne, Property, Unique } from "@mikro-orm/core";
import { AbstractEntity } from "../../../common/entities";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities";
import { Task } from "../../tasks/entities";
import { Location } from "../../locations/entities";
import { ScheduleRepository } from "../schedules.repository";

@Entity({ tableName: 'schedules', customRepository: () => ScheduleRepository})
export class Schedule extends AbstractEntity {
    [EntityRepositoryType]?: ScheduleRepository;

    @Property()
    @ApiProperty()
    timeFrom: Date;

    @Property()
    @ApiProperty()
    timeTo: Date;

    @Property({ nullable: true })
    @ApiProperty()
    remark: string;

    @Property({ default: false })
    @ApiProperty()
    isTransferred: false;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Task)
    task: Task;

    @ManyToOne(() => Location)
    location: Location;
}
