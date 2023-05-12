import { Migration } from '@mikro-orm/migrations';

export class Migration20230512055721_create_task extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tasks" ("id" varchar(255) not null default gen_random_uuid(), "created_at" timestamptz(0) not null default current_timestamp, "updated_at" timestamptz(0) null, "title" varchar(255) not null, "color" varchar(255) null, "icon" varchar(255) null, "user_id" varchar(255) not null, constraint "tasks_pkey" primary key ("id"));');
    this.addSql('alter table "tasks" add constraint "tasks_title_unique" unique ("title");');

    this.addSql('alter table "tasks" add constraint "tasks_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "tasks" cascade;');
  }

}
