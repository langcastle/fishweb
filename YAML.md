# YAML学习  
YAML是"YAML Ain't a Markup Language"（YAML 不是一种标记语言）的递归缩写。  
YAML 的语法和其他高级语言类似，并且可以简单表达清单、散列表，标量等数据形态。它使用空白符号缩进和大量依赖外观的特色，特别适合用来表达或编辑数据结构、各种配置文件、倾印调试内容、文件大纲（例如：许多电子邮件标题格式和YAML非常接近）。YAML 的配置文件后缀为 .yml，如：runoob.yml 。
## 1. 基本语法
+ 使用缩进表示层级关系
+ 缩进时不允许使用Tab键，只允许使用空格
+ 缩进的空格数不重言，但同级元素必须左侧对齐
+ 大小写敏感  
+ '#'表示注释  
## 2. 数据结构
+ 对象：键值对的集合
+ 数组：一组按次序排列的值
+ 字面值：单个的、不可拆分的值  
> YAML对象  

字面量是指单个的，不可拆分的值，例如：数字、字符串、布尔值、以及日期等。  
在 YAML 中，使用“key:[空格]value”的形式表示一对键值对（***空格不能省略***），如 url: www.biancheng.net。  
字面量直接写在键值对的“value”中即可，且默认情况下字符串是不需要使用单引号或双引号的。  
`name: fishweb
 name: 'fish\nweb'
 name: "fish\nweb"`