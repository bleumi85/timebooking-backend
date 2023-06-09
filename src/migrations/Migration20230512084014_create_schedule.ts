import { Migration } from '@mikro-orm/migrations';

export class Migration20230512084014_create_schedule extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "schedules" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null default current_timestamp, "updated_at" timestamptz(0) null, "time_from" timestamptz(0) not null, "time_to" timestamptz(0) not null, "remark" varchar(255) null, "is_transferred" varchar(255) not null default false, "user_id" uuid not null, "task_id" uuid not null, "location_id" uuid not null, constraint "schedules_pkey" primary key ("id"));');

    this.addSql('alter table "schedules" add constraint "schedules_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "schedules" add constraint "schedules_task_id_foreign" foreign key ("task_id") references "tasks" ("id") on update cascade;');
    this.addSql('alter table "schedules" add constraint "schedules_location_id_foreign" foreign key ("location_id") references "locations" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "schedules" cascade;');
  }

}
