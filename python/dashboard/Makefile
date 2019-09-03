install:
	yarn install

start:
	yarn start

build:
	yarn build

deploy: build
	aws s3 cp --acl=public-read --recursive build/ s3://agile.compufacil.com.br/
