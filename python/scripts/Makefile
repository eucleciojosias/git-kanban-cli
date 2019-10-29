all: update send

update:
	python3 main.py

send:
	aws s3 cp --acl=public-read /tmp/metrics.json s3://agile.compufacil.com.br/metrics.json
	aws s3 cp --acl=public-read /tmp/cards_summary.json s3://agile.compufacil.com.br/cards_summary.json
	aws s3 cp --acl=public-read /tmp/cards_wip.json s3://agile.compufacil.com.br/cards_wip.json
	aws configure set preview.cloudfront true
	aws cloudfront create-invalidation --distribution-id E7NTPC71HLGQP --paths '/*'
