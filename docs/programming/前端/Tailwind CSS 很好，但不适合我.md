## 前言

在一个月前，我选择了 Tailwind CSS 用于一个企业官网的开发。一个月后，项目经过了几次小版本迭代，我对 Tailwind CSS 的使用小有心得。本文将阐述我在企业开发中使用 Tailwind CSS 后对它的看法。

## 什么是 Tailwind CSS？

Tailwind CSS 是一个高度可定制的 CSS 框架，它旨在帮助开发人员快速构建现代化、响应式的网页界面。与其他框架如Bootstrap不同，Tailwind CSS 不依赖于预定义的样式类，而是提供一组原子级的样式类，开发人员可以根据需要自由组合这些类来构建页面。

Tailwind CSS 的核心概念是原子级类，每个类都对应一个具体的样式属性或操作，例如字体大小、颜色、边距、宽度等。通过组合这些类，可以快速地定义所需的样式，并实现样式的可复用性和可定制性。

使用 Tailwind CSS，开发人员可以避免编写大量重复的 CSS 代码，而是直接使用预定义的类进行构建，从而提高开发效率。同时，由于每个类只负责一个具体的样式属性，因此更容易理解和维护。

Tailwind CSS 还提供了一套强大的工具和插件，用于辅助开发过程，例如响应式布局、动画效果、自定义主题等。它还支持通过配置文件进行项目定制，开发人员可以根据项目需求选择性地启用或禁用某些特性。

总之，Tailwind CSS 是一个灵活、高效、可扩展的 CSS 框架，旨在帮助开发人员快速构建现代化的网页界面。

## 使用前我希望 Tailwind CSS 带来什么？

1. 不再为 CSS 命名而烦恼。
2. 更快更简单地实现样式。
3. 项目整体样式风格保持一致。

## Tailwind CSS 实际带来了什么？

### 命名更简单了

使用 Tailwind CSS 后，开发人员可以避免为 CSS 类命名而烦恼的情况，因为它采用了一种基于原子级类的设计思想。这意味着每个类只负责一个具体的样式属性或操作，例如 `text-red-500` 表示文本颜色为红色，并且颜色值为 500。

由于每个类都是原子级别的，不需要为每个元素编写自定义的类名，而是直接通过将各种类组合在一起来构建所需的样式。这种方式具有高度的可复用性和可维护性，使开发人员可以更快地编写样式。

### 更快地实现样式？未必

这点要分情况讨论，对于没有 UI 设计师的团队来说，Tailwind CSS 在提供了基础方案的同时又提供了简便的自定义方案的能力，即便没有设计师，开发者可以很简单地写出有“及格分”的页面。

对于有 UI 设计师的团队来说，往往会使用`蓝湖`与 `Figma` 这样的工具，设计图本身拥有显示 CSS 代码的能力，通常复制代码后只需要小小修改即可使用，使用 Tailwind CSS 来手写反而降低了效率。

### 项目样式风格保持一致？同样未必

项目的样式细节划分为一系列原子类，例如颜色、尺寸、间距、字体样式等。理论上使用原子类后，页面的样式风格会更统一。然而，前端开发者可能面临的一个窘境是设计图本身并没有统一。**一些设计过于注重细节而忽视了整体上的统一**，在遵循语义化规则时可能被忽视，一旦使用原子类问题就显而易见。

以字号为例，理想状态是字号大小使用固定的方案，例如：

| 类名      | 属性                                                         |
| --------- | ------------------------------------------------------------ |
| text-xs   | font-size: 0.75rem; /* 12px */ line-height: 1rem; /* 16px */ |
| text-sm   | font-size: 0.875rem; /* 14px */ line-height: 1.25rem; /* 20px */ |
| text-base | font-size: 1rem; /* 16px */ line-height: 1.5rem; /* 24px */  |
| text-lg   | font-size: 1.125rem; /* 18px */ line-height: 1.75rem; /* 28px */ |
| text-xl   | font-size: 1.25rem; /* 20px */ line-height: 1.75rem; /* 28px */ |
| text-2xl  | font-size: 1.5rem; /* 24px */ line-height: 2rem; /* 32px */  |
| text-3xl  | font-size: 1.875rem; /* 30px */ line-height: 2.25rem; /* 36px */ |
| text-4xl  | font-size: 2.25rem; /* 36px */ line-height: 2.5rem; /* 40px */ |
| text-5xl  | font-size: 3rem; /* 48px */ line-height: 1;                  |
| text-6xl  | font-size: 3.75rem; /* 60px */ line-height: 1;               |
| text-7xl  | font-size: 4.5rem; /* 72px */ line-height: 1;                |
| text-8xl  | font-size: 6rem; /* 96px */ line-height: 1;                  |
| text-9xl  | font-size: 8rem; /* 128px */ line-height: 1;                 |

然而，实际情况是也许设计师本身并不清楚项目字号究竟有多少种，可能存在22、26、28，也可能存在32、34，甚至奇数大小的字号也会存在。而 `line-height`的数值更是随心所欲，原因可能仅仅是因为在这个地方看起来好看。

碰到这样的问题，开发者又陷入了新的命名困难中。心想干脆摆烂所有地方使用`text-[14px]`这样的任意值，但这又失去了希望风格统一、便于管理的初衷。

## 更简单的响应式设计

之所以单独拿出来讲这点，是因为这是我在选型时未考虑到的。但是在改版变成响应式设计中觉得很便利的一点，例如：

```
 grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4
```

很简单地创建了一个网格布局，如果使用媒体查询，代码量会多很多。

## Tailwind CSS 很好，但不适合我。

引用知乎上`《为什么国内类似 Tailwind CSS 这样的方案没有流行起来？》`回答下的一一段话。

> 主要看[前端开发](https://www.zhihu.com/search?q=前端开发&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2971232012})工作在进行复用和组合时的[颗粒度](https://www.zhihu.com/search?q=颗粒度&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2971232012})大小。Tailwind 是一个很具体的颗粒度，如果一个项目所需的颗粒度比它大或比它小，用起来的体验都不是最优的。
>
> 对于老一点、成熟一点的公司来说，早就有自己的设计体系和对应的[前端组件](https://www.zhihu.com/search?q=前端组件&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2971232012})库了，复用和组合的颗粒是组件。例如说，我们全公司都规定了按钮长这个样子、两个水平并排的按钮间隔这么多、移动版两个垂直堆叠的按钮之间间隔这么多，那还有 Tailwind 什么事情？
>
> ……
>
> Tailwind 适合的是新生代的公司，还没有自己的设计体系，要从零开始做一套自己的。这时候 Tailwind 的优势就出来了：你还没有自己的组件对吧？那你要用更小颗粒度的东西先搭出来通用组件吧？这个更小颗粒度的东西到底是什么呢？就是 HTML 元素和 CSS 样式了。
>
> 作者：Cat Chen
> 链接：https://www.zhihu.com/question/506073568/answer/2971232012
> 来源：知乎

对于成熟公司来说，早有自己的开发体系与组件库，不可能也没必要用 Tailwind CSS 重新来过；而对于中小公司来说，过于注重局部而忽视整体的设计，使用原子类是对开发者的折磨。毕竟，**前端开发本身缺少话语权，照着设计图来做就完事了**。

总而言之，设计规范越明确，Tailwind CSS 用起来越顺手。

## 参考

1. [如何评价CSS框架TailwindCSS？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/337939566)

