```ts
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}

// result = { status : 403 , message : "forbidden" }

@Get()
async findAll() {
  try {
    await this.service.findAll()
  } catch (error) {
    throw new HttpException({ status: HttpStatus.FORBIDDEN, error: 'This is a custom message'},
    HttpStatus.FORBIDDEN, { cause: error });
  }
}



path : http-exception.filter.ts

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}

[path]: cats.controller.ts

@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
    // whenever an error thrown here like below; it'll run 'HttpExceptionFilter' & so response customized
  throw new ForbiddenException();
}


```
