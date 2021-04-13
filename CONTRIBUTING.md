## Runing and building the app
You can run or build App Outlet by yourself. You can build in Linux, Windows or Mac OS but the software install features will work only in linux systems. 

### Setting up the project
#### Step 1: Installing dependencies
You will need the following tools:
- [Git](https://git-scm.com/) (Version: 2.23.0 or above)
- [NodeJS](https://nodejs.org/) (Version: 10.16.3 or above)

Under Debian, Ubuntu, Linux Mint and derivatives the next line will install them:

```bash
sudo apt install nodejs git npm
```

#### Step 2: Clone the repository
```
git clone https://github.com/app-outlet/app-outlet.git
cd app-outlet
```

#### Step 3: Installing the project dependecies (npm based)
```
npm install
```
> Warning: do not run the above line as root (e.g. with sudo)

### Running the app

```
npm run start
```

### Building the app
#### To build for linux run:
```
npm run build
```
This command will create:
- An AppImage file 
- An .deb file
- An .rpm file
- An .tar.gz file
- A folder `linux-unpacked` folder with the unpacked app

