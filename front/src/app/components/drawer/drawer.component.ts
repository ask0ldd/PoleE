import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {

  @Input() isOpen! : boolean
  @Output() closed = new EventEmitter<void>() // emitted when clicking on the close button

  // dealing with child component
  /*@Input() childComponentType: any;
  @ViewChild('drawerContent', { read: ViewContainerRef }) container!: ViewContainerRef

  ngOnChanges() {
    if (this.childComponentType) {
      this.loadComponent()
    }
  }

  private loadComponent() {
    this.container.clear()
    this.container.createComponent(this.childComponentType)
  }*/

  handleClose(){
    this.closed.emit()
  }

}
