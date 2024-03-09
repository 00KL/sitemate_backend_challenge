import { Issue } from 'src/issues/entities/issue.entity';

export class InMemoryIssuesRepository {
  private issues: Issue[];

  constructor() {
    this.issues = [];
  }
  create(createIssueDto) {
    const issue = Object.assign(
      { id: (this.issues.length + 1).toString() },
      createIssueDto,
    );
    this.issues.push(issue);
    return issue;
  }
  findAll() {
    return this.issues;
  }
  findOne(id) {
    return this.issues.find((issue) => issue.id === id);
  }
  update(id, updateIssueDto) {
    const issue = this.issues.find((issue) => issue.id == id);
    if (!issue) {
      return null;
    }
    const index = this.issues.indexOf(issue);
    this.issues[index] = Object.assign(
      Object.assign({}, issue),
      updateIssueDto,
    );
    return this.issues[index];
  }
  remove(id) {
    const issue = this.issues.find((issue) => issue.id == id);
    if (!issue) {
      return null;
    }
    this.issues = this.issues.filter((issue) => issue.id != id);
    return issue;
  }
}
