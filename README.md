# TracknTrace

TracknTrace is a blockchian based logistic and supplychain management system built with React, Node.js, Hyperledger Fabric.

## How to run?

 #### Project Dependencies
npm, node.js, minifab, Docker, VScode, IBM Blockchain Extension.



 #### Network Setup

> **Start the network**

Head to **/blockchain/network** and start the network with the following command.

```bash
bash startNetwork.sh
```

After successful execution, a directory named **vars** will be created with all network config files.


> **Deploy the chaincode**

* Open VScode and switch to IBM Blockchain Extension.
* Setup all the wallets from **/network/vars/profiles/vscode/wallets**.
* Setup environment from **/network/vars/profiles/vscode/vscodenodefile.json**.
* Package and Deploy the chaincode. (after npm install in chainccode directory)

 #### Client Setup

> **Backend**

Head to **client/backend** and run the following commands.

```bash
npm install
npm start
```

> **Frontend**

Head to **client/frontend** and run the following commands.

```bash
npm install
npm start
```

> **Output**

Project will be live at [http://localhost:3000](http://localhost:3000)

## Author
* Surya Teja 
* Mail - **heysuryateja@gmail.com**
* Connect on [Linkedin](https://www.linkedin.com/in/suryateja2000/)
