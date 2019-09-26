FROM php:7.2-apache
RUN docker-php-ext-install pdo pdo_mysql mysqli
RUN a2enmod rewrite
RUN a2enmod headers
RUN echo "extension=pdo_mysql" >> /usr/local/etc/php/php.ini 
COPY html/. /var/www/html