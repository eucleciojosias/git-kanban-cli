all: update send

update:
	python3 main.py

send:
	aws s3 cp --acl=public-read --recursive build/ ${S3_BUCKET}
	aws configure set preview.cloudfront true
	aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DIST_ID} --paths '/*'
