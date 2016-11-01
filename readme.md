# APL Learning
Apl Learning Material App

# Configuring The App

Since the app is based on the laravel make sure the composer is installed, if not install it using npm package

```
npm install -g composer
```

Once the composer is available clone the project into your apache html directory and rename the folder to apllearning if the folder is other than that and open the command prompt and install the dependencies using

```
composer install
```

It will install all the necessary packages needed by the laravel, after that create a database named apllearning.

Then, we need to configure the database credentials in the app, for that open the .env file in the app root directory, if the .env file is not there then simply create .env file and copy and paste the contents from .env.example file and enter the database name as apllearning and enter the database user name and password and if the app key field is empty simply enter the following command in the command prompt to generate new key

```
php artisan key:generate
```

After creating the database, we have to create the tables for that just run the command in the command prompt as

```
php artisan migrate
```

Now both the database and tables are created then we need to create superadmin for the app, for that simply run the command in the command prompt as

```
php artisan db:seed
```
Now we need to install the npm dependencies for that just run the command in the command prompt as

```
npm install
```

Thats all, everything is setup just open the browser and enter http://localhost/apllearning to see the working app. 