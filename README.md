# CNFT Droper
This tool mints NFTs automatically when a buyer sends the minimum amount of ADA. Medium knowledge of sever administration and docker is required.

It is also possible to run it as-a-service just ask for on telegram https://t.me/joinchat/XrlIF21NDzAyODUy

## Showcase

http://cardano-tools.io:8081/

## Setup

### Edit the .env File to you needings:

```bash
# Testnet or mainnet
NETWORK=testnet
# Absolute path where keys/policy files etc. are generated and stored
working.dir=C:\github\nft-dropper-composed\work
# Your price for one token
token.price=10
# Maximum tokens to buy per transaction
token.maxAmount=5
# Address where you want to receive the winnings
seller.address=addr_test1qq487jh48qysllv3d0peafg76gqhp3ys3ycpy94rwza3tk4578p0hapx37mcflefvvwyhwtwn4kt83nkf7wqwx9tvsdshrgzfj
# A docker volume where node.socket is present to connect to the cardano-node. You can leave it as it is, as long the docker-compose.yml is in a dir named nft-dropper-composed (default if you extract the zip)
cardano-node.ipc-volume-name=nft-dropper-composed_node-ipc
```

### Prepare the nft-source folder

- Adapt the metadata.json to your metadata (the keys of the main object are the filenames)
- Put the image files in the folder
- The image filenames define the assetname: `StringUtils.left(FilenameUtils.getBaseName(filename).replaceAll("[^a-zA-Z0-9]", ""), 32)`
- While minting the images are uploaded to ipfs and the `image` attribute in the metadata gets added/updated with the ipfs url

### Edit the template

- Just edit the tymeleaf template at `templates\index.html` to your needings. 
- Edit the css at `static\styles\styles.css` to your needings.
- Add new static recources like images to the `static` folder and insert like `<img th:src="@{/image.jpg}">`

## Start

Start it with

```sudo docker-compose up -d```

Show logs with

```sudo docker-compose logs -f```

The first start on testnet will take several hours until db-sync is synchonized, mainnet can take up to 48 hours.

## API

There is also a small API if you wanto to integrate it into another page:

http://cardano-tools.io:8081/api/tokensLeft

http://cardano-tools.io:8081/api/address

## Pricing

Every mint transaction (independent from the amount of tokens) sends 1₳ to the [EURO]-Pool pledge. So a minimum price of 5₳ per token is recommended to avoid errors.

## Need help?

Join our telegram channel on https://t.me/joinchat/XrlIF21NDzAyODUy