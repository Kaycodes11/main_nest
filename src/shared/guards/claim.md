```ts
@Post()
@RequirePermissions(Permission.CREATE_CAT)
create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}

In the example above, Permission (similar to Role we have shown in RBAC section) is a TypeScript enum that contains all the permissions available in your system.
```
