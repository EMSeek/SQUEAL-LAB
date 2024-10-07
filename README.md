# SQUEAL-LAB

Preparation:
On a suitable computer with *nix, curl, node and git installed, perform the following steps:

Setup a location to host the lab and related files:
```
mkdir ~/lab
```

Check out this repo:
```
cd ~/lab
git clone https://github.com/EMSeek/SQUEAL-LAB
```

Checkout sqlmap:
```
cd ~/lab
git clone https://github.com/sqlmapproject/sqlmap
```

In a new terminal, run the following commands:
```
cd ~/lab/SQUEAL-LAB
npm install package.json
node app.js
```

In a browser or using curl you can now visit http://localhost:3000/