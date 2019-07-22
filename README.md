# TTours App

Built using Symform Framework

### Requirements
- PHP v7.3+
- Composer

### Technologies used
- Symfony Framework
- Symfony Flex
- Bootstrap
- JQuery
- Webpack
- Mapbox

## Installation
Clone the repository or download the zip file
```
$ git clone https://github.com/rayabanid/webtours.git
```

## After you clone the repository
Open command line and go to the project folder
```sh
  cd C://xampp/htdocs/ttours
```
and run **composer install**
```
$ composer install
```

## Import the database file on phpmyadmin
You can find the database file in the root folder named [ttour.sql](ttours.sql)

### or you use the symfony console component to create the database, just run the following code
```
$ php bin/console doctrine:database:create
```
### and then run the following to code to create the tables
you can use either the migration
```
$ php bin/console doctrine:migrations:migrate
```
or the schema update command
```
$ php bin/console doctrine:schema:update --force
```
## Generate dummy data using fixtures
Run the following code
```
$ php bin/console doctrine:fixtures:load
```
Note: The password of the user is *`test`*
```php
// Load dummy data
public function loadData(ObjectManager $manager)
{
	*...lines 22 - 27*
	$encoder = $this->encoder->encodePassword($user, 'test');
	$user->setPassword($encoder);
```

## Starting the Web Server
```
$ php bin/console server:run
```
now you can browse the project on the [http://localhost:8000](http://localhost:8000)

### Done!
