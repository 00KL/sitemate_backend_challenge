import { Module } from '@nestjs/common';
import { InMemoryIssuesRepository } from './in-memory-repository/in-memory-issues-repository';

@Module({
  imports: [],
  controllers: [],
  providers: [InMemoryIssuesRepository],
  exports: [InMemoryIssuesRepository],
})
export class DatabaseModule {}
