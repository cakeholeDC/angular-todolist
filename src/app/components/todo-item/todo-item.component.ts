import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/Todo'
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> =  new EventEmitter()


  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  // set classes dynamically
  setClasses(){
  	let classes = {
  		todo: true,
  		'is-complete': this.todo.completed
  	}

  	return classes
  }

  onToggle(todo){
  	// toggles UI
	todo.completed = !todo.completed
	// post to api
	this.todoService.toggleCompleted(todo).subscribe(todo => {
		console.log(todo)
	})
  }

  onDelete(todo){
	this.deleteTodo.emit(todo) 	
  }

}
