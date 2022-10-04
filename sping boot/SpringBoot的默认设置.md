# Spring Boot默认配置文件

通常情况下，Spring Boot在启动时会将resources目录下的application.properties或者application.yml作为默认配置文件，我们可以在该配置文件中对项目进行配置，但是这并不意味Spring Boot项目中只能存在一个application.properties或者application.yml。

## 默认配置文件

Spring Boot 项目中可以存在多个 application.properties 或 apllication.yml。Spring Boot 启动时会扫描以下 5 个位置的  application.properties 或 apllication.yml 文件，并将它们作为 Spring boot 的默认配置文件。
- file:./config/*/
- file:./config/
- file:./
- classpath:/config/
- classpath:/

(注：file: 指当前项目根目录；classpath: 指当前项目的类路径，即 resources 目录。)  
以上所有位置的配置文件都会被加载，且它们优先级依次降低，序号越小优先级越高。其次，位于相同位置的 application.properties 的优先级高于 application.yml。

所有位置的文件都会被加载，高优先级配置会覆盖低优先级配置，形成互补配置，即：
- 存在相同的配置内容时，高优先级的内容会覆盖低优先级的内容；
- 存在不同的配置内容时，高优先级和低优先级的配置内容取并集。

# Spring Boot外部配置文件

除了默认配置文件，Spring Boot还可以加载一些位于项目外部的配置文件，可以通过如下2个参数来指定外部配置文件的路径：  
- spring.config.location 
- spring.config.additional-location 

## **spring.config.location**

先将 Spring Boot 项目打包成 JAR 文件，然后在命令行启动命令中，使用命令行参数 --spring.config.location，指定外部配置文件的路径。
```java
java -jar {JAR}  --spring.config.location={外部配置文件全路径}
```
需要注意的是，使用该参数指定配置文件后，会使项目默认配置文件（application.properties 或 application.yml ）失效，Spring Boot 将只加载指定的外部配置文件。

示例执行结果如下：
```java
PS D:\codeSpace\java\TestSpringBoot> java -jar .\target\TestSpringBoot-0.0.1-SNAPSHOT.jar --spring.config.location=E:\my-application.yml       

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-10-04 23:17:04.184  INFO 19028 --- [           main] e.l.t.TestSpringBootApplication          : Starting TestSpringBootApplication v0.0.1-SNAPSHOT using Java 17.0.3.1 on Lee with PID 19028 (D:\codeSpace\java\TestSpringBoot\target\TestSpringBoot-0.0.1-SNAPSHOT.jar started by Lee in D:\codeSpace\java\TestSpringBoot)
2022-10-04 23:17:04.186  INFO 19028 --- [           main] e.l.t.TestSpringBootApplication          : No active profile set, falling back to 1 default profile: "default"
2022-10-04 23:17:04.919  INFO 19028 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8090 (http)
2022-10-04 23:17:04.925  INFO 19028 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2022-10-04 23:17:04.925  INFO 19028 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.65]
2022-10-04 23:17:04.985  INFO 19028 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2022-10-04 23:17:04.985  INFO 19028 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 751 ms
在容器中添加一个组件：userService
2022-10-04 23:17:05.278  INFO 19028 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8090 (http) with context path ''
2022-10-04 23:17:05.286  INFO 19028 --- [           main] e.l.t.TestSpringBootApplication          : Started TestSpringBootApplication in 1.482 seconds (JVM running for 1.746)
2022-10-04 23:18:09.984  INFO 19028 --- [nio-8090-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2022-10-04 23:18:09.984  INFO 19028 --- [nio-8090-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2022-10-04 23:18:09.985  INFO 19028 --- [nio-8090-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
```
## **spring.config.additional-location**

在 Spring Boot 启动时，使用命令行参数 --spring.config.additional-location 来加载外部配置文件。
```java
java -jar {JAR}  --spring.config.additional-location={外部配置文件全路径}
```
与 --spring.config.location 不同，--spring.config.additional-location 不会使项目默认的配置文件失效，使用该命令行参数添加的外部配置文件会与项目默认的配置文件共同生效，形成互补配置，且其优先级是最高的，比所有默认配置文件的优先级都高。

示例执行结果如下：
```java
PS D:\codeSpace\java\TestSpringBoot> java -jar .\target\TestSpringBoot-0.0.1-SNAPSHOT.jar --spring.config.additional-location=E:\my-application.yml

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-10-04 23:24:23.384  INFO 6872 --- [           main] e.l.t.TestSpringBootApplication          : Starting TestSpringBootApplication v0.0.1-SNAPSHOT using Java 17.0.3.1 on Lee with PID 6872 (D:\codeSpace\java\TestSpringBoot\target\TestSpringBoot-0.0.1-SNAPSHOT.jar started by Lee in D:\codeSpace\java\TestSpringBoot)
2022-10-04 23:24:23.386  INFO 6872 --- [           main] e.l.t.TestSpringBootApplication          : The following 1 profile is active: "prod"
2022-10-04 23:24:24.130  INFO 6872 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8090 (http)
2022-10-04 23:24:24.138  INFO 6872 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2022-10-04 23:24:24.138  INFO 6872 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.65]
2022-10-04 23:24:24.203  INFO 6872 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/first]  : Initializing Spring embedded WebApplicationContext
2022-10-04 23:24:24.203  INFO 6872 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 772 ms
在容器中添加一个组件：userService
2022-10-04 23:24:24.508  INFO 6872 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8090 (http) with context path '/first'
2022-10-04 23:24:24.516  INFO 6872 --- [           main] e.l.t.TestSpringBootApplication          : Started TestSpringBootApplication in 1.542 seconds (JVM running for 1.808)
2022-10-04 23:25:43.678  INFO 6872 --- [nio-8090-exec-5] o.a.c.c.C.[Tomcat].[localhost].[/first]  : Initializing Spring DispatcherServlet 'dispatcherServlet'
2022-10-04 23:25:43.679  INFO 6872 --- [nio-8090-exec-5] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2022-10-04 23:25:43.680  INFO 6872 --- [nio-8090-exec-5] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
```
**注意**：Maven 对项目进行打包时，位于项目根目录下的配置文件是无法被打包进项目的 JAR 包的，因此位于根目录下的默认配置文件无法在 JAR 中生效，即该项目将只加载指定的外部配置文件和项目类路径（classpath）下的默认配置文件，它们的加载优先级顺序为：
- spring.config.additional-location 指定的外部配置文件 my-application.yml
- classpath:/config/application.yml
- classpath:/application.yml

通过上面的示例，我们看到将 Spring Boot 项目打包后，然后在命令行启动命令中添加 spring.config.additional-location 参数指定外部配置文件，会导致项目根目录下的配置文件无法被加载，我们可以通过以下 3 种方式解决这个问题:
- 在 IDEA 的运行配置（Run/Debug Configuration）中，添加虚拟机参数 -Dspring.config.additional-location=D:\myConfig\my-application.yml，指定外部配置文件；
- 在 IDEA 的运行配置（Run/Debug Configuration）中，添加程序运行参数 --spring.config.additional-location=D:\myConfig\my-application.yml，指定外部配置文件；
- 在主启动类中调用 System.setProperty（）方法添加系统属性 spring.config.additional-location，指定外部配置文件。
