# flex布局
## 1. flex布局定义
Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
任何一个容器都可以指定为Flex布局。例如：
``` css
.box{
    display: flex;
}
// 行内元素也可以使用flex布局
.box{
    display: inline-flex;
}
// Webkit 内核的浏览器，必须加上-webkit前缀
.box{
    display: -webkit-flex; /* Safari */
    display: flex;
}
```
注：设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

## 2. 基本概念
采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

![flex layout](img/image1.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

## 3. 容器的属性

容器上有6个属性可设置：
> + **flex-direction**
> + **flex-wrap**
> + **flex-flow**
> + **justify-content**
> + **align-items**
> + **align-content**

### 3.1 flex-direction属性
flex-direction属性决定主轴的方向（即项目的排列方向）  
``` css
.box {
    flex-direction: row | row-reverse | column | column-reverse;
}
```  
![flex0direction](img/image2.png)  
此属性有4个取值，分别是：
>+ **row**（默认值）：主轴为水平方向，起点在左端。
>+ **row-reverse**：主轴为水平方向，起点在右端。
>+ **column**：主轴为垂直方向，起点在上沿。
>+ **column-reverse**：主轴为垂直方向，起点在下沿。  

### 3.2 flex-wrap属性
默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
![flexwrap](img/image3.png)
```css
.box{
    flex-wrap: nowrap | wrap | wrap-reverse;
}
```
它可能取三个值：  
(1) **nowrap**（默认）：不换行。  
![nowrap](img/image4.png)  
(2) **wrap**：换行，第一行在上方  
![wrap](img/image5.png)  
(3) **wrap-reverse**：换行，第一行在下方
![nowrapreverse](img/image6.png)  

### 3.3 flex-flow属性  
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。  
```css
.box {
    flex-flow: <flex-direction> || <flex-wrap>;
}
```
### 3.4 justify-content属性  
justify-content属性定义了项目在主轴上的对齐方式。  
```css
.box {
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
![justifycontent](img/image7.png)   
它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。
>+ **flex-start**（默认值）：左对齐
>+ **flex-end**：右对齐
>+ **center**： 居中
>+ **space-between**：两端对齐，项目之间的间隔都相等。
>+ **space-around**：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。  

### 3.5 align-items属性  
align-items属性定义项目在交叉轴上如何对齐。  
```css
.box {
    align-items: flex-start | flex-end | center | baseline | stretch;
}
```
![align-items](img/image8.png)   
它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。  
>+ **flex-start**：交叉轴的起点对齐。
>+ **flex-end**：交叉轴的终点对齐。
>+ **center**：交叉轴的中点对齐。
>+ **baseline**: 项目的第一行文字的基线对齐。
>+ **stretch**（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。  

### 3.6 align-content属性  
align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
```css
.box {
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
![align-content](img/image9.png)   
该属性可能取6个值:
>+ **flex-start**：与交叉轴的起点对齐。
>+ **flex-end**：与交叉轴的终点对齐。
>+ **center**：与交叉轴的中点对齐。
>+ **space-between**：与交叉轴两端对齐，轴线之间的间隔平均分布。
>+ **space-around**：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
>+ **stretch**（默认值）：轴线占满整个交叉轴。