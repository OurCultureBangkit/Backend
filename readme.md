## Create by: OurCulture Team - Cloud Computing Team
## Team ID: CH2-PS310

This RESTful APIs created using Node.js, Express and Sequelize, ...

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/OurCultureBangkit/ourculture-be.git
cd ourculture-be
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables
```

Set the connection variables:

```bash
cd config
cp config.json.example config.json
# open config.json and modify the variables
```

Generate JWT RS256 key:

```bash
openssl rand -base64 60 
# copy the result and paste to SECRET_KEY in .env
```

## Table of Contents

- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Commands

Running in development:

```bash
npm start
```

Running in production:

```bash
# build
npm start
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
# App name
port = "PORT GOES HERE" # default 3000

# Project ID
projectId = "PROJECT ID GOES HERE" # get from google cloud console

# Bucket name
bucketName = "BUCKET NAME GOES HERE" # get from google cloud console

# JWT
SECRET_KEY = "SECRET KEY FOR JWT GOES HERE"

# URL ML
MACHINE_LEARNING_URL = "URL FOR MACHINE LEARNING GOES HERE" 

# Salt for password hashing
SALT = "SALT FOR PASSWORD HASHING GOES HERE"

```

## Project Structure

```
config\             # Environment variables and configuration for connection
  |- config.json    # Configuration for connection
  |- connection.js  # Connection to database
controller\         # Controllers
  |- auth\          # Auth controller
  |- user\          # User controller
  |- barang\        # Barang controller
  |- comment\       # Comment controller
  |- ml\            # Machine Learning controller
  |- wishlist\      # Wishlist controller
  |- culture\       # Culture controller
middleware\         # Custom express middlewares
migrations\         # Database migrations
models\             # Sequelize models
modules\            # Modules
router\             # Routes
seeders\            # Database seeders
static\             # Static files for seeders
Dockerfile          # Dockerfile
.env                # Environment variables
serviceaccount.json # Service account for google cloud storage
app.js              # App entry point
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST auth/google/login` - Google Login checkpoint\
`POST auth/google/logout` - Google Logout Checkpoint\
`POST auth/login` - Local Login\
`POST auth/register` - Local Register\

**User routes**:\
`GET user/whoami` - Get now login profile user\
`GET user/:username` - Get user profile by username\
`PUT user/change-password` - change user password\
`GET user/market/barang` - Get now login user post barang\
`DELETE user/market/barang/:barangId` - Delete now login user post barang\

**Barang routes**:\
`POST market/barang` - PostBarang\
`GET market/barang` - GetAllBarang\
`GET market/barang/detail/:id` - GetBarangById\

`GET market/barang/:id/comment` - GetCommentByBarangId\
`POST market/barang/:id/comment` - PostCommentByBarangId\
`POST /barang/:barangId/comment/:commentId/replies` - Reply comment\

**Wishlist routes**:\
`GET market/wishlist` - Get all user wishlist\
`POST market/wishlist` - Add barang to user wishlist\
`DELETE market/wishlist` - Delete barang from user wishlist\

**Culture routes**:\
`GET culture` - Get all culture\
`GET culture/:id` - Get culture by id\
`POST culture` - Post culture only admin\

**Machine Learning routes**:\
`GET ml/vision` - Get vision result\

## License

[MIT](LICENSE)