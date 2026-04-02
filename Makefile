.PHONY: help install install-external

## Exibe esta mensagem de ajuda
help:
	@echo ""
	@echo "Targets disponíveis:"
	@echo ""
	@echo "  make install                       Injeta as entradas SDD Kit em .vscode/settings.json"
	@echo "                                     usando '.github' como caminho padrão."
	@echo ""
	@echo "  make install-external PATH=<path>  Injeta as entradas SDD Kit apontando para um caminho"
	@echo "                                     externo (ex: make install-external PATH=../sdd-kit)."
	@echo ""
	@echo "  make help                          Exibe esta mensagem."
	@echo ""

## Instala as entradas SDD Kit em .vscode/settings.json (caminho padrão: .github)
install:
	npx tsx scripts/install.ts

## Instala as entradas SDD Kit apontando para um caminho externo
## Uso: make install-external PATH=/caminho/para/sdd-kit
install-external:
ifndef PATH
	$(error PATH não definido. Use: make install-external PATH=/caminho/para/sdd-kit)
endif
	npx tsx scripts/install.ts "$(PATH)"
