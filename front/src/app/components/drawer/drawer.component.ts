import { Component, ElementRef, EventEmitter, Input, Output, viewChild, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {

  @Input() isOpen! : boolean
  @Output() closeDrawer = new EventEmitter<void>() // emitted when clicking on the close button

  @ViewChild('drawerDialog') drawerDialog! : ElementRef

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

  ngOnChanges() {
    if(this.isOpen) {
      (this.drawerDialog.nativeElement as HTMLDialogElement).showModal()
    }
  }

  handleClose(){
    (this.drawerDialog.nativeElement as HTMLDialogElement).close()
    this.closeDrawer.emit()
  }

}
