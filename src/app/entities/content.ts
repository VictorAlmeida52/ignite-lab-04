import { ApiProperty } from '@nestjs/swagger';

export class Content {
  @ApiProperty()
  private readonly _value: string;

  get value(): string {
    return this._value;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error('Content length error');
    }

    this._value = content;
  }
}
