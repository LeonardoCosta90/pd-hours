import { MigrationInterface, QueryRunner } from 'typeorm';

export class Employee1677619008796 implements MigrationInterface {
  name = 'Employee1677619008796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`employees\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`estimated_hours\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`squad_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_c9d65d768c842af3fc30c38b542\` FOREIGN KEY (\`squad_id\`) REFERENCES \`squads\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_c9d65d768c842af3fc30c38b542\``,
    );
    await queryRunner.query(`DROP TABLE \`employees\``);
  }
}
