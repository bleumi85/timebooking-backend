import { Cascade, Collection, Entity, EntityRepositoryType, ManyToOne, OneToMany, Property, Unique } from "@mikro-orm/core";
import { AbstractEntity } from "../../../common/entities";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities";
import { Schedule } from "../../schedules/entities";
import { LocationRepository } from "../locations.repository";

@Entity({ tableName: 'locations', customRepository: () => LocationRepository })
export class Location extends AbstractEntity {
    [EntityRepositoryType]?: LocationRepository;

    @Property()
    @Unique()
    @ApiProperty()
    title: string;

    @Property({ nullable: true })
    @ApiProperty()
    color: string;

    @Property({ default: false })
    @ApiProperty()
    showCompleteMonth = false

    @Property({ nullable: true })
    @ApiProperty()
    icon: string;

    @ManyToOne(() => User)
    user: User;

    @OneToMany(() => Schedule, (s) => s.location, { hidden: true, cascade: [Cascade.REMOVE]})
    schedules = new Collection<Schedule>(this);
}
