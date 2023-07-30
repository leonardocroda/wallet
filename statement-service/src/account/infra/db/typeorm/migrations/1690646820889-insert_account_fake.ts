import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertAccountFake1690646820889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const accountData = { balance: 1000, number: 1234567890 };
    await queryRunner.query(`
        INSERT INTO account (balance, number) VALUES (${accountData.balance}, ${accountData.number})
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM account WHERE number = 1234567890`);
  }
}
