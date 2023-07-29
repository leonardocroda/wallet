import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertUserTest1690500958218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO user (email, password, name) VALUES ('teste@example.com', 'senha123', 'Usuário Teste');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("DELETE FROM user WHERE email = 'teste@example.com';");
  }
}
