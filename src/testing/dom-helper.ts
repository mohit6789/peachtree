import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class DOMHelper<T> {
  private fixture: ComponentFixture<T>;
  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  singleText(tagName: string) {
    const h2Ele = this.fixture.debugElement.query(By.css(tagName));
    if (h2Ele) {
      return h2Ele.nativeElement.textContent;
    }
  }

  count(tagName: string): number {
    const elements = this.fixture.debugElement.queryAll(By.css(tagName));
    return elements.length;
  }

  findAll(tagName: string) {
    return this.fixture.debugElement.queryAll(By.css(tagName));
  }

  findOne(tagName: string) {
    return this.fixture.debugElement.query(By.css(tagName));
  }

  findElementByText(query: string, text: string): any {
    return this.findAll(query).find(
      (d) => d.nativeElement.textContent.trim() === text.trim()
    );
  }
}
