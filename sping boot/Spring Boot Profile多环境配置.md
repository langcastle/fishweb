# Spring Boot Profile（多环境配置）

在实际的项目开发中通常会存在多个环境，Profile位在不同环境下使用不同的配置提供了支持，我们可以通过激活、指定参数等方式快速切换环境。
Spring Boot的配置文件共有两种形式：.properties文件和.yml文件，不管哪种文件形式，都可以通过文件命名形式区分出不同的环境配置，文件命名格式为：application-{profile}.properties/yml。其中{profile}一般为各个环境的名称或者简称，例如dev、test和prod等

## properties配置

在 helloworld 的 src/main/resources 下添加 4 个配置文件：
- application.properties：主配置文件
- application-dev.properties：开发环境配置文件
- application-test.properties：测试环境配置文件
- application-prod.properties：生产环境配置文件

在 application.properties 文件中，指定默认服务器端口号为 8080，并通过以下配置激活生产环境（prod）的 profile。
```properties
#默认端口号
server.port=8080
#激活指定的profile
spring.profiles.active=test
```

在 application-dev.properties 中，指定开发环境端口号为 8081，配置如下  
```properties
server.port=8081
```

在 application-test.properties 中，指定测试环境端口号为 8082，配置如下。
```properties  
server.port=8082
```

在 application-prod.properties 中，指定生产环境端口号为 8083，配置如下。  
```properties
server.port=8083
```

重启 Spring Boot 主启动程序，控制台输出如下所示。Spring Boot 配置文件中指定激活profile
```java
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-10-04 16:01:54.015  INFO 10492 --- [           main] e.l.t.TestSpringBootApplication          : Starting TestSpringBootApplication using Java 17.0.3.1 on Lee with PID 10492 (D:\codeSpace\java\TestSpringBoot\target\classes started by Lee in D:\codeSpace\java\TestSpringBoot)
2022-10-04 16:01:54.018  INFO 10492 --- [           main] e.l.t.TestSpringBootApplication          : The following 1 profile is active: "test"
2022-10-04 16:01:54.759  INFO 10492 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8082 (http)
2022-10-04 16:01:54.768  INFO 10492 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2022-10-04 16:01:54.768  INFO 10492 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.65]
2022-10-04 16:01:54.864  INFO 10492 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2022-10-04 16:01:54.864  INFO 10492 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 802 ms
在容器中添加一个组件：userService
2022-10-04 16:01:55.179  INFO 10492 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8082 (http) with context path ''
2022-10-04 16:01:55.189  INFO 10492 --- [           main] e.l.t.TestSpringBootApplication          : Started TestSpringBootApplication in 1.532 seconds (JVM running for 2.118)
2022-10-04 16:02:08.704  INFO 10492 --- [nio-8082-exec-2] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2022-10-04 16:02:08.708  INFO 10492 --- [nio-8082-exec-2] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2022-10-04 16:02:08.708  INFO 10492 --- [nio-8082-exec-2] o.s.web.servlet.DispatcherServlet        : Completed initialization in 0 ms
```   
以上可以看到，我们指定的生产环境（test） Profile 生效了，且服务器端口为 8082。

## yml配置

它与 properties 文件类似，我们也可以添加 4 个配置文件：
application.yml：默认配置
application-dev.yml：开发环境配置
application-test.yml：测试环境配置
application-prod.yml：生产环境配置

在 applcation.yml 文件中指定默认服务端口号为 8080，并通过以下配置来激活开发环境的 profile。
```yml
#默认配置
server:
port: 8080
#切换配置
spring:
 profiles:
  active: dev #激活开发环境配置
```
在 application-dev.yml 中指定开发环境端口号为 8081，配置如下。
```yml
#开发环境
server:
port: 8081
```
在 application-test.yml 中指定测试环境端口号为 8082，配置如下。
```yml
#测试环境
server:
port: 8082
```
在 application-prod.yml 中指定生产环境端口号为 8083，配置如下。
```yml
#生产环境
server:
port: 8083
```
```java
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-10-04 16:20:27.233  INFO 18768 --- [           main] e.l.t.TestSpringBootApplication          : Starting TestSpringBootApplication using Java 17.0.3.1 on Lee with PID 18768 (D:\codeSpace\java\TestSpringBoot\target\classes started by Lee in D:\codeSpace\java\TestSpringBoot)
2022-10-04 16:20:27.236  INFO 18768 --- [           main] e.l.t.TestSpringBootApplication          : The following 1 profile is active: "dev"
2022-10-04 16:20:27.950  INFO 18768 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8081 (http)
2022-10-04 16:20:27.959  INFO 18768 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2022-10-04 16:20:27.959  INFO 18768 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.65]
2022-10-04 16:20:28.055  INFO 18768 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2022-10-04 16:20:28.055  INFO 18768 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 777 ms
在容器中添加一个组件：userService
2022-10-04 16:20:28.363  INFO 18768 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8081 (http) with context path ''
2022-10-04 16:20:28.374  INFO 18768 --- [           main] e.l.t.TestSpringBootApplication          : Started TestSpringBootApplication in 1.502 seconds (JVM running for 2.065)
```
以上可以看出我们指定的开发环境（dev） Profile 生效了，且服务器端口为 8081。

## 多 Profile 文档块模式
在 YAML 配置文件中，可以使用“—”把配置文件分割成了多个文档块，因此我们可以在不同的文档块中针对不同的环境进行不同的配置，并在第一个文档块内对配置进行切换。
以 helloworld 项目为例，修改 application.yml ，配置多个文档块，并在第一文档快内激活测试环境的 Profile，代码如下。
```yml
#默认配置
server:
 port: 8080
#切换配置
spring:
 profiles:
  active: prod
---
#开发环境
server:
 port: 8081
spring:
 config:
  activate:
   on-profile: dev
---
#测试环境
server:
 port: 8082
spring:
 config:
  activate:
   on-profile: test
---
#生产环境
server:
 port: 8083
spring:
 config:
  activate:
   on-profile: prod
```
重启程序结果如下：
```java
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-10-04 16:30:39.484  INFO 2820 --- [           main] e.l.t.TestSpringBootApplication          : Starting TestSpringBootApplication using Java 17.0.3.1 on Lee with PID 2820 (D:\codeSpace\java\TestSpringBoot\target\classes started by Lee in D:\codeSpace\java\TestSpringBoot)
2022-10-04 16:30:39.486  INFO 2820 --- [           main] e.l.t.TestSpringBootApplication          : The following 1 profile is active: "prod"
2022-10-04 16:30:40.211  INFO 2820 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8083 (http)
2022-10-04 16:30:40.219  INFO 2820 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2022-10-04 16:30:40.219  INFO 2820 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.65]
2022-10-04 16:30:40.314  INFO 2820 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2022-10-04 16:30:40.314  INFO 2820 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 780 ms
在容器中添加一个组件：userService
2022-10-04 16:30:40.628  INFO 2820 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8083 (http) with context path ''
2022-10-04 16:30:40.640  INFO 2820 --- [           main] e.l.t.TestSpringBootApplication          : Started TestSpringBootApplication in 1.535 seconds (JVM running for 2.126)
```
以上可以看到，我们指定的测试环境（prod） Profile 生效了，且服务器端口为 8083。

## 激活Profile
除了可以在配置文件中激活指定 Profile，Spring Boot 还为我们提供了另外 2 种激活 Profile 的方式：
- 命令行激活
- 虚拟机参数激活
### **命令行激活**
可以将 Spring Boot 项目打包成 JAR 文件，并在通过命令行运行时，配置命令行参数，激活指定的 Profile。以 helloworld 为例，执行以下 mvn 命令将项目打包。
mvn clean package
项目打包结果如下所示：
```java
PS D:\codeSpace\java\TestSpringBoot> mvn clean package
[INFO] Scanning for projects...
[INFO] 
[INFO] ----------------------< eric.lee:TestSpringBoot >-----------------------
[INFO] Building TestSpringBoot 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:3.2.0:clean (default-clean) @ TestSpringBoot ---
[INFO] Deleting D:\codeSpace\java\TestSpringBoot\target
[INFO] 
[INFO] --- maven-resources-plugin:3.2.0:resources (default-resources) @ TestSpringBoot ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Using 'UTF-8' encoding to copy filtered properties files.
[INFO] Copying 4 resources
[INFO] Copying 2 resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.10.1:compile (default-compile) @ TestSpringBoot ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 5 source files to D:\codeSpace\java\TestSpringBoot\target\classes
[INFO] 
[INFO] --- maven-resources-plugin:3.2.0:testResources (default-testResources) @ TestSpringBoot ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Using 'UTF-8' encoding to copy filtered properties files.
[INFO] skip non existing resourceDirectory D:\codeSpace\java\TestSpringBoot\src\test\resources
[INFO]
[INFO] --- maven-compiler-plugin:3.10.1:testCompile (default-testCompile) @ TestSpringBoot ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 1 source file to D:\codeSpace\java\TestSpringBoot\target\test-classes
[INFO] 
[INFO] --- maven-surefire-plugin:2.22.2:test (default-test) @ TestSpringBoot ---
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/apache/maven/surefire/surefire-junit-platform/2.22.2/surefire-junit-platform-2.22.2.pom
Downloaded from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/apache/maven/surefire/surefire-junit-platform/2.22.2/surefire-junit-platform-2.22.2.pom (7.0 kB at 6.5 kB/s)
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/apache/maven/surefire/surefire-providers/2.22.2/surefire-providers-2.22.2.pom
Downloaded from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/apache/maven/surefire/surefire-providers/2.22.2/surefire-providers-2.22.2.pom (2.5 kB at 7.6 kB/s)
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-launcher/1.3.1/junit-platform-launcher-1.3.1.pom
Downloaded from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-launcher/1.3.1/junit-platform-launcher-1.3.1.pom (2.2 kB at 7.2 kB/s)
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/apiguardian/apiguardian-api/1.0.0/apiguardian-api-1.0.0.pom
Downloaded from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/apiguardian/apiguardian-api/1.0.0/apiguardian-api-1.0.0.pom (1.2 kB at 2.8 kB/s)
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-engine/1.3.1/junit-platform-engine-1.3.1.pom
Downloaded from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-engine/1.3.1/junit-platform-engine-1.3.1.pom (2.4 kB at 7.8 kB/s)
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-commons/1.3.1/junit-platform-commons-1.3.1.pom
Downloaded from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-commons/1.3.1/junit-platform-commons-1.3.1.pom (2.0 kB at 4.1 kB/s)
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/opentest4j/opentest4j/1.1.1/opentest4j-1.1.1.pom
Downloaded from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/opentest4j/opentest4j/1.1.1/opentest4j-1.1.1.pom (1.7 kB at 5.5 kB/s)
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-engine/1.3.1/junit-platform-engine-1.3.1.jar
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/apache/maven/surefire/surefire-junit-platform/2.22.2/surefire-junit-platform-2.22.2.jar
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-launcher/1.3.1/junit-platform-launcher-1.3.1.jar
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-commons/1.3.1/junit-platform-commons-1.3.1.jar
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/apiguardian/apiguardian-api/1.0.0/apiguardian-api-1.0.0.jar
Downloaded from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-engine/1.3.1/junit-platform-engine-1.3.1.jar (135 kB at 314 kB/s)
Downloading from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/opentest4j/opentest4j/1.1.1/opentest4j-1.1.1.jar
Downloaded from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-commons/1.3.1/junit-platform-commons-1.3.1.jar (78 kB at 163 kB/s)
Downloaded from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/junit/platform/junit-platform-launcher/1.3.1/junit-platform-launcher-1.3.1.jar (95 kB at 192 kB/s)
Downloaded from alimaven: http://maven.aliyun.com/nexus/content/groups/public/org/apache/maven/surefire/surefire-junit-platform/2.22.2/surefire-junit-platform-2.22.2.jar (66 kB at 134 kB/s)
[INFO] Building jar: D:\codeSpace\java\TestSpringBoot\target\TestSpringBoot-0.0.1-SNAPSHOT.jar
[INFO]
[INFO] --- spring-boot-maven-plugin:2.7.3:repackage (repackage) @ TestSpringBoot ---
[INFO] Replacing main artifact with repackaged archive
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  9.863 s
[INFO] Finished at: 2022-10-04T16:36:30+08:00
[INFO] ------------------------------------------------------------------------
```
执行命令：java -jar .\target\TestSpringBoot-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev    
以上命令中，***--spring.profiles.active=dev*** 为激活开发环境（dev）Profile 的命令行参数。   
打开命令行窗口，跳转到 JAR 文件所在目录，执行以下命令，启动该项目，并激活开发环境（dev）的 Profile。结果如下所示：   
```java
PS D:\codeSpace\java\TestSpringBoot> java -jar .\target\TestSpringBoot-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev 
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-10-04 16:43:35.781  INFO 7752 --- [           main] e.l.t.TestSpringBootApplication          : Starting TestSpringBootApplication v0.0.1-SNAPSHOT using Java 17.0.3.1 on Lee with PID 7752 (D:\codeSpace\java\TestSpringBoot\target\TestSpringBoot-0.0.1-SNAPSHOT.jar started by Lee in D:\codeSpace\java\TestSpringBoot)
2022-10-04 16:43:35.786  INFO 7752 --- [           main] e.l.t.TestSpringBootApplication          : The following 1 profile is active: "dev"
2022-10-04 16:43:37.170  INFO 7752 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8081 (http)
2022-10-04 16:43:37.183  INFO 7752 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2022-10-04 16:43:37.183  INFO 7752 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.65]
2022-10-04 16:43:37.300  INFO 7752 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2022-10-04 16:43:37.301  INFO 7752 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 1417 ms
在容器中添加一个组件：userService
2022-10-04 16:43:37.796  INFO 7752 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8081 (http) with context path ''
2022-10-04 16:43:37.809  INFO 7752 --- [           main] e.l.t.TestSpringBootApplication          : Started TestSpringBootApplication in 2.775 seconds (JVM running for 3.295)
2022-10-04 16:43:50.814  INFO 7752 --- [nio-8081-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2022-10-04 16:43:50.815  INFO 7752 --- [nio-8081-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2022-10-04 16:43:50.816  INFO 7752 --- [nio-8081-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
```
### **虚拟机参数激活**
还可以在 Spring Boot 项目运行时，指定虚拟机参数来激活指定的 Profile。以 helloworld 为例，将该项目打包成 JAR 文件后，打开命令行窗口跳转到 JAR 所在目录，执行以下命令，激活生产环境（prod）Profile。
执行命令：java -Dspring.profiles.active=prod -jar .\target\TestSpringBoot-0.0.1-SNAPSHOT.jar   
以上命令中，-Dspring.profiles.active=prod 为激活生产环境（prod）Profile 的虚拟机参数。  
执行结果如下：
```java
PS D:\codeSpace\java\TestSpringBoot> java -Dspring.profiles.active=prod -jar .\target\TestSpringBoot-0.0.1-SNAPSHOT.jar

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-10-04 16:58:11.677  INFO 2764 --- [           main] e.l.t.TestSpringBootApplication          : Starting TestSpringBootApplication v0.0.1-SNAPSHOT using Java 17.0.3.1 on Lee with PID 2764 (D:\codeSpace\java\TestSpringBoot\target\TestSpringBoot-0.0.1-SNAPSHOT.jar started by Lee in D:\codeSpace\java\TestSpringBoot)
2022-10-04 16:58:11.680  INFO 2764 --- [           main] e.l.t.TestSpringBootApplication          : The following 1 profile is active: "prod"
2022-10-04 16:58:12.468  INFO 2764 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8083 (http)
2022-10-04 16:58:12.476  INFO 2764 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2022-10-04 16:58:12.477  INFO 2764 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.65]
2022-10-04 16:58:12.547  INFO 2764 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2022-10-04 16:58:12.547  INFO 2764 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 816 ms
在容器中添加一个组件：userService
2022-10-04 16:58:12.850  INFO 2764 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8083 (http) with context path ''
2022-10-04 16:58:12.857  INFO 2764 --- [           main] e.l.t.TestSpringBootApplication          : Started TestSpringBootApplication in 1.573 seconds (JVM running for 1.839)
```

