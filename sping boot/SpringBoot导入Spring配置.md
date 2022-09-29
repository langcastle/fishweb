# Spring Boot导入Spring配置

默认情况下，Spring Boot中是不包含任何的Spring配置文件的，即使我们手动添加Spring配置文件到项目中，也不会被识别，那么Spring Boot为我们提供了一下2中方式来导入Spring配置：
- 使用@ImportResource注解加载Spring配置文件
- 使用全注解方式加载Spring配置

## **@ImportResource导入Spring配置文件**

在主启动类上使用@ImportResource注解可以导入一个或者多个Spring配置文件，并使其中的内容生效。  
1.以helloworld为例，在eric.lee.testspringboot.service 包下创建一个名为 UserService 的类，代码如下。
```java
package eric.lee.testspringboot.service;

import eric.lee.testspringboot.bean.User;
import org.springframework.beans.factory.annotation.Autowired;
public class UserService {
    @Autowired
    private User user;
    public User getUserInfo(){
        return user;
    }
}
```  
2. 在该项目的 resources 下添加一个名为 beans.xml 的 Spring 配置文件，配置代码如下。
```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="userService" class="eric.lee.testspringboot.service.UserService"></bean>
</beans>
```
3. 修改该项目的单元测试类 TestSpringBootApplicationTests ，校验 IOC 容器是否已经personService，代码如下。
```java
package eric.lee.testspringboot;

import eric.lee.testspringboot.bean.User;
//import org.junit.jupiter.api.Test;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestSpringBootApplicationTests {

    @Autowired
    User user;
    @Autowired
    ApplicationContext ioc;
    @Test
    public void testUserService(){
        boolean b = ioc.containsBean("userService");
        if(b){
            System.out.println("userService 存在");
        }else{
            System.out.println("userService 不存在");
        }
    }
    @Test
    public void contextLoads() {
        System.out.println(user);
    }
}
```
4. 运行单元测试代码，结果如下图。
```java
22:23:49.867 [main] DEBUG org.springframework.test.annotation.ProfileValueUtils - Retrieved ProfileValueSource type [class org.springframework.test.annotation.SystemProfileValueSource] for class [eric.lee.testspringboot.TestSpringBootApplicationTests]

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-09-29 22:23:50.138  INFO 4684 --- [           main] e.l.t.TestSpringBootApplicationTests     : Starting TestSpringBootApplicationTests using Java 17.0.3.1 on Lee with PID 4684 (started by Lee in D:\codeSpace\java\TestSpringBoot)
2022-09-29 22:23:50.143  INFO 4684 --- [           main] e.l.t.TestSpringBootApplicationTests     : No active profile set, falling back to 1 default profile: "default"
2022-09-29 22:23:51.109  INFO 4684 --- [           main] e.l.t.TestSpringBootApplicationTests     : Started TestSpringBootApplicationTests in 1.214 seconds (JVM running for 1.785)
userService 不存在

Process finished with exit code 0
```
5.在主启动程序类上使用 @ImportResource 注解，将 Spring 配置文件 beans.xml 加载到项目中，代码如下。
```java
package eric.lee.testspringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@ImportResource(locations = {"classpath:/beans.xml"})
@SpringBootApplication
public class TestSpringBootApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestSpringBootApplication.class, args);
    }

}
```
6.再次执行测试代码，结果如下图。
```java
22:25:40.511 [main] DEBUG org.springframework.test.annotation.ProfileValueUtils - Retrieved ProfileValueSource type [class org.springframework.test.annotation.SystemProfileValueSource] for class [eric.lee.testspringboot.TestSpringBootApplicationTests]

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-09-29 22:25:40.772  INFO 6208 --- [           main] e.l.t.TestSpringBootApplicationTests     : Starting TestSpringBootApplicationTests using Java 17.0.3.1 on Lee with PID 6208 (started by Lee in D:\codeSpace\java\TestSpringBoot)
2022-09-29 22:25:40.773  INFO 6208 --- [           main] e.l.t.TestSpringBootApplicationTests     : No active profile set, falling back to 1 default profile: "default"
2022-09-29 22:25:41.776  INFO 6208 --- [           main] e.l.t.TestSpringBootApplicationTests     : Started TestSpringBootApplicationTests in 1.237 seconds (JVM running for 1.809)
userService 存在

Process finished with exit code 0
```

## **全注解方式加载 Spring 配置**

Spring Boot推荐我们使用全注解的方式加载Spring配置，其实现方式如下：
- 1.使用@Configuration注解定义配置类，替换Spring配置文件；
- 2.配置类内部可以包含一个或者多个@Bean注解的方法，这些方法会被AnnotationConfigApplicationContext或者AnnotationConfigWebApplicationContext类扫描，构建bean定义（相当于Spring配置文件中的<bean></bean>标签），方法的返回值会以组件的形式添加到容器中，组件的id就是方法名。  

以 helloworld 为例，删除主启动类的 @ImportResource 注解，在 net.biancheng.www.config 包下添加一个名为  MyAppConfig 的配置类，代码如下。
```java
package eric.lee.testspringboot.config;

import eric.lee.testspringboot.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyAppConfig {
    /**
     * 与 <bean id="userService" class="userService"></bean> 等价
     * 该方法返回值以组件的形式添加到容器中
     * 方法名是组件 id（相当于 <bean> 标签的属性 id)
     */
    @Bean
    public UserService userService(){
        System.out.println("在容器中添加一个组件：userService");
        return new UserService();
    }
}
```
执行测试代码，执行结果如下图。
```java
22:36:43.788 [main] DEBUG org.springframework.test.annotation.ProfileValueUtils - Retrieved ProfileValueSource type [class org.springframework.test.annotation.SystemProfileValueSource] for class [eric.lee.testspringboot.TestSpringBootApplicationTests]

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-09-29 22:36:44.051  INFO 14956 --- [           main] e.l.t.TestSpringBootApplicationTests     : Starting TestSpringBootApplicationTests using Java 17.0.3.1 on Lee with PID 14956 (started by Lee in D:\codeSpace\java\TestSpringBoot)
2022-09-29 22:36:44.052  INFO 14956 --- [           main] e.l.t.TestSpringBootApplicationTests     : No active profile set, falling back to 1 default profile: "default"
在容器中添加一个组件：userService
2022-09-29 22:36:44.997  INFO 14956 --- [           main] e.l.t.TestSpringBootApplicationTests     : Started TestSpringBootApplicationTests in 1.182 seconds (JVM running for 1.762)
userService 存在

Process finished with exit code 0
```