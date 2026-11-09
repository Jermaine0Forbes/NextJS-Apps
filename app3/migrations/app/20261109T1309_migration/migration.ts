#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4a3c24915bc625c4ef708b954e321ee00e16dc0a8df4d8b6a5a82d28d395cce4/contract';
import endContract from '../../snapshots/4a3c24915bc625c4ef708b954e321ee00e16dc0a8df4d8b6a5a82d28d395cce4/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/920a87b50729a867e21706dd0fa5c3739e273a84ed89eb2f3525633b2d6ef85c/contract';
import startContract from '../../snapshots/920a87b50729a867e21706dd0fa5c3739e273a84ed89eb2f3525633b2d6ef85c/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      ...this.renameTable({ schema: 'public', table: 'User', to: 'Critic' }),
      this.dropTable({ schema: 'public', table: 'Post' }),
      this.createTable({
        schema: 'public',
        table: 'Movie',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('genre', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('year', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'MovieReview',
        columns: [
          col('comment', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('criticId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('movieId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('rating', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'MovieReview',
        index: 'MovieReview_criticId_idx_49e45ff1',
        columns: ['criticId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'MovieReview',
        index: 'MovieReview_movieId_criticId_idx_cd499741',
        columns: ['movieId', 'criticId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'MovieReview',
        index: 'MovieReview_movieId_idx_8cb9f9db',
        columns: ['movieId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'MovieReview',
        foreignKey: {
          name: 'MovieReview_criticId_fkey',
          columns: ['criticId'],
          references: { schema: 'public', table: 'Critic', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'MovieReview',
        foreignKey: {
          name: 'MovieReview_movieId_fkey',
          columns: ['movieId'],
          references: { schema: 'public', table: 'Movie', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
