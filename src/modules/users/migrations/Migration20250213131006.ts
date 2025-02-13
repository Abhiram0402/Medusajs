import { Migration } from '@mikro-orm/migrations';

export class Migration20250213131006 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "users_table" ("user_id" text not null, "user_name" text not null, "user_email_id" text not null, "user_type" text not null, "managers_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "users_table_pkey" primary key ("user_id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_users_table_user_type" ON "users_table" (user_type) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_users_table_managers_id" ON "users_table" (managers_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_users_table_deleted_at" ON "users_table" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users_table" cascade;`);
  }

}
