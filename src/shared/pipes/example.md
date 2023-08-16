## Pipe : give me some data and i will transform and validate as said

## client's request -> pipe transform (request & validate inputs) -> then this transformed goes to route handler

```ts
@Get("/pipe-demo/:id")
pipeDemo(@Param('id', ParseIntPipe) id: number) {
   console.log(id);
}

// {"statusCode":400,"message":"Validation failed (numeric string is expected)","error":"Bad Request"}

@Get("/pipe-demo/:id")
pipeDemo(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
   console.log(id);
}

```
