import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  style
} from "@angular/animations";
import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from "@angular/core";

@Directive({
  selector: ".item-list"
})
export class CarouselItemElement {}

@Directive({
  selector: "[listItem]"
})
export class ListItemElement {
  constructor(public item: TemplateRef<any>) {}
}

@Directive({
  selector: "[carouselItem]"
})
export class CarouselItemDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Component({
  selector: "hello",
  exportAs: "hello",
  templateUrl: "./hello.component.html",
  styleUrls: ["./hello.component.css"]
})
export class HelloComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective) items: QueryList<
    CarouselItemDirective
  >;
  @ViewChildren(CarouselItemElement, { read: ElementRef })
  private itemsElements: QueryList<ElementRef>;

  //
  @Input() timing = "250ms ease-in";
  @Input() showControls = true;

  // my variables
  @Input() itemWidth = 200;
  private totalItemWidth: number;
  private itemContainer: number;
  private currentIterator = 1;
  private offset = 1;
  private player: AnimationPlayer;
  public allowNext: boolean = true;
  public allowPrev: boolean = true;

  
  @ViewChild("carousel") private carousel: ElementRef;
  @ViewChild("item") pimport {
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  style
} from "@angular/animations";
import {
  AfterViewInit,
  Component,
…rivate contentItem: ElementRef;

  constructor(private builder: AnimationBuilder) {}

  ngAfterViewInit() {
    setTimeout(() => {
      let {
        width,
        x
      } = this.itemsElements.first.nativeElement.getBoundingClientRect();
      let {
        width: containerSize
      } = this.carousel.nativeElement.getBoundingClientRect();
      this.itemWidth = width + x;
      this.totalItemWidth = this.itemWidth * this.itemsElements.length;
      this.itemContainer = containerSize;

      // is thesize of all the items greater than the container
      if (this.totalItemWidth > this.itemContainer) {
        this.allowNext = false; 
        console.log(this.allowNext);
      }    console.log(this.carousel.nativeElement.getBoundingClientRect());
      console.log({
        itemwidth: this.itemWidth,
        totalItemWidth: this.totalItemWidth,
        container: containerSize,
        itemsFit: Math.ceil(containerSize / this.itemWidth)
      });
    });
  }

  next() {
    this.offset = this.itemContainer * (this.currentIterator += 1);
    console.log("clicked: next", this.offset);
    this.totalItemWidth = this.totalItemWidth - this.offset;
    console.log("clicked: totalItemWidth", this.totalItemWidth);
    const myAnimation: AnimationFactory = this.buildAnimation(this.offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
    this.allowPrev = false;
    if (this.totalItemWidth <= 0) this.allowNext = true;
  }

  prev() {
    this.offset = this.itemContainer * (this.currentIterator -= 1);
    this.totalItemWidth = this.totalItemWidth + this.offset;
    console.log("clicked: offset", this.offset);
    console.log("clicked: iterator", this.currentIterator);
    console.log("clicked: totalItemWidth", this.totalItemWidth);
    const myAnimation: AnimationFactory = this.buildAnimation(this.offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
    if (this.offset <= 0) {
      this.allowPrev = true;
      this.allowNext = false;
    }
  }

  private buildAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }
}
