import { Migration } from '@mikro-orm/migrations';

export class Migration20230511134739_create_location extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "locations" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null default current_timestamp, "updated_at" timestamptz(0) null, "title" varchar(255) not null, "color" varchar(255) null, "show_complete_month" boolean not null default false, "icon" varchar(255) null, "user_id" uuid not null, constraint "locations_pkey" primary key ("id"));');
    this.addSql('alter table "locations" add constraint "locations_title_unique" unique ("title");');

    this.addSql('alter table "locations" add constraint "locations_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "locations" cascade;');
  }

}
