# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

- Notas de Desenvilvimento
- - obs para o front end exibir os nft que uma carteira possui existe o metodo tokenOfOwnerByIndex , esta função é parte do padrão ERC721Enumerable, que é uma extensão do padrão ERC721. O contrato Ayahuasca herda de ERC721 e ERC721URIStorage, mas não de ERC721Enumerable.
- Para resolver este problema,  tem duas opções:

Modificar o contrato inteligente para herdar de ERC721Enumerable e implementar a lógica necessária. 

Modificar o código JavaScript para não depender da função tokenOfOwnerByIndex. Em vez disso, você pode manter um mapeamento em seu contrato de proprietários para IDs de token, e expor uma função para recuperar os IDs de token para um determinado proprietário.
antes :
```
 useEffect(() => {
    async function getNFTs() {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const balance = await contract.balanceOf(account);

        let nfts = [];
        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(account, i);
          const tokenURI = await contract.tokenURI(tokenId);
          nfts.push({ tokenId, tokenURI });
        }

        setNfts(nfts);
      }
    }

    getNFTs();
  }, [account]);
```
depois :
```
  useEffect(() => {
    async function getNFTs() {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        let nfts = [];
        const tokenIds = await contract.tokensOfOwner(account);
        for (let i = 0; i < tokenIds.length; i++) {
            const tokenURI = await contract.tokenURI(tokenIds[i]);
            nfts.push({ tokenId: tokenIds[i], tokenURI });
        }

        setNfts(nfts);
      }
    }

    getNFTs();
  }, [account]);
```
No contrato Optei por alterar apenas as linhas do contrato

```
// Mapeamento de proprietário para lista de IDs de token
mapping(address => uint256[]) private _ownerTokens;

// Função para obter os IDs de token de um proprietário
function tokensOfOwner(address owner) external view returns (uint256[] memory) {
    return _ownerTokens[owner];
}

// Modifique a função mintNft para atualizar o mapeamento _ownerTokens
function mintNft(NftType nftType) public payable {
    // ... código existente ...

    _mint(msg.sender, newTokenId);
    _ownerTokens[msg.sender].push(newTokenId);

    // ... código existente ...
}
```

adicionar  ERC721Enumerable  é mais custoso e poderia gerar conflitos
adicionando erc721enumerable :
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importando as bibliotecas necessárias


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; // Importando ERC721Enumerable

contract Ayahuasca is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
    // O restante do contrato permanece o mesmo...

    // Função para verificar se uma interface é suportada
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // O restante do contrato permanece o mesmo...
}
```
'ERC721Enumerable  causou conflito no compilador '  Derived contract must override function "_increaseBalance". Two or more base classes define function with same name and parameter types.(6480) Derived contract must override function "_update". Two or more base classes define function with same name and parameter types.(6480) ' contract Ayahuasca is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable ' 

O erro é devido a um conflito entre as funções _increaseBalance e _update definidas em ERC721 e ERC721Enumerable. Ambos os contratos definem essas funções, mas com implementações diferentes, então quando tenta herdar de ambos, o compilador não sabe qual implementação usar.

Para resolver isso, precisaria sobrescrever essas funções em no contrato Ayahuasca e decidir qual implementação usar. Se  quiser usar a implementação de ERC721Enumerable,  poderia fazer isso da seguinte maneira:

```
contract Ayahuasca is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
    // O restante do contrato...

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // O restante do contrato...
}

```
A adição de ERC721Enumerable ao  contrato aumentará o custo do gás para as transações, pois ele mantém um registro de todos os tokens para cada proprietário.  acabei optando por descartar essas mudanças mais custosas.



- crie arquivo .env na pasta frontend
- REACT_APP_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
- REACT_APP_RPC_URL=http://127.0.0.1:8545


