# InfectStatisticWeb

##### 作业链接

[作业描述链接](https://edu.cnblogs.com/campus/fzu/2020SpringW/homework/10456)

[作业正文](https://www.cnblogs.com/wxy-2020/p/12492756.html)

##### 结对学号

221701401 221701402

##### 项目介绍

对结对第一次作业的原型进行实现，采用flask框架，使用了Mysql数据库，数据方面采用爬虫

##### 项目构建和运行

1.构建所需的环境

​	1.1 python环境（开发使用pycharm）

​	1.2 mySql环境

2.安装库：

​	2.1 flask安装：pip install flask 

​	2.2 pymysql安装  pip install pymysql

​	2.3 pypinyin安装  pip install pypinyin

3.构建所需的配置

​	3.0 如果是在pycharm中要file->settings->Project:.....(项目名)->project:interpreter设置interpreter

​		具体如下图（图为社区版）

![社区版settings图](https://images.cnblogs.com/cnblogs_com/kokodayo/1640089/o_200314085900pycharm.png)

​	3.1 在Mysql中建一张名为cov的表，然后运行sqlData文件夹中的.sql文件，把表装入cov内。

​	3.2 修改tools.py内的get_conn()及data文件夹的getData.py内的get_conn()的数据库信息为本地数据库信息

​	3.3 运行getData.py爬取部分数据到数据库

4.运行

​	运行index.py