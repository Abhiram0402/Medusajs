import { Migration } from '@mikro-orm/migrations';

export class Migration20250213134809 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "leave" ("id" text not null, "leave_date" text not null, "leave_reason" text not null, "managers_id" text not null, "request_status" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "leave_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_leave_managers_id" ON "leave" (managers_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_leave_deleted_at" ON "leave" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "leave" cascade;`);
  }

}
