# Spring Boot Learn

## 1、SpringBoot配置绑定  
配置绑定就是把配置文件中的值与JavaBean中对应的属性进行绑定。SpringBoot提供了2种方式进行配置绑定：
- 使用 @ConfigurationProperties 注解
- 使用 @Value 注解

**1.1 @ConfigurationProperties**  
通过 Spring Boot 提供的 @ConfigurationProperties 注解，可以将全局配置文件中的配置数据绑定到 JavaBean 中。下面我们以 Spring Boot 项目 helloworld 为例，演示如何通过 @ConfigurationProperties 注解进行配置绑定。

在 helloworld 的全局配置文件 application.yml 中添加以下自定义属性。
```java
person:
  lastName: 张三
  age: 18
  boss: false
  birth: 1990/12/12
  maps: { k1: v1,k2: 12 }
  lists:
    ‐ lisi
    ‐ zhaoliu
  dog:
    name: 迪迪
    age: 5124873212
```
在 helloworld 项目的 net.biancheng.www.bean 中创建一个名为 Person 的实体类，并将配置文件中的属性映射到这个实体类上，代码如下。
```java
package net.biancheng.www.bean;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
* 将配置文件中配置的每一个属性的值，映射到这个组件中
*
* @ConfigurationProperties：告诉 SpringBoot 将本类中的所有属性和配置文件中相关的配置进行绑定；
* prefix = "person"：配置文件中哪个下面的所有属性进行一一映射
*
* 只有这个组件是容器中的组件，才能使用容器提供的@ConfigurationProperties功能；
*/
@Component
@ConfigurationProperties(prefix = "person")
public class Person {
    private String lastName;
    private Integer age;
    private Boolean boss;
    private Date birth;
    private Map<String, Object> maps;
    private List<Object> lists;
    private Dog dog;

    public Person() {
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Boolean getBoss() {
        return boss;
    }

    public void setBoss(Boolean boss) {
        this.boss = boss;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public Map<String, Object> getMaps() {
        return maps;
    }

    public void setMaps(Map<String, Object> maps) {
        this.maps = maps;
    }

    public List<Object> getLists() {
        return lists;
    }

    public void setLists(List<Object> lists) {
        this.lists = lists;
    }

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }

    public Person(String lastName, Integer age, Boolean boss, Date birth, Map<String, Object> maps, List<Object> lists, Dog dog) {
        this.lastName = lastName;
        this.age = age;
        this.boss = boss;
        this.birth = birth;
        this.maps = maps;
        this.lists = lists;
        this.dog = dog;
    }

    @Override
    public String toString() {
        return "Person{" +
                "lastName='" + lastName + '\'' +
                ", age=" + age +
                ", boss=" + boss +
                ", birth=" + birth +
                ", maps=" + maps +
                ", lists=" + lists +
                ", dog=" + dog +
                '}';
    }
}
```
**注意**
- 只有在容器中的组件，才会拥有 SpringBoot 提供的强大功能。如果我们想要使用 @ConfigurationProperties 注解进行配置绑定，那么首先就要保证该对 JavaBean 对象在 IoC 容器中，所以需要用到 @Component 注解来添加组件到容器中。
- JavaBean 上使用了注解 @ConfigurationProperties(prefix = “person”) ，它表示将这个 JavaBean 中的所有属性与配置文件中以“person”为前缀的配置进行绑定。
在 net.biancheng.www.bean 中，创建一个名为 Dog 的 JavaBean，代码如下。
```java
package net.biancheng.www.bean;

public class Dog {
    private String name;
    private String age;

    public Dog() {
    }

    public Dog(String name, String age) {
        this.name = name;
        this.age = age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public String getAge() {
        return age;
    }
}
```
修改 HelloController 的代码，在浏览器中展示配置文件中各个属性值，代码如下。
```java
package net.biancheng.www.controller;

import net.biancheng.www.bean.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {
    @Autowired
    private Person person;

    @ResponseBody
    @RequestMapping("/hello")
    public Person hello() {
        return person;
    }
}
```
重启项目，使用浏览器访问http://localhost:8081/hello，结果如下图。
![ask](img/ask.png)

**1.2 @Value**
当我们只需要读取配置文件中的某一个配置时，可以通过 @Value 注解获取。
以 Spring Boot 项目 helloworld 为例，修改实体类 Person 中的代码，使用 @Value 注解进行配置绑定，代码如下。
```java
package net.biancheng.www.bean;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Component
public class Person {
    @Value("${person.lastName}")
    private String lastName;
    @Value("${person.age}")
    private Integer age;
    @Value("${person.boss}")
    private Boolean boss;
    @Value("${person.birth}")
    private Date birth;

    private Map<String, Object> maps;
    private List<Object> lists;
    private Dog dog;

    public Person() {

    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Boolean getBoss() {
        return boss;
    }

    public void setBoss(Boolean boss) {
        this.boss = boss;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public Map<String, Object> getMaps() {
        return maps;
    }

    public void setMaps(Map<String, Object> maps) {
        this.maps = maps;
    }

    public List<Object> getLists() {
        return lists;
    }

    public void setLists(List<Object> lists) {
        this.lists = lists;
    }

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }

    public Person(String lastName, Integer age, Boolean boss, Date birth, Map<String, Object> maps, List<Object> lists, Dog dog) {
        this.lastName = lastName;
        this.age = age;
        this.boss = boss;
        this.birth = birth;
        this.maps = maps;
        this.lists = lists;
        this.dog = dog;
    }

    @Override
    public String toString() {
        return "Person{" +
                "lastName='" + lastName + '\'' +
                ", age=" + age +
                ", boss=" + boss +
                ", birth=" + birth +
                ", maps=" + maps +
                ", lists=" + lists +
                ", dog=" + dog +
                '}';
    }
}
```

**1.3 @Value 与 @ConfigurationProperties 对比**
@Value 和 @ConfigurationProperties 注解都能读取配置文件中的属性值并绑定到 JavaBean 中，但两者存在以下不同。  
(1) 使用位置不同
- @ConfigurationProperties: 标注在JavaBean类名上
- @Value: 标注再JavaBean的属性上  

(2) 功能不同  
- @ConfigurationProperties: 用于批量绑定配置文件中的配置
- @Value: 只能一个一个的指定需要绑定的配置  

(3) 松散绑定支持不同  
- @ConfigurationProperties: 支持松散语法，例如：firstName可以匹配firstName、first-name、first_name、FIRST_NAME
- @Value: 不支持松散语法  

(4) SpEL支持不同：前者不支持SpEL表达式，后者支持  

(5) 复杂类型封装  
- @ConfigurationProperties：支持所有类型数据的封装，例如Map、List、Set和对象等
- @Value：只支持基本数据类型的封装，例如字符串、布尔值和整数等

**1.4 @ProperySource**

如果将所有的配置都集中到 application.properties 或 application.yml 中，那么这个配置文件会十分的臃肿且难以维护，因此我们通常会将与 Spring Boot 无关的配置（例如自定义配置）提取出来，写在一个单独的配置文件中，并在对应的 JavaBean 上使用 @PropertySource 注解指向该配置文件。

以 helloworld 为例，将与 person 相关的自定义配置移动到 src/main/resources 下的 person.properties 中（注意，必须把 application.properties 或 application.yml 中的相关配置删除），person.properties 的配置如下。
```java
person.last-name=李四
person.age=12
person.birth=2000/12/15
person.boss=false
person.maps.k1=v1
person.maps.k2=14
person.lists=a,b,c
person.dog.name=dog
person.dog.age=2
```
在 Person 使用 @PropertySource 注解指向 person.properties，代码如下。
```java
package net.biancheng.www.bean;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;

@PropertySource(value = "classpath:person.properties")//指向对应的配置文件
@Component
@ConfigurationProperties(prefix = "person")
public class Person {

    private String lastName;

    private Integer age;

    private Boolean boss;

    private Date birth;

    private Map<String, Object> maps;

    private List<Object> lists;

    private Dog dog;

    public Person() {

    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Boolean getBoss() {
        return boss;
    }

    public void setBoss(Boolean boss) {
        this.boss = boss;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public Map<String, Object> getMaps() {
        return maps;
    }

    public void setMaps(Map<String, Object> maps) {
        this.maps = maps;
    }

    public List<Object> getLists() {
        return lists;
    }

    public void setLists(List<Object> lists) {
        this.lists = lists;
    }

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }

    public Person(String lastName, Integer age, Boolean boss, Date birth, Map<String, Object> maps, List<Object> lists, Dog dog) {
        this.lastName = lastName;
        this.age = age;
        this.boss = boss;
        this.birth = birth;
        this.maps = maps;
        this.lists = lists;
        this.dog = dog;
    }

    @Override
    public String toString() {
        return "Person{" +
                "lastName='" + lastName + '\'' +
                ", age=" + age +
                ", boss=" + boss +
                ", birth=" + birth +
                ", maps=" + maps +
                ", lists=" + lists +
                ", dog=" + dog +
                '}';
    }
}
```