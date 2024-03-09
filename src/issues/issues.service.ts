import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { InMemoryIssuesRepository } from 'src/database/in-memory-repository/in-memory-issues-repository';

@Injectable()
export class IssuesService {
  constructor(private readonly issuesRepository: InMemoryIssuesRepository) {}
  create(createIssueDto: CreateIssueDto) {
    return this.issuesRepository.create(createIssueDto);
  }

  findAll() {
    return this.issuesRepository.findAll();
  }

  findOne(id: number) {
    return this.issuesRepository.findOne(id);
  }

  update(id: number, updateIssueDto: UpdateIssueDto) {
    return this.issuesRepository.update(id, updateIssueDto);
  }

  remove(id: number) {
    return this.issuesRepository.remove(id);
  }
}
