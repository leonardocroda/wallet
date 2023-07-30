import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertUserFake1690649278082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO user (email, password, name, account_id) VALUES ('teste@example.com', 'senha123', 'Usuário Teste', 1);",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("DELETE FROM user WHERE email = 'teste@example.com';");
  }
}
