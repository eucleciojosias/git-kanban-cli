install:
	yarn install

start:
	yarn start

build:
	yarn build

deploy:
	yarn build
	aws s3 cp --acl=public-read --recursive build/ s3://agile.compufacil.com.br/
	aws configure set preview.cloudfront true
	aws cloudfront create-invalidation --distribution-id E7NTPC71HLGQP --paths '/*'
