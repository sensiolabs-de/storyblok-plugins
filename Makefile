# vim: set tabstop=8 softtabstop=8 noexpandtab:

.PHONY: deploy-all
deploy-all:
	@npm run deploy --workspace=sensiolabs-iconify-plugin
	@npm run deploy --workspace=sensiolabs-seo-plugin