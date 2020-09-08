# Makefile for Docker NodeJS Postgres

include .env

NODE_UP := $(shell docker-compose ps | grep node)
REACT_UP := $(shell docker-compose ps | grep react)
POSTGRES_UP := $(shell docker-compose ps | grep postgres)

help:
	@echo ""
	@echo "usage: make COMMAND"
	@echo ""
	@echo "Commands:"
	@echo "  clean      Drop database and clean dependencies"
	@echo "  install    Create and start containers, create database, run migrations and seeds"
	@echo "  logs       Watch log output"
	@echo "  restart    Restart all containers"
	@echo "  start      Start all containers"
	@echo "  stop       Stop all services"
	@echo "  test       Run eslint and application unit tests "
	@echo "  uninstall  Stop and clear all services"
	@echo "  update     Update Node dependencies with yarn"

init:
	@docker run --rm -v $(shell pwd)/backend acgomes68/alpine-node:latest yarn install
	@docker run --rm -v $(shell pwd)/frontend acgomes68/alpine-node:latest yarn install

clean:
	@make node-up
	@make react-up
	@docker-compose exec node rm -Rf app/node_modules
	@docker-compose exec react rm -Rf app/node_modules

create-db:
	@make drop-db
	@docker-compose exec postgres psql -U $(POSTGRES_USER) --command="CREATE DATABASE $(POSTGRES_DATABASE)"

drop-db:
	@make postgres-up
	@docker-compose exec postgres psql -U $(POSTGRES_USER) --command="DROP DATABASE IF EXISTS $(POSTGRES_DATABASE);"

install:
	@make update
	@make start
	@make create-db
	@make migrations
	@make seeds
	@make test

lint:
	@docker-compose exec node yarn eslint --fix src --ext .js
	@docker-compose exec react yarn eslint --fix src --ext .js

logs:
	@docker-compose logs -f

migrations:
	@docker-compose exec node yarn sequelize db:migrate

node-up:
	@if [ "$(NODE_UP)" = '' ]; then\
		echo "Node is down";\
		docker-compose up -d node;\
	else\
		echo "Node is up";\
	fi;

postgres-down:
	@if [ "$(POSTGRES_UP)" = '' ]; then\
		echo "Postgres is down";\
	else\
		echo "Postgres is up";\
		docker-compose down -v postgres;\
	fi;

postgres-up:
	@if [ "$(POSTGRES_UP)" = '' ]; then\
		echo "Postgres is down";\
		docker-compose up -d postgres;\
	else\
		echo "Postgres is up";\
	fi;

react-up:
	@if [ "$(REACT_UP)" = '' ]; then\
		echo "React is down";\
		docker-compose up -d react;\
	else\
		echo "React is up";\
	fi;

restart:
	@docker-compose restart

seeds:
	@docker-compose exec node yarn sequelize db:seed:all

start:
	@docker-compose up -d

stop:
	@docker-compose down -v --remove-orphans

test:
	@make lint
	@make unit

uninstall:
	@make clean
	@make stop
	@make drop-db;

unit:
	@docker-compose exec node yarn eslint --fix src --ext .js
	@docker-compose exec react yarn eslint --fix src --ext .js

update: init
	@docker run --rm -v $(shell pwd)/backend acgomes68/alpine-node:latest yarn upgrade
	@docker run --rm -v $(shell pwd)/frontend acgomes68/alpine-node:latest yarn upgrade

.PHONY: clean test init
