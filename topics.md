# basic Rest Api with dto with Swagger

# setup Dynamic/multiple Database with Dynamic Module

# nestjs superpower: Middleware, Exception Filters, Pipes, Guards, interceptors, custom decorators

# NEST HAS FOUR SCOPES; Global, Controller, Method, and Param (pipe only) [where these superpower can be used]

# making an expection filter: nest g filter common/filters/http-exception

# making a new guard : nest g guard common/guards/api-key (whether the route is accessible by ther user or not)

# making a new decorator : nest g decorator common/decorators/public

# making a new interceptor: nest g class interceptor common/interceptors/wrap-response.interceptor

# making a new pipe: nest g pipe common/pipes/parse-int

# making a new middleware: nest g middleware common/middleware/logging

# make a new module for a existing folder: nest g module common

# handling payment and streaming

# nestjs caching (in-memory with redis)

# seeding:migration on local and production

# make a dto class: nest g class coffees/dto/create-coffee.dto --no-spec

# make a new entity: nest g class coffees/entity/coffee.entity --no-spec

# making a paginated query : nest g class coffees/dto/pagination-query.dto --no-spec

# making a foler within current directory : nest g class events/entities/event.entity --no-spec

## TRANSACTION

# migration: touch ormconfig.json -> npx typeorm migration:create -n CoffeeRefactor
