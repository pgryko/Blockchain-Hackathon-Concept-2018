# Meeting

A meeting board with Socket.IO integration.

The project is based on the following template:

https://github.com/choonkending/react-webpack-node

# Installation instructions

## Ubuntu

1. Install [Node.JS][nodejs] v6 from:

	```bash
	curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
	```

2. Install package dependencies:

	```bash
	sudo apt-get install -y python nodejs make g++ imagemagick ghostscript poppler-utils
	```

  Imagemagick ghostscript poppler-utils are used for image formating i.e. conversion of pdf to jpeg
3. Install the project dependencies:

	```bash
	npm install
	```

4. Install Mongodb:

	```bash
	sudo npm install -g nodemon parallelshell cross-env
	```

## OS X

The OS X developer setup makes use of [Homebrew](https://brew.sh), so please install that if you have not done so already.

1. Install [Node.js][nodejs] and friends:

	```bash
   brew install node
   npm install -g nodemon parallelshell cross-env
	```

2. Install and configure MongoDB; run the following command from the root of the project:

   ```bash
   brew install mongodb --with-openssl  # install
   mkdir -p db  # create data directory
   mongod --dbpath db  # run mongodb
   ```

   You can find more detailed instructions [here](https://docs.mongodb.com/master/tutorial/install-mongodb-on-os-x/?_ga=1.153956344.1906756264.1465927705).

   N.B. This does not configure `mongod` to start on system start, so you will need to run it each time you wish to run the project.

3. Install the local package dependencies:

	```bash
	npm install
	```

[nodejs]: https://nodejs.org/

# Development

1. Follow the installation instructions detailed above for your platform.

2. Start the server:

   ```bash
   npm run start
   ```

   _This will build both the client and the server code. It will the start a build watcher._

N.B. You may encounter errors such as:

```
Error: Cannot find module 'unicode/category/So'
```

This is seemingly an issue with unicode data being unavailable and preventing installation of the unicode package. This is discussed in greater detail on the [unicode package page](https://www.npmjs.com/package/unicode#install). You can also find a discussion on [Stack Overflow](https://github.com/dodo/node-slug/issues/58).

In the end, it proved necessary to follow the instructions which advised:

```bash
cd node_modules/slug
npm install unicode
```

Needless to say this is incredibly bad practice and cannot be relied upon for deployments. Hopefully it's only an OS X problem.


## Production

Environmental parameters need to be set

```bash
//Environmental params
process.env.SESSION_SECRET = 'Your Session Secret goes here';
process.env.MONGOHQ_URL = 'mongodb://localhost/production'
process.env.NODE_ENV = 'production'
process.env.PORT = 8090

process.env.GOOGLE_CLIENTID = 'example',
process.env.GOOGLE_SECRET = 'Example',
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

Build project and run server:

```bash
npm run build:prod
node build/server.bundle.js
```

##Configuring node to run with pm2
Based on https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04

sudo npm install -g pm2
pm2 start build/server.build.js --watch
pm2 startup systemd
/ run the output command that the terminal asks for, it'll be something anlong the lines of

sudo su -c "env PATH=$PATH:/usr/bin pm2 startup systemd -u sammy --hp /home/sammy"

where sammy is your user name


##Configuring apache2 with letsencrypt on ubuntu 16.04

sudo apt-get install apache2
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo service apache2 restart
sudo apt-get install python-letsencrypt-apache
letsencrypt --apache

##Enable port forwarding with apache to port 8090

in /etc/apache2/sites-available change

000-default.conf to contain:

 <VirtualHost *:80>
	# The ServerName directive sets the request scheme, hostname and port that
	# the server uses to identify itself. This is used when creating
	# redirection URLs. In the context of virtual hosts, the ServerName
	# specifies what hostname must appear in the request's Host: header to
	# match this virtual host. For the default virtual host (this file) this
	# value is not decisive as it is used as a last resort host regardless.
	# However, you must set it for any further virtual host explicitly.
	#ServerName www.example.com

	ServerAdmin admin.email@something.com
	ServerName example.com
  #DocumentRoot /var/www/html

	# Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure the loglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

	# For most configuration files from conf-available/, which are
	# enabled or disabled at a global level, it is possible to
	# include a line for only one particular virtual host. For example the
	# following line enables the CGI configuration for this host only
	# after it has been globally disabled with "a2disconf".
	#Include conf-available/serve-cgi-bin.conf
RewriteEngine on
RewriteCond %{SERVER_NAME} =example.com
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet


and change 000-default-le-ssl.conf  to

<IfModule mod_ssl.c>
<VirtualHost *:443>
	# The ServerName directive sets the request scheme, hostname and port that
	# the server uses to identify itself. This is used when creating
	# redirection URLs. In the context of virtual hosts, the ServerName
	# specifies what hostname must appear in the request's Host: header to
	# match this virtual host. For the default virtual host (this file) this
	# value is not decisive as it is used as a last resort host regardless.
	# However, you must set it for any further virtual host explicitly.
	#ServerName www.example.com

	ServerAdmin admin.email@something.com
	ServerName example.com
  #DocumentRoot /var/www/html

  ProxyRequests Off
  ProxyPreserveHost On
  <Proxy *>
    Order allow,deny
    Allow from all
  </Proxy>
  SSLEngine On
  SSLProxyEngine On

  ProxyPass / http://localhost:8090/ Keepalive=On
  ProxyPassReverse / http://localhost:8090/ Keepalive=On
  # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure the loglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

  RewriteEngine on
  RewriteCond %{SERVER_NAME} =dev.commcell.unipart.digital

	# For most configuration files from conf-available/, which are
	# enabled or disabled at a global level, it is possible to
	# include a line for only one particular virtual host. For example the
	# following line enables the CGI configuration for this host only
	# after it has been globally disabled with "a2disconf".
	#Include conf-available/serve-cgi-bin.conf
SSLCertificateFile /etc/letsencrypt/live/example.com/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/example.com/privkey.pem
Include /etc/letsencrypt/options-ssl-apache.conf
ServerName example.com
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
</IfModule>
