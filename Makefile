# vim: set tabstop=8 softtabstop=8 noexpandtab:

.PHONY: deploy-all
deploy-all:
	@npm run deploy --workspace=sensiolabs-de-iconify-plugin
	@npm run deploy --workspace=sensiolabs-de-seo-plugin
	@npm run deploy --workspace=sensiolabs-de-country-select-plugin
	@npm run deploy --workspace=sensiolabs-de-language-select-plugin