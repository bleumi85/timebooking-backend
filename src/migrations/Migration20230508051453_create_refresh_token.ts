import { Migration } from '@mikro-orm/migrations';

export class Migration20230508051453_create_refresh_token extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "refresh_tokens" ("id" varchar(255) not null default gen_random_uuid(), "created_at" timestamptz(0) not null default current_timestamp, "updated_at" timestamptz(0) null, "user_id" varchar(255) not null, "token" varchar(255) not null, "expires" timestamptz(0) not null, "created" timestamptz(0) null, "created_by_ip" varchar(255) null, "revoked" timestamptz(0) null, "revoked_by_ip" varchar(255) null, "replaced_by_token" varchar(255) null, "reason_revoked" varchar(255) null, constraint "refresh_tokens_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "refresh_tokens" add constraint "refresh_tokens_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "refresh_tokens" cascade;');
  }
}
