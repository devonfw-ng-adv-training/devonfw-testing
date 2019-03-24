import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input()
  book: Book;

  @Output()
  parent: EventEmitter<Book> = new EventEmitter<Book>();

  constructor() {
  }

  ngOnInit() {
  }

  doStuff($event: MouseEvent) {
    $event.stopPropagation();
    this.parent.emit(this.book);
  }
}
