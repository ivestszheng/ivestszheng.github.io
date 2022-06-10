# jQuery快速上手

## 1.前言

jQuery很早之前就学习过了，但在学习前后端分离开发后就很少用过了。由于最近找工作，发现许多公司都要求熟练使用jQuery，于是决定重新复习一下jQuery。

## 2.概念

jQuery 是一个高效、精简并且功能丰富的 JavaScript 工具库，其设计的宗旨是“write less,do more"。它提供的 API 易于使用且兼容众多浏览器，这让诸如 HTML 文档遍历和操作、事件处理、动画和 Ajax 操作更加简单。

##  3.基本使用

### 3.1 入口函数

```js
// 等DOM结构渲染完毕执行代码
// 第一种写法
$(document).ready(()=>{           				$('div').hide();
})
// 第二种写法
$(() => {
	$('div').hide();
})
```

相当于原生js中的`DOMContentLoaded`，有一点小区别是**原生js中的`load`事件是等页面文档、外部的js文件、css文件、图片加载完毕才执行内部代码。**

### 3.2 顶级对象 $

1. `$`是jQuery的别称，通常直接使用`$`。
2. `$`是jQuery的顶级对象，相当于原生js中的window。把元素用`$`包装成jQuery对象，就可以调用jQuery方法。

### 3.3 jQuery 对象和 DOM 对象

#### 3.3.1 DOM 对象

```js
var myDiv = document.querySelector('div');
```

#### 3.3.2 jQuery 对象

```js
$('div');
```

本质是通过`$`对DOM元素进行了包装后产生的对象（伪数组形式存储）。**jQuery对象不能使用原生js的属性和方法。**

### 3.4 jQuery 对象和 DOM 对象间的转换

jQuery 对象和 DOM 对象是可以互相转换的。

#### 3.4.1 DOM 对象转 jQuery 对象

```js
$('div')
```

#### 3.4.2 jQuery 对象转 DOM 对象

```js
$('div')[index] // index 是索引号
$('div').get(index) // index 是索引号
```

**拿 video 标签举例**

```html
<body>
    <video src="demo.mp4" muted></video>
    <script>
    	var myVideo = document.querySelector('video');
        $(myVideo).play(); // 会报错，因为 jQuery 没有play方法
    </script>
</body>
```

```html
<body>
    <video src="demo.mp4" muted></video>
    <script>
    	// 第一种方法
        $('video')[0].play();
        // 第二种方法
        $('video').get(0).play();
    </script>
</body>
```

前文提到 jQuery 对象以伪数组形式存储，从这个例子就很容易感受到。

### 3.5 常用API

#### 3.5.1 选择器

##### 01-基础选择器

原生 JS 获取元素方式很多，而且兼容性情况不一致。jQuery 进行了封装，使获取元素统一标准。

```js
$("选择器") // 里面选择器直接写 CSS 选择器即可，但是要加引号 
```

| 名称       | 用法            | 描述                     |
| ---------- | --------------- | ------------------------ |
| ID选择器   | $('#id')        | 获取指定ID的元素         |
| 全选择器   | $('*')          | 匹配所有元素             |
| 类选择器   | $('.class')     | 获取同一类class的元素    |
| 标签选择器 | $('div')        | 获取同一类标签的所有元素 |
| 并集选择器 | $('div,p,li')   | 选取多个元素             |
| 交集选择器 | $('li.current') | 交集元素                 |

##### 02-层级选择器

| 名称       | 用法       | 描述                 |
| ---------- | ---------- | -------------------- |
| 子代选择器 | $('ul>li') | 获取亲儿子层级的元素 |
| 后代选择器 | $('ul li)  | 获取ul下的所有li元素 |

##### 03-隐式迭代（重要）

遍历内部 DOM 元素（伪数组形式存储）的过程就叫做**隐式迭代**。

简单地说，就是给匹配到的所有元素进行循环遍历，执行相应的方法，而不用我们再进行循环，简化我们的操作，方便我们调用。

```html
<body>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <script>
        // 1.获取四个div元素
        // 2.给四个 div设置背颜色为粉色，jQuery对象不能使用style
        // 3.隐式迭代就是把匹配的所有元素内部进行遍历循环，给每一个元素添加css这个方法
        $('div').css('background','pink')
    </script>
</body>
```

##### 04-筛选选择器

| 语法       | 用法           | 描述                                                      |
| ---------- | -------------- | --------------------------------------------------------- |
| :first     | $('li:first')  | 获取第一个li元素                                          |
| :last      | $('li:last')   | 获取最后一个li元素                                        |
| :eq(index) | $('li:leq(2)') | 获取到的li元素中，选择索引号为2的元素，索引号index从0开始 |
| :odd       | $('li:odd')    | 获取到的li元素中，选择索引号为奇数的元素                  |
| :even      | $('li:even')   | 获取到的li元素中，选择索引号为偶数的元素                  |

##### 05-筛选方法（重点）

| 语法               | 用法                          | 说明                                                   |
| ------------------ | ----------------------------- | ------------------------------------------------------ |
| parent()           | $('li').parent();             | 查找父级                                               |
| children(selector) | $('ul').children('li')        | 相当于$('ul>li')                                       |
| find(selector)     | $('ul').find('li')            | 相当于$('ul li')                                       |
| siblings(selector) | $('.first').siblings('li')    | 查找兄弟节点，不包括自己本身                           |
| nextAll([expr])    | $('.first').nextAll()         | 查找当前元素之后所有的同辈元素                         |
| prevtAll([expr])   | $('.last').prevAll()          | 查找当前元素之前所有的同辈元素                         |
| hasClass(class)    | $('div').hasClass('proceted') | 检查当前的元素是否含有某个特定的类，如果有，则返回true |
| eq(index)          | $('li').eq(2)                 | 相当于$(li:eq(2))，index从0开始                        |

##### 06-排他思想

想要多选一的效果，排他思想：当前元素设置样式，其余的兄弟元素清除样式。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jQuery排他思想</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
</head>
<body>
    <button>快速</button>
    <button>快速</button>
    <button>快速</button>
    <button>快速</button>
    <button>快速</button>
    <button>快速</button>
    <button>快速</button>
    <script>
        $(() => {
            // 1.隐式迭代 给所有的按钮都绑定了点击事件
            $('button').click(function() {
                // 2.当前的元素变化背景颜色
                $(this).css('background', 'pink')
                // 3.其余的兄弟去掉背景颜色 隐式迭代
                $(this).siblings('button').css('background', '')
            });
        })
    </script>
</body>
</html>
```

##### 07-链式编程

链式编程是为了节省代码量，看起来更优雅

```js
$(this).css('color','red').siblings().css('color','');
```

使用链式编程一定注意是哪个对象执行样式

#### 3.5.2 样式操作

##### 01-操作css方法

jQuery可以使用css方法来修改简单元素样式；也可以操作类，修改多个样式。

**参数只写属性名，返回属性值**

```js
$(this).css('color')
```

参数是**属性名**、**属性值**，逗号分隔，属性必须加引号，值如果是数字可以不用跟单位和引号

```js
$(this).css('color','red')
```

**参数可以是对象形式，方便设置多级样式。属性名和属性值用冒号隔开，属性可以不用加引号。**

```js
$(this).css({'color':'white','font-size':'20px'})
```

##### 02-设置类样式方法

作用等同于以前的classList，可以操作类样式，注意操作类里面的参数不要加点。

**添加类**

```js
$('div').addClass('current')
```

**移除类**

```js
$('div').removeClass('current')
```

**切换类**

```js
$('div').toggleClass('current')
```

##### 03-类操作与className区别

原生JS中className会覆盖原先里面的类名。jQuery里面类操作只是对指定类进行操作，不影响原先的类名。

#### 3.5.3 效果

##### 01-常见效果

jQuery封装了很多动画效果，最为常见的如下：

- 显示隐藏：show()、hide()、toggle()
- 滑动：slideDown()、slideUp()、slideToggle()
- 淡入淡出：fadeIn()、fadeOut()、fadeToggle()、fadeTo()
- 自定义动画：animate()

| API                                   | 效果         |
| ------------------------------------- | ------------ |
| show([speed,[easing],[fn]])           | 显示隐藏效果 |
| slideDown([speed,[easing],[fn]])      | 下滑效果     |
| slideUp([speed,[easing],[fn]])        | 上滑效果     |
| slideToggle([speed,[easing],[fn]])    | 滑动切换效果 |
| hover([over],out)                     | 事件切换     |
| fadeIn([speed,[easing],[fn]])         | 淡入效果     |
| fadeOut([speed,[easing],[fn]])        | 淡出效果     |
| animate(params,[speed],[easing],[fn]) | 自定义动画   |

##### 02-动画队列及其停止排队方法

1. 动画或效果队列：动画或者效果一旦触发就会执行，如果多次触发，就造成多个动画或者效果排除执行

   ![动画队列](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20210606205424.gif)

2. 停止排队

   ```js
   stop()
   ```

   stop()方法用于停止动画或效果。

   注意：stop()写到动画或者效果的**前面，相当于结束上一次动画。**

#### 3.5.4 属性操作

##### 01-设置或获取元素固有属性值 prop()

所谓元素固有属性就是元素本身自带的属性，比如<a>元素里面的`href`，比如<input>元素里面的`type`。

**获取属性语法**

```js
prop('属性')
```

**设置属性语法**

```js
prop('属性','属性值')
```

##### 02-设置或获取元素自定义属性值attr()

用户自己给元素添加的属性，我们称之为自定义属性，比如给div添加`index='1'`。

**获取属性语法**

```js
attr('属性') // 类似原生 getAttribute()
```

**设置属性语法**

```js
attr('属性','属性值') // 类似原生setAttribute()
```

该方法也可以获取H5自定义属性。

##### 03-数据缓存data()

data()方法可以在指定的元素上存取数据，并不会修改DOM元素结构。一旦页面刷新，之前存放的数据都将被移除。

**附加数据语法**

```js
data('name','value') // 向被选元素附加数据
```

**设置数据语法**

```js
date('name') // 向被选元素获取数据
```

同时，还可以读取HTML5自定义属性`data-index`，得到的是数字型。

#### 3.5.5 文本属性值

主要针对元素的**内容**还有**表单的值**操作。

**普通元素内容html（相当于原生innerHTML）**

```js
html() // 获取元素的内容
```

```js
html('内容') // 设置元素的内容
```

**普通元素文本内容text（相当于原生innerText）**

```js
text() // 获取元素的文本内容
```

```js
text('内容') // 设置元素的文本内容
```

**表单的值val（相当于原生value）**

```js
val() // 获取表单的文本内容
```

```js
val('内容') // 设置表单的文本内容
```

#### 3.5.6 元素操作

主要是**遍历**、创建、添加、删除元素操作。

##### 01-遍历元素

jQuery隐式迭代是对同一类元素做了同样的操作。如果想要给同一类元素做不同操作，就需要用到遍历。

**语法1：**

```js
$('div').each(function(index,domEle) {
    xxx;
})
```

**语法2：**

```js
$.each(object,function(index,element) {
    xxx;
})
```

##### 02-创建元素

```js
$('<li></li>')
```

动态地创建了一个`<li>`

##### 03-添加元素

**内部添加**

```js
element.append('内容')
```

把内容放入匹配元素内部**最后面**，类似原生`appendChild()`。

```js
element.prepend('内容')
```

把内容放入匹配元素内部**最前面**。

**外部添加**

```js
element.after('内容') //把内容放入目标元素后面
```
```js
element.before('内容') // 把内容放入目标元素前面
```

- 内部添加元素，生成之后，它们是父子关系。
- 外部添加元素，生成之后，他们是兄弟关系。

##### 04-删除元素
```js
element.remove() // 删除匹配的元素（本身）
```
```js
element.empty() // 删除匹配的元素集合中的所有子节点
```
```js
element.html('') // 清空匹配的元素内容
```
#### 3.5.7 尺寸、位置操作

##### 01-尺寸

| 语法                           | 用法                                                |
| ------------------------------ | --------------------------------------------------- |
| width() / height()             | 取得匹配元素宽度和高度值  只算 width/height         |
| innerWidth() / innerHeight()   | 取得匹配元素宽度和高度值 包含padding                |
| outerWidth() / outerHeight     | 取得匹配元素宽度和高度值 包含padding、border        |
| outerWidth(true) / outerHeight | 取得匹配元素宽度和高度值 包含padding、borde、margin |

- 以上参数为空，则是获取相应值，返回的是数字型。
- 如果参数为数字，则是修改相应值。
- 参数可以不必写单位。

##### 02-位置

位置主要有三个：offset()、position()、scrollTop() / scrollLeft()

**offset()设置或获取元素偏移**

1. offset()方法设置或返回被选元素相对于**文档**的偏移坐标，跟父级没有关系。
2. 该方法有2个属性left、top。offset().top用于获取距离文档顶部的距离，offset().left用于获取距离文档左侧的距离。
3. 可以设置元素的偏移：`offset({ top: 10,left: 30 })`

**position()获取元素偏移**

position()方法用于返回被选元素相对于**带有定位的父级**偏移坐标，如果父级都没有定位，则以文档为准。

**scrollTop() / srcollLeft() 设置或获取元素被卷去的头部和左侧**

1. scrollTop()方法设置或返回被选元素被卷去的头部。
2.  srcollLeft() 方法设置或返回被选元素被卷去的左侧。

## 4.事件

### 4.1 单个事件注册

```js
element.事件(function(){})
```

```js
$('div').click(function(){ 事件处理程序 })
```

其他事件和原生基本一致

### 4.2 事件处理on()绑定事件

`on()`方法在匹配元素上绑定一个或多个事件的事件处理函数。

```js
element.on(events,[selector],fn)
```

可以事件委派操作。事件委派的定义就是，把原来加给子元素身上的事件绑定在父元素身上，就是把事件委派给父元素。

```js
$('ul').on('click','li',function() {
    alert('hello world!');
})
```

在此之前有`bind(),live(),delegate()`等方法来处理事件绑定或者事件委派，最新版本的用`on()`替代。

### 4.3 事件处理off()解绑事件

`off()`方法可以移除通过`on()`方法添加的事件处理程序。

```js
$('p').off // 解绑p元素所有事件处理程序
$('p').off('click') // 解绑p元素上面的点击事件
$('ul').off('click',;li) // 解绑事件委托
```

如果有的事件只想触发一次，可以使用`one()`来绑定事件。

### 4.4 自动触发事件trigger()

有些事件希望自动触发，比如轮播图自动播放功能跟点击右侧按钮一致。可以利用定时器自动出发右侧按钮点击事件，不必鼠标点击触发。

```js
element.click() // 第一种简写形式
```

```js
element.trigger('type') // 第二种自动触发模式
```

```js
$('p').on('click',function() {
    alert('hi~');
})
$('p').trigger('click'); // 此时自动触发点击事件，不需要鼠标点击
```

```js
element.triggerHandler(type) // 第三种自动触发模式，不会触发元素的默认行为
```

### 4.5 事件对象

事件被触发，就会有事件对象产生。

```js
element.on(events,[selector],function(event) {})
```

阻止默认行为：event.preventDefault() 或者 return false

阻止冒泡：event.stopPropagation()

## 5.其他方法

### 5.1 对象拷贝

如果想要把某个对象拷贝（合并）给另一个对象使用，此时可以使用`$.extend()`方法。

```js
$.extend([deep], target, object1, [objectN])
```

### 5.2 多库共存

**问题概述**

jQuery使用`$`作为标示符，随着jQuery的流行，其他js库也会用这`$`作为标识符，这样一起使用会引起冲突。

**客观需求**

需要一个解决方案，让jQuery和其他的js库不存在冲突，可以同时存在，这就叫多库共存。

**解决方案**

1. 把里面的`$`符号统一改为jQuery。比如jQuery('div')。

2. jQuery变量规定新的名称：`$.noConflict() `

   `var xx = $.noConflict()`

### 5.3 插件

jQuery功能比较有限，想要更复杂的特效效果，可以借助jQuery插件完成。

**注意**：这些插件也是依赖jQuery来完成的，所以必须要先引入jQuery文件，因此也称为jQuery插件。

**jQuery插件使用步骤**

1. 引入相关文件。（jQuery文件和插件文件）
2. 复制相关html、css、js（调用插件）