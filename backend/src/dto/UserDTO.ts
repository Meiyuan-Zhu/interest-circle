import { Rule, RuleType } from '@midwayjs/validate';

export class RegisterDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().min(6).required())
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }
}

export class LoginDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
  constructor() {
    this.username = '';
    this.password = '';
  }
}

