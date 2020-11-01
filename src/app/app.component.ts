import {
  Component,
  AfterViewInit,
  Directive,
  TemplateRef
} from "@angular/core";

@Directive({
  selector: ".carousel-container__item"
})
export class CarouselContainerItemDrective {}

@Directive({
  selector: "[carouselItem]"
})
export class CarouselItemDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  items = [
    { name: "item 1" },
    { name: "item 2" },
    { name: "item 3" },
    { name: "item 4" },
    { name: "item 5" },
    { name: "item 6" },
    { name: "item 7" }
  ];

  itemHandler(index: number) {
    console.log(index);
  }
}
