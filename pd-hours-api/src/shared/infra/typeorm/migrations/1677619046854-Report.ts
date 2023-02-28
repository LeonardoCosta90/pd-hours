import { MigrationInterface, QueryRunner } from 'typeorm';

export class Report1677619046854 implements MigrationInterface {
  name = 'Report1677619046854';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`reports\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`spent_hours\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`employee_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_e1a19a87d2f82a8d505cf940424\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_e1a19a87d2f82a8d505cf940424\``,
    );
    await queryRunner.query(`DROP TABLE \`reports\``);
  }
}
