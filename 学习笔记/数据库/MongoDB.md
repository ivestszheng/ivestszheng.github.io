

## 01-MongoDB相关概念

### 业务应用场景

传统关系型数据库（如MySQL)，在数据操作的“三高”需求以及应对Web2.0的网站需求页显得力不从心，而MongoDB可以应对“三高”需求。

具体应用场景如下：

1. 社交场景：存储用户信息，以及用户发表的朋友圈信息，通过地理位置索引实现附近的人、地点等功能。
2. 游戏场景：存储游戏用户信息，用户的装备、积分等直接以内嵌文档的形式存储，方便查询、高效率存储和访问。
3. 物流场景：存储订单信息，订单状态在运送中会不断更新，以MongoDB内嵌数组的形式来存储，一次查询就能将订单所有的变更读取出来。
4. 物联网场景：存储所有接入的智能设备信息，以及设备汇报的日志信息，并对这些信息进行多维度的分析。
5. 视频直播：存储用户信息、点赞互动信息等。

这些应用场景中，数据操作方面的共同特点是：

1. 数据量大
2. 写入操作频繁（读写都很频繁）
3. 价值较低的数据，对事务性要求不高

对于这样的数据，更适合使用MongoDB来存储。

### MongoDB简介

MongoDB 是一个开源、高性能、无模式的文档型数据库，当初的设计就是用于简化开发和方便拓展，是NoSQL数据库产品的一种，是最像关系型数据库的非关系型数据库。

它支持的数据结构非常松散，是一种类似于JSON的格式叫BSON，所以它既可以存储比较复杂的数据类型，又相当的灵活。

MongoDB中的记录是一个文档，它是一个由字段和值对组成的数据结构。MongoDB文档类似于JSON对象，即一个文档认为就是一个对象。字段的数据类型是字符型，它的值除了使用基本的一些类型外，还可以包括其他文档，普通数组和文档数组。

### 体系结构 

MySQL和MongoDB对比

![MongoDB和MySQL对比](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20210525182852.png)

| SQL术语/概念 | MongoDB术语/概念 | 解释/说明                              |
| ------------ | ---------------- | -------------------------------------- |
| database     | database         | 数据库                                 |
| table        | collection       | 数据库表/集合                          |
| row          | document         | 数据记录行/文档                        |
| column       | field            | 数据字段/域                            |
| index        | index            | 索引                                   |
| table joins  |                  | 表连接，MongoDB不支持                  |
|              | 嵌入文档         | MongoDB通过嵌入式文档来替代多表连接    |
| primary key  | primary key      | 主键，MongoDB自动将`_id`字段设置为主键 |

### 数据模型

Object ID ：Documents 自生成的 _id

String： 字符串，必须是utf-8

Boolean：布尔值，true 或者false (这里有坑哦~在我们大Python中 True False 首字母大写)

Integer：整数 (Int32 Int64 你们就知道有个Int就行了,一般我们用Int32)

Double：浮点数 (没有float类型,所有小数都是Double)

Arrays：数组或者列表，多个值存储到一个键 (list哦,大Python中的List哦)

Object：如果你学过Python的话,那么这个概念特别好理解,就是Python中的字典,这个数据类型就是字典

Null：空数据类型 , 一个特殊的概念,None Null

Timestamp：时间戳

Date：存储当前日期或时间unix时间格式 (我们一般不用这个Date类型,时间戳可以秒杀一切时间类型)

## 02-单机部署

### Windows系统中安装

具体不多赘述，去看[菜鸟教程](https://www.runoob.com/mongodb/mongodb-window-install.html)

配置好之后，启动关闭命令如下

```bash
net start mongodb // 启动服务
net stop mongodb  // 关闭服务
```

## 03-基本常用命令

#### 数据库操作

##### 选择和创建数据库

```
use 数据库名称
```

如果数据库不存在则自动创建

查看有权限查看的所有数据库命令

```
shwo dbs
或
show databases
```

> 在MongoDB中，集合只有内存插入后都会创建。也就是说，创建集合（数据表）后要再插入一个文档（记录），集合才会真正创建。

查看当前正在使用的数据库命令

```
db
```

MongoDB中默认的数据库为test，如果没有选择数据库，集合将存放在test数据库中

##### 数据库的删除

MongoDB删除数据库的语法格式如下：

```shell
db.dropDatabase()
```

主要用来删除已经持久化的数据库

#### 集合操作

##### 集合的显式创建

基本语法格式如下

```
db.createCollection(name)
```

查看当前库中的表

```
show collections
或
show tables
```

##### 集合的隐式创建

当向一个集合中插入一个文档的时候，如果集合不存在，则会自动创建集合

通常使用隐式创建文档即可

##### 集合的删除

集合删除语法格式如下

```
db.collection.drop()
或
db.集合.drop()
```

**返回值**

如果成功删除选定集合，则drop()方法返回true，否则返回false

#### 文档基本CRUD

> 文档的数据结构和JSON基本一样
>
> 所有存储在集合中的数据都是BSON格式

##### 文档的插入

使用`insert()`或`save()`向集合中插入文档

```
db.collection.insert(
	<document or array of documents>,
	{
		writeConcern: <document>,
		ordered: <boolean>
	}
)
```

例如：

```
db.comment.insert({
	"articleid":"10000",
	"content":"今天天气好",
	"userid":"1001",
	"nickname":"Rose",
	"createdatetime":new Date(),
	"likenum":NumberInt(10),
	"state":null
})
```

执行后，输出以下内容说明插入成功

```
WriteResult({ "nInserted" : 1 })
```

##### 文档的基本查询

##### 文档的更新

##### 删除文档

