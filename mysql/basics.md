SQL：Structured Query Language 结构化查询语言（数据以查询为主，99% 都是在进行查询操作）。

MySQL 数据库是一种C\S结构的软件，即分为：客户端和服务端。

若想访问服务器，则必须通过客户端；服务器应该一直运行，客户端则在需要使用的时候运行。

#### 交互方式：
##### 1. 连接认证
###### 1.1 如何连接认证？
- host，主机地址，本地为localhost，远程为IP地址
- Pprt，端口号，用来找软件
- user，用户名
- password，密码
##### 2. 发送 SQL 指令
##### 3. 服务器接受 SQL 指令，然后处理 SQL 指令并返回操作结果
##### 4. 客户端接受结果并显示结果
##### 5. 断开连接

#### SQL基本操作
基本操作：CURD，即增删改查。 

根据操作对象的不同，咱们可以将 SQL的基本操作，我把它分为两类。分别为：库操作、表格操作

##### 1. 库操作
> 新增数据库：`create database + 数据库名称 + ; 

示例：`create database user_info;`(不要忘了分号！！！)  

当提示`Query OK, 1 row affected (0.01 sec)`表示已经创建了数据库`user_info`；

> 查看所有数据库 `show database + ;`

使用此命令，会罗列所有数据库

> 选择要操作的数据库：`use + 数据库名称 + ;`

比如：`use user_info;` 选择数据库成功会提示：`Database changed`

> 删除数据库 `drop database + 数据库名称 + ;`

比如，删除`user_info`数据库： `drop database user_info;` 当提示`Query OK, 0 rows affected (0.00 sec)`表明已经删除成功。

##### 2. 表格操作

> 新建表格 `create table 表名 （列声明）`

创建一个学生表格，示例：
```sql
mysql> create table students
    -> (
    -> id char(10) not null primary key,
    -> name char(16) not null,
    -> sex char(6) not null,
    -> age int not null,
    -> address char(36) not null
    -> );
Query OK, 0 rows affected (0.05 sec)
```
以下是关于列声明的解释：
|列声明语句|解释说明|
|-|-|
|`id char(10) not null primary key`|创建一列，名称为`id`；数据类型为char字符类型，字符的最大长度为10个字符；并且该列内容不允许为空；同时把这一列作为这张表的主键，用来区分表中不同行。|
|`name char(16) not null`|创建一列，名称为`name`；数据类型为char字符类型，字符的最大长度为16个字符；并且该列内容不允许为空。|
|`sex char(6) not null`|创建一列，名称为`sex`；数据类型为char字符类型，字符的最大长度为6个字符；并且该列内容不允许为空。
|
|`age int not null`|创建一列，名称为`age`；数据类型为int整型；并且该列内容不允许为空。|
|`address char(36) not null`|创建一列，`address`；数据类型为char字符类型，字符的最大长度为36个字符；并且该列内容不允许为空。|

可以把数据库的表格看成exec表格：创建表格时，先把表头设置好，数据再按照表头要求填即可。

- 列名称：每一列的名称必须是不相同
- 数据类型：`char` 、`int` 等等都是数据的类型
- not null：不能为空的意思
- primary key： 主键 表示每条数据在表格都是唯一的（即便有完全相同的数据，我也能分的清楚！！！）

> 查看表格信息： `describe + 表格名 + ;`

一般创建完表格之后，查看一下该表格有没有问题。

> 添加数据 `insert into + 表格名称 +  values(value1,value2,.......) + ;`

创建完表格之后，是没有任何数据的，仅仅是定义了表格的属性。要想添加数据

比如，前面创建了表格`students`，现在添加一条数据
`insert into students values("1","yyq", "male", 18, "GuangZhou");`
```
>mysql insert into students values("1","yyq", "male", 18, "GuangZhou");`
Query OK, 1 row affected (0.01 sec)
```
因为创建的表中是有6列的，所以values里也就有6个值了。这是一种向表中插入数据的方式，当然，你也可以指定向特定的列中插入数据，命令语法如下：  
`insert into + 数据库表名 +  (列名1,列名2,...）+  values(value1,value2,...) + ;`

也就是说，你可以只向数据库表中添加部分数据，当然前提是，你还要遵守`not null`的规则。 

> 查询表格数据：`select + 列名称 +  from + 数据库表名 + [查询条件] + ;`

向表中插入数据之后，接下来我们当然是要查询表中的数据了。查询表中的数据有多种方法（其实都是一种方法），但无论哪种方法，基本的命令语法都是像下面这样：   
`select + 列名称 +  from + 数据库表名 + [查询条件] + ;`  

比如：查询全部数据
```sql
mysql> select * from students;
+------------+--------+--------+-----+----------+ 
| id | name   | sex    | age | address  |
+------------+--------+--------+-----+----------+ 
| 1 | yyq  | male |  18 | GuangZhou | 
+------------+--------+--------+-----+----------+ 
1 rows in set (0.00 sec)
```
又比如: 查询特定列的数据  
```sql
mysql> select id, name from students;
+------------+--------+ 
| id | name   |
+------------+--------+ 
| 1 |  yyq  | 
+------------+--------+
1 rows in set (0.00 sec)
```

查询语句以后会另开一篇，专门说一下常用的查询语句。

> 修改（更新）表格：`update +  数据库列名 + set 列名=newvalue where 更新条件 + ;`

示例：把表格`students`的`name=yyq`更改为`name=jjk`
```sql
// 更改数据
mysql> update students set name="jjk" where id='1';
Query OK, 1 row affected (0.01 sec) 
Rows matched: 1  Changed: 1  Warnings: 0
// 查询数据
mysql> select * from students;
+------------+--------+--------+-----+----------+ 
| id | name   | sex    | age | address  |
+------------+--------+--------+-----+----------+ 
| 1 | jjk  | male |  18 | GuangZhou | 
+------------+--------+--------+-----+----------+ 
1 rows in set (0.00 sec)
```

> 删除表格数据：`delete from +  数据库表名 +  where + 删除条件 + ;`

示例：删除`name=jjk`的数据
```sql
// 删除数据
mysql> delete from students where name='jjk';
Query OK, 1 row affected (0.02 sec)
// 查询数据
mysql> select * from students;
Empty set(0.00 sec)
```

> 查看表格：`show tables + ;`

在当前数据库下，使用命令`show tables;`，可以查看到当前数据库的全部表格
比如：
```sql
mysql> show tables;
+------------+--------+
| Tables_in_user_info
+------------+--------+
| students 
+------------+--------+
1 rows in set (0.00 sec)
```
> 修改表格的列： `alter table + 数据库表名 + change + 列名称 + 新数据类型 [其它] + ;`

修改表格的列之前，先来看看之前表格的列：
```sql
mysql> describe students; 
+---------+----------+------+-----+---------+-------+ 
| Field   | Type     | Null | Key | Default | Extra | 
+---------+----------+------+-----+---------+-------+ 
| id     | char(10) | NO   | PRI | NULL    |       |
| name    | char(16) | NO   |     | NULL    |       | 
| sex     | char(6)  | NO   |     | NULL    |       | 
| age     | int(11)  | NO   |     | NULL    |       | 
| address | char(36) | NO   |     | NULL    |       | 
+---------+----------+------+-----+---------+-------+ 
5 rows in set (0.00 sec)
```
修改表格的列：
```sql
// 将列名称"sex"修改为"sexual"，其它保持不变 
mysql> alter table students change sex sexual char(10) not null;
Query OK, 0 rows affected (0.94 sec) 
Records: 0 Duplicates: 0  Warnings: 0
```
再查看一下表格：
```sql
mysql> describe students; 
+---------+----------+------+-----+---------+-------+ 
| Field   | Type     | Null | Key | Default | Extra | 
+---------+----------+------+-----+---------+-------+ 
| id     | char(10) | NO   | PRI | NULL    |       |
| name    | char(16) | NO   |     | NULL    |       | 
| sexual     | char(10)  | NO   |     | NULL    |       | 
| age     | int(11)  | NO   |     | NULL    |       | 
| address | char(36) | NO   |     | NULL    |       | 
+---------+----------+------+-----+---------+-------+ 
5 rows in set (0.00 sec)
```
> 删除表格的列：`alter table +  数据库表名 +  drop + 列名称 + ; `

比如：删除`age`

```sql
// 删除age列 
mysql> alter table students change sex sexual char(10) not null;
Query OK, 0 rows affected (0.63 sec) 
Records: 0 Duplicates: 0  Warnings: 0
```
查看一下表格：
```sql
mysql> describe students; 
+---------+----------+------+-----+---------+-------+ 
| Field   | Type     | Null | Key | Default | Extra | 
+---------+----------+------+-----+---------+-------+ 
| id     | char(10) | NO   | PRI | NULL    |       |
| name    | char(16) | NO   |     | NULL    |       | 
| sexual | char(10)  | NO   |     | NULL    |       | 
| address | char(36) | NO   |     | NULL    |       | 
+---------+----------+------+-----+---------+-------+ 
4 rows in set (0.00 sec)
```

> 添加表格的列: 不好意思，没有！！！至于为什么没有，自己好好想一想！！！！

> 重命名表格名称：`alter table + 数据库表名+  rename + 新的数据库表名+ ; `

比如：将`students`表格名更改为`parents`
```sql
mysql> alter table students rename parents; 
Query OK, 0 rows affected (0.20 sec)
```
查看一下表格：
```sql
mysql> show tables; 
+-------------------------+ 
| Tables_in_user_info | 
+-------------------------+ 
| parents    | 
+-------------------------+ 
1 row in set (0.00 sec)
```
> 删除表格：`drop table +  数据库表名 + ; `

比如：删除`parents`表格
```sql
mysql> drop table parents; 
Query OK, 0 rows affected (0.01 sec)
```
查看一下表格：
```sql
mysql> show tables; 
Empty set (0,01 sec)