import { SalaryParsingPipe } from './salary-parsing.pipe';

describe('SalaryParsingPipe', () => {
  it('create an instance', () => {
    const pipe = new SalaryParsingPipe();
    expect(pipe).toBeTruthy();
  });
});
