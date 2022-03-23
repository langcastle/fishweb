# 一.  IoC learn
## 1.1 IoC工作原理
IoC底层通过工厂模式、Java的反射机制、XML解析等技术，将代码的耦合度降低到最低限度，其主要步骤如下：
+ 在配置文件中，对各个对象及他们之间的依赖关系进行配置；
+ 可以把IoC容器当作一个工厂，这个工厂的产品就是Spring Bean；
+ 容器启动时会加载并解析这些配置文件，得到对象的基本信息以及他们之间的依赖关系；
+ IoC利用Java的反射机制，根据类名生成相应的对象，并根据依赖关系将这个对象注入到依赖他的对象中。 

由于对象的基本信息、对象之间的依赖关系都是配置文件中定义的，并没有代码的紧密耦合，因此即使对象发生改变，也只需要在配置文件中进行修改即可，而无须对Java代码进行修改，这就是IoC实现解耦的原理。  

## 1.2 容器的两种实现
IoC思想基于IoC容器实现的，IoC容器底层其实就是一个Bean工厂，有两种不同的IoC容器，分贝是BeanFactory和ApplicationContext。  
+ **BeanFactory**  
BeanFactory 是 IoC 容器的基本实现，也是 Spring 提供的最简单的 IoC 容器，它提供了 IoC 容器最基本的功能，由 org.springframework.beans.factory.BeanFactory 接口定义。
BeanFactory 采用懒加载（lazy-load）机制，容器在加载配置文件时并不会立刻创建 Java 对象，只有程序中获取（使用）这个对对象时才会创建。  
**注意**：BeanFactory 是 Spring 内部使用接口，通常情况下不提供给开发人员使用。 

+ **ApplicationContext**  
ApplicationContext 是 BeanFactory 接口的子接口，是对 BeanFactory 的扩展。ApplicationContext 在 BeanFactory 的基础上增加了许多企业级的功能，例如 AOP（面向切面编程）、国际化、事务支持等。  

ApplicationContext 接口有两个常用的实现类，具体如下表。  
| 实现类 | 描述 | 示例代码 |
| :----:  | :---- | :---- |
| ClassPathXmlApplicationContext | 加载类路径 ClassPath 下指定的 XML 配置文件，并完成 ApplicationContext 的实例化工作 | ApplicationContext applicationContext = new ClassPathXmlApplicationContext(String configLocation); |
| FileSystemXmlApplicationContext | 加载指定的文件系统路径中指定的 XML 配置文件，并完成 ApplicationContext 的实例化工作	 | ApplicationContext applicationContext = new FileSystemXmlApplicationContext(String configLocation); |  

## 1.3 Bean定义
由 Spring IoC 容器管理的对象称为 Bean，Bean 根据 Spring 配置文件中的信息创建。可以把 Spring IoC 容器看作是一个大工厂，Bean 相当于工厂的产品。如果希望这个大工厂生产和管理 Bean，就需要告诉容器需要哪些 Bean，以哪种方式装配。通常情况下，Spring 的配置文件都是使用 XML 格式的。XML 配置文件的根元素是 <beans>，该元素包含了多个子元素 <bean>。每一个 <bean> 元素都定义了一个 Bean，并描述了该 Bean 是如何被装配到 Spring 容器中的。  
在 XML 配置的<beans> 元素中可以包含多个属性或子元素，常用的属性或子元素如下表所示。  
| 属性名称 | 描述 |
| :---- | :---- |
| id | Bean 的唯一标识符，Spring IoC 容器对 Bean 的配置和管理都通过该属性完成。id 的值必须以字母开始，可以使用字母、数字、下划线等符号。 |
| name | 该属性表示 Bean 的名称，我们可以通过 name 属性为同一个 Bean 同时指定多个名称，每个名称之间用逗号或分号隔开。Spring 容器可以通过 name 属性配置和管理容器中的 Bean。 |
| class | 该属性指定了 Bean 的具体实现类，它必须是一个完整的类名，即类的全限定名。 |
| scope | 表示 Bean 的作用域，属性值可以为 singleton（单例）、prototype（原型）、request、session 和 global Session。默认值是 singleton。 |
| constructor-arg | <bean> 元素的子元素，我们可以通过该元素，将构造参数传入，以实现 Bean 的实例化。该元素的 index 属性指定构造参数的序号（从 0 开始），type 属性指定构造参数的类型。 |
| property | <bean>元素的子元素，用于调用 Bean 实例中的 setter 方法对属性进行赋值，从而完成属性的注入。该元素的 name 属性用于指定 Bean 实例中相应的属性名。 |
| ref | <property> 和 <constructor-arg> 等元素的子元索，用于指定对某个 Bean 实例的引用，即 <bean> 元素中的 id 或 name 属性。 |
| value | <property> 和 <constractor-arg> 等元素的子元素，用于直接指定一个常量值。 |
| list | 用于封装 List 或数组类型的属性注入。 |
| set | 用于封装 Set 类型的属性注入。 |
| map | 用于封装 Map 类型的属性注入。 |
| entry | <map> 元素的子元素，用于设置一个键值对。其 key 属性指定字符串类型的键值，ref 或 value 子元素指定其值。 |
| init-method | 容器加载 Bean 时调用该方法，类似于 Servlet 中的 init() 方法 |
| destroy-method | 容器删除 Bean 时调用该方法，类似于 Servlet 中的 destroy() 方法。该方法只在 scope=singleton 时有效 |
| lazy-init | 懒加载，值为 true，容器在首次请求时才会创建 Bean 实例；值为 false，容器在启动时创建 Bean 实例。该方法只在 scope=singleton 时有效 |  

## 1.4 Bean属性注入方法
- **构造函数注入**  
使用构造函数实现属性注入大致步骤如下：  
（1）在Bean中添加一个有参构造函数，构造函数内的每一个参数代表一个需要注入的属性；  
（2）在Spring的XML配置文件中，通过<beans>及其子元素<bean>对Bean进行定义；  
（3）在<bean>元素内使用<constructor-arg>元素，对构造函数内的属性进行赋值，Bean的构造函数内有多少参数，就需要使用多少个 <constructor-arg> 元素。  
**简易方法：c命名空间注入**  
步骤：  
（1）在配置文件的 <beans> 元素中导入以下 XML 约束。  
xmlns:c="http://www.springframework.org/schema/c"  
（2）在导入XML约束后，我们就能通过以下形式实现属性注入。  
<bean id="Bean 唯一标志符" class="包名+类名" c:普通属性="普通属性值" c:对象属性-ref="对象的引用">
使用c命名空间注入依赖时，必须注意以下2点：  
a. Java 类中必须包含对应的带参构造器；  
b.在使用c命名空间实现属性注入前，XML配置的<beans>元素内必须先导入c命名空间的XML约束。  
- **setter注入**  
使用setter注入的方式进行属性注入，大致步骤如下：  
（1）在Bean中提供一个默认的无参构造函数（在没有其他带参构造函数的情况下，可省略），并为所有需要注入的属性提供一个setXxx()方法；  
（2）在Spring的 XML 配置文件中，使用<beans>及其子元素<bean>对Bean进行定义；  
（3）在<bean>元素内使用<property>元素对各个属性进行赋值。  
**简易方法：p命名空间注入**  
步骤：  
（1）需要在配置文件的 <beans> 元素中导入以下 XML 约束。  
xmlns:p="http://www.springframework.org/schema/p"  
（2）在导入 XML 约束后，我们就能通过以下形式实现属性注入。  
<bean id="Bean 唯一标志符" class="包名+类名" p:普通属性="普通属性值" p:对象属性-ref="对象的引用">  

## 1.5 Spring注入内部Bean
定义在 <bean> 元素的 <property> 或 <constructor-arg> 元素内部的 Bean，称为“内部 Bean”。  
**注意**：内部 Bean 都是匿名的，不需要指定 id 和 name 的。即使制定了，IoC 容器也不会将它作为区分 Bean 的标识符，反而会无视 Bean 的 Scope 标签。因此内部 Bean 几乎总是匿名的，且总会随着外部的 Bean 创建。内部 Bean 是无法被注入到它所在的 Bean 以外的任何其他 Bean 的。
- setter 方式注入内部Bean
```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
    <bean id="outerBean" class="……">
        <property name="……" >
            <!-- 定义内部 Bean -->
            <bean class="……">
                <property name="……" value="……" ></property>
                ……
            </bean>
        </property>
    </bean>
</beans>
```
- 构造函数方式注入内部Bean
```java
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
    <bean id="……" class="……">
        <constructor-arg name="……">
            <!--内部 Bean-->
            <bean class="……">
                <constructor-arg name="……" value="……"></constructor-arg>
                ……
            </bean>
        </constructor-arg>
    </bean>
</beans>
```

## 1.6 Spring注入集合
在 Bean 标签下的 <property> 元素中，使用以下元素配置 Java 集合类型的属性和参数，例如 List、Set、Map 以及 Properties 等。
| 标签 | 说明 |
| :--- | :--- |
| \<list\> | 用于注入 list 类型的值，允许重复 |
| \<set\> | 用于注入 set 类型的值，不允许重复 |
| \<map\> | 用于注入 key-value 的集合，其中 key 和 value 都可以是任意类型 |
| \<props\> | 用于注入 key-value 的集合，其中 key  和 value 都是字符串类型 |
- 在集合中设置普通类型的值: [例如](http://c.biancheng.net/spring/collection-injection.html)
- 在集合中设置对象类型的值: [例如](http://c.biancheng.net/spring/collection-injection.html)
- Spring注入其他类型的属性：[例如](http://c.biancheng.net/spring/other-injection.html)

## 1.7 Spring Bean作用域
默认情况下，所有的 Spring Bean 都是单例的，也就是说在整个 Spring 应用中， Bean 的实例只有一个。可以在 <bean> 元素中添加 scope 属性来配置 Spring Bean 的作用范围。  
Spring 5 共提供了 6 种 scope 作用域，如下表。  
| 作用范围 | 描述 |
| :--- | :--- |
| singleton | 默认值，单例模式，表示在 Spring 容器中只有一个 Bean 实例 |
| prototype | 原型模式，表示每次通过 Spring 容器获取 Bean 时，容器都会创建一个新的 Bean 实例。 |
| request | 每次 HTTP 请求，容器都会创建一个 Bean 实例。该作用域只在当前 HTTP Request 内有效。 |
| session | 同一个 HTTP Session 共享一个 Bean 实例，不同的 Session 使用不同的 Bean 实例。该作用域仅在当前 HTTP Session 内有效。 |
| application | 同一个 Web 应用共享一个 Bean 实例，该作用域在当前 ServletContext 内有效。与singleton类似，但 singleton 表示每个 IoC 容器中仅有一个 Bean 实例，而一个 Web 应用中可能会存在多个 IoC 容器，但一个 Web 应用只会有一个 ServletContext，也可以说 application 才是 Web 应用中货真价实的单例模式。 |
| websocket | websocket 的作用域是 WebSocket ，即在整个 WebSocket 中有效。 |  

**注意**：在以上6种Bean作用域中，除了singleton和prototype可以直接在常规的Spring IoC容器中使用外，剩下的都只能在基于Web的ApplicationContext实现中才能使用，否则就会抛出一个 IllegalStateException 的异常。

## 1.8 Spring Bean生命周期
Spring中Bean的生命周期大致可以分为以下5个阶段：
- Bean的实例化
- Bean属性赋值
- Bean的初始化
- Bean的使用
- Bean的销毁  

Spring根据Bean的作用域选择Bean的管理方式：
- 对于 singleton 作用域的 Bean 来说，Spring IoC 容器能够精确地控制 Bean 何时被创建、何时初始化完成以及何时被销毁；  
- 对于 prototype 作用域的 Bean 来说，Spring IoC 容器只负责创建，然后就将 Bean 的实例交给客户端代码管理，Spring IoC 容器将不再跟踪其生命周期。

**Spring生命周期流程**：  
Spring Bean 的完整生命周期从创建 Spring IoC 容器开始，直到最终 Spring IoC 容器销毁 Bean 为止，其具体流程如下图所示。
![SpringBean](img/springlife.png)  
Bean 生命周期的整个执行过程描述如下:  
- Spring 启动，查找并加载需要被 Spring 管理的 Bean，对 Bean 进行实例化。
- 对 Bean 进行属性注入。
- 如果 Bean 实现了 BeanNameAware 接口，则 Spring 调用 Bean 的 setBeanName() 方法传入当前 Bean 的 id 值。
- 如果 Bean 实现了 BeanFactoryAware 接口，则 Spring 调用 setBeanFactory() 方法传入当前工厂实例的引用。
- 如果 Bean 实现了 ApplicationContextAware 接口，则 Spring 调用 setApplicationContext() 方法传入当前 ApplicationContext 实例的引用。
-如果 Bean 实现了 BeanPostProcessor 接口，则 Spring 调用该接口的预初始化方法 postProcessBeforeInitialzation() 对 Bean 进行加工操作，此处非常重要，Spring 的 AOP 就是利用它实现的。
- 如果 Bean 实现了 InitializingBean 接口，则 Spring 将调用 afterPropertiesSet() 方法。
- 如果在配置文件中通过 init-method 属性指定了初始化方法，则调用该初始化方法。
- 如果 BeanPostProcessor 和 Bean 关联，则 Spring 将调用该接口的初始化方法 postProcessAfterInitialization()。此时，Bean 已经可以被应用系统使用了。
- 如果在 <bean> 中指定了该 Bean 的作用域为 singleton，则将该 Bean 放入 Spring IoC 的缓存池中，触发 Spring 对该 Bean 的生命周期管理；如果在 <bean> 中指定了该 Bean 的作用域为 prototype，则将该 Bean 交给调用者，调用者管理该 Bean 的生命周期，Spring 不再管理该 Bean。
- 如果 Bean 实现了 DisposableBean 接口，则 Spring 会调用 destory() 方法销毁 Bean；如果在配置文件中通过 destory-method 属性指定了 Bean 的销毁方法，则 Spring 将调用该方法对 Bean 进行销毁。  

**自定义Bean生命周期**
在 Spring Bean 生命周期的某个特定时刻，指定一些生命周期回调方法完成一些自定义的操作，对 Bean 的生命周期进行管理。

Bean 的生命周期回调方法主要有两种：
- 初始化回调方法：在 Spring Bean 被初始化后调用，执行一些自定义的回调操作。
- 销毁回调方法：在 Spring Bean 被销毁前调用，执行一些自定义的回调操作。  

可以通过以下 3 种方式自定义 Bean 的生命周期回调方法：
- 通过接口实现
- 通过 XML 配置实现
- 使用注解实现  

(1)**通过接口实现**  
在 Spring Bean 的 Java 类中，通过实现 InitializingBean 和 DisposableBean 接口，指定 Bean 的生命周期回调方法。  
| 回调方式 | 接口 | 方法 | 说明 |
| :--- | :--- | :--- | :--- |
| 初始化回调 | InitializingBean  | afterPropertiesSet()  | 指定初始化回调方法，这个方法会在 Spring Bean 被初始化后被调用，执行一些自定义的回调操作。 |
| 销毁回调 | DisposableBean | destroy()  | 指定销毁回调方法，这个方法会在 Spring Bean 被销毁前被调用，执行一些自定义的回调操作。 |

注意：通常情况下，我们不建议通过这种方式指定生命周期回调方法，这是由于这种方式会导致代码的耦合性过高。

(2)**通过XML配置实现**  
可以在 Spring 的 XML 配置中，通过 <bean> 元素中的 init-method 和 destory-method 属性，指定 Bean 的生命周期回调方法。  
| XML配置属性 | 描述 |
| :--- | :--- |
| init-method | 指定初始化回调方法，这个方法会在 Spring Bean 被初始化后被调用，执行一些自定义的回调操作。 |
| destory-method | 指定销毁回调方法，这个方法会在 Spring Bean 被销毁前被调用，执行一些自定义的回调操作。 |

(3)**通过注解实现**  
可以通过 JSR-250 的 @PostConstruct 和 @PreDestroy 注解，指定 Bean 的生命周期回调方法。  
| 注解 | 描述 |
| :--- | :--- |
| @PostConstruct | 指定初始化回调方法，这个方法会在 Spring Bean 被初始化后被调用，执行一些自定义的回调操作。 |
| @PreDestroy | 指定销毁回调方法，这个方法会在 Spring Bean 被销毁前被调用，执行一些自定义的回调操作。 |

## 1.9 Spring后置处理器
BeanPostProcessor 接口也被称为后置处理器，通过该接口可以自定义调用初始化前后执行的操作方法。  
BeanPostProcessor 接口源码如下：
```java
public interface BeanPostProcessor {
    Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException;
    Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException;
}
```
该接口中包含了两个方法：
- postProcessBeforeInitialization() 方法：在 Bean 实例化、属性注入后，初始化前调用。
- postProcessAfterInitialization() 方法：在 Bean 实例化、属性注入、初始化都完成后调用。

当需要添加多个后置处理器实现类时，默认情况下 Spring 容器会根据后置处理器的定义顺序来依次调用。也可以通过实现 Ordered 接口的 getOrder 方法指定后置处理器的执行顺序。该方法返回值为整数，默认值为 0，取值越大优先级越低。

## 1.10 Spring Bean继承
在 Spring 中，Bean 和 Bean 之间也存在继承关系。将被继承的 Bean 称为父 Bean，将继承父 Bean 配置信息的 Bean 称为子 Bean。Spring Bean 的定义中可以包含很多配置信息，例如构造方法参数、属性值。子 Bean 既可以继承父 Bean 的配置数据，也可以根据需要重写或添加属于自己的配置信息。  
在 Spring XML 配置中，我们通过子 Bean 的 parent 属性来指定需要继承的父 Bean，配置格式如下。
```java
<!--父Bean-->
<bean id="parentBean" class="xxx.xxxx.xxx.ParentBean" >
    <property name="xxx" value="xxx"></property>
    <property name="xxx" value="xxx"></property>
</bean> 
<!--子Bean--> 
<bean id="childBean" class="xxx.xxx.xxx.ChildBean" parent="parentBean"></bean>
```  
**Bean定义模板**  
在父 Bean 的定义中，有一个十分重要的属性，那就是 abstract 属性。如果一个父 Bean 的 abstract 属性值为 true，则表明这个 Bean 是抽象的。  
抽象的父 Bean 只能作为模板被子 Bean 继承，它不能实例化，也不能被其他 Bean 引用，更不能在代码中根据 id 调用 getBean() 方法获取，否则就会返回错误。  
在父 Bean 的定义中，既可以指定 class 属性，也可以不指定 class 属性。如果父 Bean 定义没有明确地指定 class 属性，那么这个父 Bean 的 abstract 属性就必须为 true。  

## 1.11 Spring自动装配
把 Spring 在 Bean 与 Bean 之间建立依赖关系的行为称为“装配”。Spring 的自动装配功能可以让 Spring 容器依据某种规则（自动装配的规则，有五种），为指定的 Bean 从应用的上下文（AppplicationContext 容器）中查找它所依赖的 Bean，并自动建立 Bean 之间的依赖关系。而这一过程是在完全不使用任何 <constructor-arg>和 <property> 元素 ref 属性的情况下进行的。  
Spring 的自动装配功能能够有效地简化 Spring 应用的 XML 配置，因此在配置数量相当多时采用自动装配降低工作量。Spring 框架式默认不支持自动装配的，要想使用自动装配，则需要对 Spring XML 配置文件中 <bean> 元素的 autowire 属性进行设置。
```java
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
    <!--部门 Dept 的 Bean 定义-->
    <bean id="dept" class="net.biancheng.c.Dept"></bean>
   
    <!--雇员 Employee 的 Bean 定义,通过 autowire 属性设置自动装配的规则-->
    <bean id="employee" class="net.biancheng.c.Employee" autowire="byName">
    </bean>
</beans>
```
**自动装配规则**  
Spring 共提供了 5 中自动装配规则，它们分别与 autowire 属性的 5 个取值对应，具体说明如下表。
| 属性值 | 说明 |
| :--- | :--- |
| byName | 按名称自动装配。Spring 会根据的 Java 类中对象属性的名称，在整个应用的上下文 ApplicationContext（IoC 容器）中查找。若某个 Bean 的 id 或 name 属性值与这个对象属性的名称相同，则获取这个 Bean，并与当前的 Java 类 Bean 建立关联关系。 |
| byType | 按类型自动装配。Spring 会根据 Java 类中的对象属性的类型，在整个应用的上下文 ApplicationContext（IoC 容器）中查找。若某个 Bean 的 class 属性值与这个对象属性的类型相匹配，则获取这个 Bean，并与当前的 Java 类的 Bean 建立关联关系。 |
| constructor | 与 byType 模式相似，不同之处在与它应用于构造器参数（依赖项），如果在容器中没有找到与构造器参数类型一致的 Bean，那么将抛出异常。其实就是根据构造器参数的数据类型，进行 byType 模式的自动装配。 |
| default | 表示默认采用上一级元素 <beans> 设置的自动装配规则（default-autowire）进行装配。 |
| no | 默认值，表示不使用自动装配，Bean 的依赖关系必须通过 <constructor-arg>和 <property> 元素的 ref 属性来定义。 |

**基于注解的自动装配**  
Spring通过注解实现自动装配的步骤：
- 引入依赖
- 开启组件扫描
- 使用注解定义Bean
- 依赖注入

**(1)引入依赖**  
使用注解的第一步，就是要在项目中引入以下 Jar 包。
- org.springframework.core-5.3.13.jar
- org.springframework.beans-5.3.13.jar
- spring-context-5.3.13.jar
- spring-expression-5.3.13.jar
- commons.logging-1.2.jar
- spring-aop-5.3.13.jar  

**注意**：除了 spring 的四个基础 jar 包和 commons-logging-xxx.jar 外，想要使用注解实现 Spring 自动装配，还需要引入Spring 提供的 spring-aop 的 Jar 包。  
**(2)开启组件扫描**  
Spring 默认不使用注解装配 Bean，因此我们需要在 Spring 的 XML 配置中，通过<context:component-scan>元素开启 Spring Beans的自动扫描功能。开启此功能后，Spring 会自动从扫描指定的包（base-package 属性设置）及其子包下的所有类，如果类上使用了 @Component 注解，就将该类装配到容器中。  
```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
    http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd">
    <!--开启组件扫描功能-->
    <context:component-scan base-package="net.biancheng.c"></context:component-scan>
</beans>
```  
**注意**：在使用  <context:component-scan> 元素开启自动扫描功能前，首先需要在 XML 配置的一级标签 <beans> 中添加 context 相关的约束。  
**(3)使用注解定义Bean**  
Spring 提供了以下多个注解，这些注解可以直接标注在 Java 类上，将它们定义成 Spring Bean。  
| 注解 | 说明 |
| :--- | :--- |
| @Component | 该注解用于描述 Spring 中的 Bean，它是一个泛化的概念，仅仅表示容器中的一个组件（Bean），并且可以作用在应用的任何层次，例如 Service 层、Dao 层等。使用时只需将该注解标注在相应类上即可。 |
| @Repository | 该注解用于将数据访问层（Dao 层）的类标识为 Spring 中的 Bean，其功能与 @Component 相同。 |
| @Service | 该注解通常作用在业务层（Service 层），用于将业务层的类标识为 Spring 中的 Bean，其功能与 @Component 相同。 |
| @Controller | 该注解通常作用在控制层（如 Struts2 的 Action、SpringMVC 的 Controller），用于将控制层的类标识为 Spring 中的 Bean，其功能与 @Component 相同。 |

**(4)依赖注入**  
可以通过以下注解将定义好 Bean 装配到其它的 Bean 中。
| 注解 | 说明 |
| :--- | :--- |
| @Autowired | 可以应用到 Bean 的属性变量、setter 方法、非 setter 方法及构造函数等，默认按照 Bean 的类型进行装配。@Autowired 注解默认按照 Bean 的类型进行装配，默认情况下它要求依赖对象必须存在，如果允许 null 值，可以设置它的 required 属性为 false。如果我们想使用按照名称（byName）来装配，可以结合 @Qualifier 注解一起使用 |
| @Resource | @Resource 中有两个重要属性：name 和 type。Spring 将 name 属性解析为 Bean 的实例名称，type 属性解析为 Bean 的实例类型。如果指定 name 属性，则按实例名称进行装配；如果指定 type 属性，则按 Bean 类型进行装配；如果都不指定，则先按 Bean 实例名称装配，如果不能匹配，则再按照 Bean 类型进行装配；如果都无法匹配，则抛出 NoSuchBeanDefinitionException 异常。 |
| @Qualifier | 与 @Autowired 注解配合使用，会将默认的按 Bean 类型装配修改为按 Bean 的实例名称装配，Bean 的实例名称由 @Qualifier 注解的参数指定。 |


# 二. AOP learn
## 2.1 面向切面编程  
与 OOP 中纵向的父子继承关系不同，AOP 是通过横向的抽取机制实现的。它将应用中的一些非业务的通用功能抽取出来单独维护，并通过声明的方式（例如配置文件、注解等）定义这些功能要以何种方式作用在那个应用中，而不是在业务模块的代码中直接调用。

这虽然设计公共函数有几分类似，但传统的公共函数除了在代码直接硬调用之外并没有其他手段。AOP 则为这一问题提供了一套灵活多样的实现方法（例如 Proxy 代理、拦截器、字节码翻译技术等），可以在无须修改任何业务代码的基础上完成对这些通用功能的调用和修改。

AOP 编程和 OOP 编程的目标是一致的，都是为了减少程序中的重复性代码，让开发人员有更多的精力专注于业务逻辑的开发，只不过两者的实现方式大不相同。

OOP 就像是一根“绣花针”，是一种婉约派的选择，它使用继承和组合方式，仔细地为所有涉及通用功能的模块编制成一套类和对象的体系，以达到减少重复性代码的目标。而 AOP 则更像是一把“砍柴刀”，是一种豪放派的选择，大刀阔斧的规定，凡是某包某类下的某方法都一并进行处理。

AOP 不是用来替换 OOP 的，而是 OOP 的一种延伸，用来解决 OOP 编程中遇到的问题。

**AOP术语**  
AOP 已经形成一套属于自己的概念和术语。
| 名称 | 说明 |
| :--- | :--- |
| Joinpoint（连接点） | AOP 的核心概念，指的是程序执行期间明确定义的一个点，例如方法的调用、类初始化、对象实例化等。在 Spring 中，连接点则指可以被动态代理拦截目标类的方法。 |
| Pointcut（切入点） | 又称切点，指要对哪些 Joinpoint 进行拦截，即被拦截的连接点。 |
| Advice（通知） | 指拦截到 Joinpoint 之后要执行的代码，即对切入点增强的内容。 |
| Target（目标） | 指代理的目标对象，通常也被称为被通知（advised）对象。 |
| Weaving（织入） | 指把增强代码应用到目标对象上，生成代理对象的过程。 |
| Proxy（代理） | 指生成的代理对象。 |
| Aspect（切面） | 切面是切入点（Pointcut）和通知（Advice）的结合。 |

Advice 直译为通知，也有人将其翻译为“增强处理”，共有 5 种类型，如下表所示。
| 通知 | 说明 |
| :--- | :--- |
| before（前置通知） | 通知方法在目标方法调用之前执行 |
| after（后置通知） | 通知方法在目标方法返回或异常后调用 |
| after-returning（返回后通知） | 通知方法会在目标方法返回后调用 |
| after-throwing（抛出异常通知） | 通知方法会在目标方法抛出异常后调用 |
| around（环绕通知） | 通知方法会将目标方法封装起来 |

**AOP的类型**  
AOP 可以被分为以下 2 个不同的类型。
- 动态 AOP  
动态 AOP 的织入过程是在运行时动态执行的。其中最具代表性的动态 AOP 实现就是 Spring AOP，它会为所有被通知的对象创建代理对象，并通过代理对象对被原对象进行增强。相较于静态 AOP 而言，动态 AOP 的性能通常较差，但随着技术的不断发展，它的性能也在不断的稳步提升。动态 AOP 的优点是它可以轻松地对应用程序的所有切面进行修改，而无须对主程序代码进行重新编译。
- 静态 AOP  
静态 AOP 是通过修改应用程序的实际 Java 字节码，根据需要修改和扩展程序代码来实现织入过程的。最具代表性的静态 AOP 实现是 AspectJ。相较于动态 AOP 来说，性能较好。但它也有一个明显的缺点，那就是对切面的任何修改都需要重新编译整个应用程序。  

**AOP的优势**  
AOP 是 Spring 的核心之一，在 Spring 中经常会使用 AOP 来简化编程。  
在 Spring 框架中使用 AOP 主要有以下优势：  
- 提供声明式企业服务，特别是作为 EJB 声明式服务的替代品，最重要的是，这种服务是声明式事务管理。
- 允许用户实现自定义切面。在某些不适合用 OOP 编程的场景中，采用 AOP 来补充。
- 可以对业务逻辑的各个部分进行隔离，从而使业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时也提高了开发效率。

## 2.2 Spring AOP的代理机制  
Spring 在运行期会为目标对象生成一个动态代理对象，并在代理对象中实现对目标对象的增强。Spring AOP 的底层是通过以下 2 种动态代理机制，为目标对象（Target Bean）执行横向织入的。
|代理技术|描述|
|:---|:---|
|JDK 动态代理|Spring AOP 默认的动态代理方式，若目标对象实现了若干接口，Spring 使用 JDK 的 java.lang.reflect.Proxy 类进行代理。|
|CGLIB 动态代理|若目标对象没有实现任何接口，Spring 则使用 CGLIB 库生成目标对象的子类，以实现对目标对象的代理。|

**注意**：由于被标记为 final 的方法是无法进行覆盖的，因此这类方法不管是通过 JDK 动态代理机制还是 CGLIB 动态代理机制都是无法完成代理的。  

**Spring AOP 连接点**  
Spring AOP 并没有像其他 AOP 框架（例如 AspectJ）一样提供了完成的 AOP 功能，它是 Spring 提供的一种简化版的 AOP 组件。其中最明显的简化就是，Spring AOP 只支持一种连接点类型：方法调用。您可能会认为这是一个严重的限制，但实际上 Spring AOP 这样设计的原因是为了让  Spring 更易于访问。方法调用连接点是迄今为止最有用的连接点，通过它可以实现日常编程中绝大多数与 AOP 相关的有用的功能。如果需要使用其他类型的连接点（例如成员变量连接点），我们可以将 Spring AOP 与其他的 AOP 实现一起使用，最常见的组合就是 Spring AOP + ApectJ。 

**Spring AOP 通知类型**  
AOP 联盟为通知（Advice）定义了一个 org.aopalliance.aop.Interface.Advice 接口。Spring AOP 按照通知（Advice）织入到目标类方法的连接点位置，为 Advice 接口提供了 6 个子接口，如下表。
通知类型|接口|描述
:---|:---|:---
前置通知|org.springframework.aop.MethodBeforeAdvice|在目标方法执行前实施增强。
后置通知|org.springframework.aop.AfterReturningAdvice|在目标方法执行后实施增强。
后置返回通知|org.springframework.aop.AfterReturningAdvice|在目标方法执行完成，并返回一个返回值后实施增强。
环绕通知|org.aopalliance.intercept.MethodInterceptor|在目标方法执行前后实施增强。
异常通知|org.springframework.aop.ThrowsAdvice|在方法抛出异常后实施增强。
引入通知|org.springframework.aop.IntroductionInterceptor|在目标类中添加一些新的方法和属性。

**Spring AOP 切面类型**  
Spring 使用 org.springframework.aop.Advisor 接口表示切面的概念，实现对通知（Adivce）和连接点（Joinpoint）的管理。在 Spring AOP 中，切面可以分为三类：一般切面、切点切面和引介切面。
|切面类型|接口|描述|
|:---|:---|:---|
|一般切面|org.springframework.aop.Advisor|Spring AOP 默认的切面类型。由于 Advisor 接口仅包含一个 Advice（通知）类型的属性，而没有定义 PointCut（切入点），因此它表示一个不带切点的简单切面。这样的切面会对目标对象（Target）中的所有方法进行拦截并织入增强代码。由于这个切面太过宽泛，因此我们一般不会直接使用。|
|切点切面|org.springframework.aop.PointcutAdvisor|Advisor 的子接口，用来表示带切点的切面，该接口在 Advisor 的基础上还维护了一个 PointCut（切点）类型的属性。使用它，我们可以通过包名、类名、方法名等信息更加灵活的定义切面中的切入点，提供更具有适用性的切面。|
|引介切面|org.springframework.aop.IntroductionAdvisor|Advisor 的子接口，用来代表引介切面，引介切面是对应引介增强的特殊的切面，它应用于类层面上，所以引介切面适用 ClassFilter 进行定义。|

**一般切面的AOP开发**
