---
title: Strucural vs Attribute Directives in Angular
date: '2019-01-03'
---

Anyone who has worked with Angular would have used directives. According to the the official 
[Angular documentation](https://angular.io/guide/attribute-directives#directives-overview), there are 3 types of Directives:
- Components
- Structural Directives like `ngIf` and `ngFor`
- Attribute Directives like `ngStyle`

This post primarily documents creating and using custom Structural Directives and how it differs with respect to the more commonly used attribute directive.

## What are structural directives?

As the name suggests, structural directives are responsible for manipulating the DOM structure by adding, removing or changing the elements they are attached to. Perhaps the most common structural directive most Angular developers use the `ngIf` directive, which is used to show/hide the elements based on a boolean condition.

> Beginner tip: The structural directives are prefixed with a `*` while attribute directives may be used just by adding their selector as an attribute to the element. 

## Creating your own structural directive.
Lets assume that you have a payment configuration based on which you want to show or hide certain elements for certain users. We will create a directive, which will take an input for a feature flag and then show or hide the element based on the payment configuration.

Creating a structural directive is pretty similar to creating an attribute directive.

```
@Directive({ selector: '[appRenderIfEnabled]'})
export class RenderFeatureDirective implements OnInit{

    private flag: string;

    @Input()
    set appRenderIfEnabled(flag: string){
        this.flag = flag;
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private configService: ConfigService
    ) {}

    ngOnInit(){
        this.configService.isEnabled(this.flag).subscribe(enabled=>{
            if(enabled){
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        });
    }
}

```

As you can see, the directive takes one input, the name of which must match with the selector that you choose (appRenderIfEnabled) in this case. 
The directive gets the reference to a `TemplateRef` and a `ViewContainer`, this is because a directive creates an embedded view inside the given `ViewContainer` and the `TemplateRef` is used to access the contents of the template/element the directive is attached to.

Now the custom directive is ready to be used, add it to any component like: 


```
<my-pro-version-component *appRenderIfEnabled="'PRO_PACKAGE_ONLY'"></my-pro-version-component>
```

## Using additional @Input with your directive.

Till now, our directive is just taking the flag as an input, but what if you want to be able to provide a default value incase of missing configuration?

The key part of having additional inputs in structural directives is that the name of the input property must be prefixed with the selector. In our case, we want a `defaultConfig`, so the name of the input property would be `appRenderIfEnabledDefaultConfig`.

```
@Directive({ selector: '[appRenderIfEnabled]'})
export class RenderFeatureDirective implements OnInit{

    private flag: string;
    private defaultConfig = false;

    @Input()
    set appRenderIfEnabled(flag: string){
        this.flag = flag;
    }

    // must be prefixed with selector
    @Input()
    set appRenderIfEnabledDefaultConfig(conf:boolean){
        this.defaultConfig = conf;
    }

```

The new input can be simply added using the following syntax:

```
<my-pro-version-component *appRenderIfEnabled="'PRO_PACKAGE_ONLY';defaultConfig: true"></my-pro-version-component>
```

### Useful links - 
- [Official Documentation for Directives](https://angular.io/guide/attribute-directives#directives-overview)

- [Official Documentation for creating Structural Directives](https://angular.io/guide/structural-directives#write-a-structural-directive)