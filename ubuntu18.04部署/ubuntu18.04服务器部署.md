查看当前文件夹
pwd

linux: sudo超级管理员, 具有最高权限

更新ubuntu apt-get 源
sudo apt-get update 

安装nodejs
sudo apt-get install nodejs

安装npm
sudo apt-get install npm

安装nodejs版本管理工具n
sudo npm install -g n

更新nodejs
安装稳定版本的node
sudo n stable

查看nodejs版本
sudo node -v

更新npm
sudo npm install npm -g

查看npm版本
sudo npm -v

ubuntu18.04安装服务器版本的 mysql8.0
1、先使用 wget 下载存储库软件包：
wget -c https://dev.mysql.com/get/mysql-apt-config_0.8.15-1_all.deb


2、然后使用以下 dpkg 命令安装下载好的 MySQL 存储库软件包 (注意换成你的版本)
sudo dpkg -i mysql-apt-config_0.8.15-1_all.deb
执行过程中出现弹窗，选择ok

3、更新apt源
sudo apt update

4、安装mysql8.0
sudo apt install mysql-server

5、输入密码，选择mysql5.x加密方式


=====================
注意：此方法不可用，解决方法参考mysql8.0远程连接.JPG图片内容

解决远程连接数据库权限不足问题

1.
//进入数据库
mysql -uroot -p'密码'

2.
use mysql;

3.
update user set host='%' where user='root';
//query OK

4.
//更新权限
flush privileges;

目前找不到mysql的配置存在#bind-address = 127.0.0.1
关闭仅限本地连接mysql，开放远程连接
vim /etc/mysql/mysql.conf.d/mysqld.cnf
注释 #bind-address            = 127.0.0.1

先 按下 i 键 进入编辑模式，按 esc 键 退出编辑模式，:wq保存退出，:q!,不保存退出
=====================

开发时
使用nodemon启动服务器
sudo npm i nodemon -g

启动服务器文件
nodemon 服务器入口文件

生产时
使用pm2启动服务器
sudo npm i pm2 -g

启动服务器文件
pm2 start 服务器入口文件


停止服务器文件
pm2 stop 服务器入口文件


开发测试服务器
	sudo npm i nodemon -g

	启动服务器
		nodemon 服务器入口文件

生产服务器, 如果出现错误，会在0s内重启
	sudo npm i pm2 -g

	启动服务器
	pm2 start 入口文件

	停止服务器
	pm2 stop 入口文件

	重启服务器
	pm2 restart 入口文件


	xshell断开远程连接
	ctrl + alt + ]