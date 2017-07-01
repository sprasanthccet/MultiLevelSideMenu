import { Component, ViewChild, Renderer } from '@angular/core';
import { Nav, Platform, DomController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  // for array 
  options: any;

  // for show and hide sub menu list items
  OldArrowicon:any;
  NewArrowicon:any;

  OldDivElement: any;
  NewDivElement: any;

  OlditemsCount:any;
  NewitemsCount:any;

  //for show and hide mode
  accordionMode: boolean = false;

  // for Submenu height based on platform
  iosItemHeight: number = 50;
  mdItemHeight: number = 50;
	wpItemHeight: number = 50;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private renderer: Renderer, private domCtrl: DomController) {
    this.initializeApp();
    // menu array
    this.options = [
      {iconName: 'ios-basket',displayName: 'Category'},
      {iconName: 'ios-arrow-down',displayName: 'Category 1',subItems: [{iconName: 'ios-basket',displayName: `Sub Category 1.1`},{iconName: 'ios-bookmark',displayName: 'Sub Category 1.2'}]},
      {iconName: 'ios-arrow-down',displayName: 'Category 2',subItems: [{iconName: 'ios-basket',displayName: `Sub Category 2.1`},{iconName: 'ios-bookmark',displayName: 'Sub Category 2.2'},{iconName: 'ios-bookmark',displayName: 'Sub Category 2.3'}]},
      {iconName: 'ios-arrow-down',displayName: 'Category 3',subItems: [{iconName: 'ios-basket',displayName: `Sub Category 3.1`},{iconName: 'ios-bookmark',displayName: 'Sub Category 3.2'}]},
      {iconName: 'ios-arrow-down',displayName: 'Category 4',subItems: [{iconName: 'ios-basket',displayName: `Sub Category 4.1`},{iconName: 'ios-bookmark',displayName: 'Sub Category 4.2'},{iconName: 'ios-bookmark',displayName: 'Sub Category 4.3'}]}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // For toggle menu
  public toggleItemOptions(optionsDivElement: any, arrowIcon: any, itemsCount: number): void {
		let itemHeight;
    

		if (this.platform.is('ios')) {
			itemHeight = this.iosItemHeight;
		} else if (this.platform.is('windows')) {
			itemHeight = this.wpItemHeight;
		} else {
			itemHeight = this.mdItemHeight;
		}

    // For close sub menu list items
    this.ChangeOptionDiv(optionsDivElement, itemHeight + 1, itemsCount);
    this.changeArrowIcon(arrowIcon);

    // For open sub menu list items
		this.toggleOptionSubItems(optionsDivElement, itemHeight + 1, itemsCount);
		this.toggleOptionIcon(arrowIcon);
	}

  
  // For colse Sub menu div
  private ChangeOptionDiv(optionsContainer: any, elementHeight: number, itemsCount: number){
      this.OldDivElement = this.NewDivElement;
      this.OlditemsCount = this.NewitemsCount;
     

      if(this.OldDivElement != null && this.OldDivElement != optionsContainer){
        this.domCtrl.write(() => {
          this.subItemsAreExpanded(this.OldDivElement)
              ? this.renderer.setElementStyle(this.OldDivElement, 'height', '0px')
              : this.renderer.setElementStyle(this.OldDivElement, 'height', `${(elementHeight * this.OlditemsCount)}px`);
        });
      }else{
        this.NewDivElement = null;
        this.NewitemsCount = null;
      }

      if(this.OldDivElement != optionsContainer){
          this.NewDivElement = optionsContainer;
          this.NewitemsCount = itemsCount;
      }else{
        this.NewDivElement = null;
        this.NewitemsCount = null;
      }  
  }

  // for change iocn 
  private changeArrowIcon(arrowIcon: any){
      this.OldArrowicon = this.NewArrowicon;

      if(this.OldArrowicon != null && this.OldArrowicon != arrowIcon){
        this.toggleOptionIcon(this.OldArrowicon);
      }else{
        this.NewArrowicon = null;
      }

      if(this.OldArrowicon != arrowIcon){
          this.NewArrowicon = arrowIcon;
      }else{
         this.NewArrowicon = null;
      }  
  }

  // for open sub menu dive
  private toggleOptionSubItems(optionsContainer: any, elementHeight: number, itemsCount: number): void {

		this.domCtrl.write(() => {
      this.subItemsAreExpanded(optionsContainer)
          ? this.renderer.setElementStyle(optionsContainer, 'height', '0px')
          : this.renderer.setElementStyle(optionsContainer, 'height', `${(elementHeight * itemsCount)}px`);
    });
	}

  // For change icon
  private toggleOptionIcon(arrowIcon: any): void {
		this.domCtrl.write(() => {
      this.iconIsRotated(arrowIcon)
          ? this.renderer.setElementClass(arrowIcon, 'rotate', false)
          : this.renderer.setElementClass(arrowIcon, 'rotate', true);
    });
	}
  
  private subItemsAreExpanded(element: any): boolean {
		return element.style.height !== '' && element.style.height !== '0px';
	}

  private iconIsRotated(element: any): boolean {
		return element.classList.contains('rotate');
	}

  openPage() {
    console.log('Please Fill Your Nav Page Details');
  }
  
}
